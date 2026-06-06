using LumiereClinic.API.Models;
using LumiereClinic.API.Data; // IMPORTANTE: Adicione essa linha
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore; // Importa a interface gráfica moderna

var builder = WebApplication.CreateBuilder(args);

// 1. REGISTRAR OS SERVIÇOS DA API E DOCUMENTAÇÃO
builder.Services.AddControllers();
builder.Services.AddOpenApi(); 
builder.Services.AddDbContext<LumiereContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// 2. ATIVAR A INTERFACE VISUAL NO AMBIENTE DE DESENVOLVIMENTO
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); // Gera o JSON em /openapi/v1.json (O que já funcionou!)
    app.MapScalarApiReference(); // Cria a interface gráfica em /scalar/v1
}

app.UseAuthorization();
app.MapControllers();

app.Run();