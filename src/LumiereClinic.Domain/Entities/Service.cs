namespace LumiereClinic.Domain.Entities;

public class Service
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int DurationMinutes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}