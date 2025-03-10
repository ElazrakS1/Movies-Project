using FluentValidation;
using Movies.Domain.Entities;

namespace Movies.Applications.Queries.Movies.GetMovieById;

public class GetMovieByIdQueryValidator : AbstractValidator<GetMovieByIdQuery>
{
    public GetMovieByIdQueryValidator()
    {
        RuleFor(x => x.id) // Corrected lambda expression
            .NotEmpty()
            .WithMessage($"{nameof(Movie.Id)} cannot be empty"); // Corrected string interpolation
    }
}