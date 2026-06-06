namespace LumiereClinic.Domain.Entities;

public enum AppointmentStatus { Scheduled, Confirmed, Completed, Canceled }

public class Appointment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PatientId { get; set; }
    public Patient? Patient { get; set; }
    public Guid ProfessionalId { get; set; }
    public Professional? Professional { get; set; }
    public Guid ServiceId { get; set; }
    public Service? Service { get; set; }
    public DateTime AppointmentDate { get; set; }
    public AppointmentStatus Status { get; set; } = AppointmentStatus.Scheduled;
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}