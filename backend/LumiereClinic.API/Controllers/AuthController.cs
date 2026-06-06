using Microsoft.AspNetCore.Mvc;
using LumiereClinic.API.Models;

namespace LumiereClinic.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        public class LoginModel { public string Email { get; set; } = ""; public string Password { get; set; } = ""; }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            if (login.Email == "admin@lumiere.com" && login.Password == "Admin123")
            {
                return Ok(new { token = "fake-jwt-token-lumiere-clinic", role = "admin", name = "Administrador" });
            }
            if (login.Email == "maria@email.com" && login.Password == "Maria123")
            {
                return Ok(new { token = "fake-jwt-token-lumiere-clinic", role = "paciente", name = "Maria Silva" });
            }

            return Unauthorized(new { message = "E-mail ou senha incorretos." });
        }
    }
}