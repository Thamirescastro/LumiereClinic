using Microsoft.AspNetCore.Mvc;
using LumiereClinic.API.Models;

namespace LumiereClinic.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private static readonly List<Appointment> _appointments = new();

        [HttpGet]
        public ActionResult<IEnumerable<Appointment>> Get() => Ok(_appointments);

        [HttpPost]
        public ActionResult<Appointment> Post(Appointment appointment)
        {
            appointment.Id = _appointments.Count + 1;
            _appointments.Add(appointment);
            return Ok(appointment);
        }
    }
}