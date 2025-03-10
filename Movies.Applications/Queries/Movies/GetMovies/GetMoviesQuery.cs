using MediatR;
using Movies.Contracts.Responces;

namespace Movies.Applications.Queries.Movies.GetMovies;

public record GetMoviesQuery() : IRequest<GetMoviesResponse>;