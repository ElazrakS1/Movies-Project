using MediatR;

namespace Movies.Applications.Commands.Movies.DeleteMovie;

public record DeleteMovieCommand(int Id) : IRequest<Unit>;