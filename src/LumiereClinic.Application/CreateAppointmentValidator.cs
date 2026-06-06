using FluentValidation;
using LumiereClinic.Domain.Entities;

namespace LumiereClinic.Application.Validators;

public class CreateAppointmentValidator : AbstractValidator<Appointment>
{
    public CreateAppointmentValidator()
    {
        RuleFor(a => a.AppointmentDate)
            .GreaterThan(DateTime.UtcNow)
            .WithMessage("Não é permitido agendamentos em datas passadas.");
    }
}