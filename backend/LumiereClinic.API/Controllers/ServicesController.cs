using Microsoft.AspNetCore.Mvc;
using LumiereClinic.API.Models;

namespace LumiereClinic.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private static readonly List<Service> _services = new()
        {
            new Service { Id = 1, Nome = "Limpeza de Pele Clean Plus", Categoria = "Estética Facial", Preco = 180.00m, Img = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881" },
            new Service { Id = 2, Nome = "Peeling Diamante", Categoria = "Renovação Celular", Preco = 250.00m, Img = "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Service>> Get() => Ok(_services);
    }
}