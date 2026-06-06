namespace LumiereClinic.API.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string Horario { get; set; } = string.Empty;
        public int PatientId { get; set; }
        public Patient? Patient { get; set; }
        public int ProfessionalId { get; set; }
        public Professional? Professional { get; set; }
        public int ServiceId { get; set; }
        public Service? Service { get; set; }
        public string Status { get; set; } = "Agendado";
    }
}