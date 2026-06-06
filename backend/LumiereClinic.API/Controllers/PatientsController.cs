using Microsoft.AspNetCore.Mvc;
using LumiereClinic.API.Models;

namespace LumiereClinic.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private static readonly List<Patient> _patients = new()
        {
            new Patient { Id = 1, Nome = "Maria Silva", Email = "maria@email.com", Telefone = "11999999999", CPF = "123.456.789-00", Role = "paciente" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Patient>> Get() => Ok(_patients);

        [HttpPost]
        public ActionResult<Patient> Post(Patient patient)
        {
            patient.Id = _patients.Count + 1;
            _patients.Add(patient);
            return CreatedAtAction(nameof(Get), new { id = patient.Id }, patient);
        }
    }
}