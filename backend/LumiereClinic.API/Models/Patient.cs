namespace LumiereClinic.API.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty; // Guardará a senha do usuário
        public string Role { get; set; } = "paciente"; // administrador ou paciente
    }
}