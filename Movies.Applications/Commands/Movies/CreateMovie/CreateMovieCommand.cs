using MediatR;

namespace Movies.Applications.Commands.Movies.CreateMovie;

public record CreateMovieCommand(string Title, string Description, string Category) : IRequest<int>;