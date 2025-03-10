using FluentValidation;
using MediatR;
using Movies.Contracts.Errors;
using Movies.Contracts.Exceptions;
using ValidationException = System.ComponentModel.DataAnnotations.ValidationException;

namespace Movies.Applications.Behaviors;

public class ValidationBehaviors<TRequest,Tresponse> : IPipelineBehavior<TRequest,Tresponse>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehaviors(IEnumerable<IValidator<TRequest>> validators)
    {
      _validators = validators;
    }
    public async Task<Tresponse> Handle(TRequest request, RequestHandlerDelegate<Tresponse> next,
        CancellationToken cancellationToken)
    {
        var context = new ValidationContext<TRequest>(request);

        var validationResults = await Task.WhenAll(
            _validators.Select(x => x.ValidateAsync(context, cancellationToken)));

        var failures = validationResults.Where(x => !x.IsValid)
            .SelectMany(x => x.Errors)
            .Select(x => new ValidationError
            {
                Property = x.PropertyName,
                ErrorMessage = x.ErrorMessage
            }).ToList();

        if (failures.Any())
        {
            throw new CustomValidationException(failures);
        }

        var response = await next();
        return response;

    }
}