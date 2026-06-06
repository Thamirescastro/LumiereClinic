namespace LumiereClinic.API.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public string Img { get; set; } = string.Empty; // Link da imagem que usamos no React
    }
}