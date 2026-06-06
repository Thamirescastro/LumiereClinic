namespace LumiereClinic.API.Models
{
    public class Professional
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty; // Ex: Dermatologista
    }
}