using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LumiereClinic.Infrastructure.Context;
using LumiereClinic.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LumiereClinic.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AppointmentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AppointmentsController(ApplicationDbContext context) => _context = context;

    [HttpPost]
    [Authorize(Roles = "Admin,Receptionist")]
    public async Task<IActionResult> Create(Appointment appointment)
    {
        // Validação de conflito de agenda
        var conflict = await _context.Appointments.AnyAsync(a => 
            a.ProfessionalId == appointment.ProfessionalId && 
            a.AppointmentDate == appointment.AppointmentDate &&
            a.Status != AppointmentStatus.Canceled);

        if (conflict)
            return BadRequest("O profissional já possui um agendamento neste horário.");

        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();
        return Ok(appointment);
    }

    [HttpGet("dashboard")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetDashboardMetrics()
    {
        var totalPatients = await _context.Patients.CountAsync();
        var totalRevenue = await _context.Appointments
            .Where(a => a.Status == AppointmentStatus.Completed)
            .Include(a => a.Service)
            .SumAsync(a => a.Service!.Price);

        return Ok(new { totalPatients, totalRevenue });
    }
}