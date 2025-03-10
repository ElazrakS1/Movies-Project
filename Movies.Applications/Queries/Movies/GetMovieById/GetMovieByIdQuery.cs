using MediatR;
using Movies.Contracts.Responces;

namespace Movies.Applications.Queries.Movies.GetMovieById;

public record GetMovieByIdQuery(int id ) : IRequest<GetMovieByIdResponse>;