using Microsoft.EntityFrameworkCore;
using LumiereClinic.API.Models;

namespace LumiereClinic.API.Data
{
    public class LumiereContext : DbContext
    {
        public LumiereContext(DbContextOptions<LumiereContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Professional> Professionals { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuração para decimais no PostgreSQL evitar avisos de precisão
            modelBuilder.Entity<Service>()
                .Property(s => s.Preco)
                .HasColumnType("decimal(18,2)");

            base.OnModelCreating(modelBuilder);
        }
    }
}