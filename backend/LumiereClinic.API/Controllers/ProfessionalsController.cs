using Microsoft.AspNetCore.Mvc;
using LumiereClinic.API.Models;

namespace LumiereClinic.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfessionalsController : ControllerBase
    {
        private static readonly List<Professional> _professionals = new()
        {
            new Professional { Id = 1, Nome = "Dra. Thamires Mendonça", Categoria = "Dermatologia Estética" },
            new Professional { Id = 2, Nome = "Dr. Lucas Rocha", Categoria = "Fisioterapia Dermatofuncional" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Professional>> Get() => Ok(_professionals);
    }
}