using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movies.Contracts.Exceptions;
using Movies.Contracts.Responces;
using Movies.Domain.Entities;
using Movies.Infrastructure;

namespace Movies.Applications.Queries.Movies.GetMovieById;

public class GetMovieByIdQueryHandler : IRequestHandler<GetMovieByIdQuery, GetMovieByIdResponse>
{
    private readonly MoviesDBContext _moviesDbContext;

    public GetMovieByIdQueryHandler(MoviesDBContext moviesDbContext)
    {
        _moviesDbContext = moviesDbContext;
    }
    
    public async Task<GetMovieByIdResponse> Handle(GetMovieByIdQuery request, CancellationToken cancellationToken)
    {
        var movie = await _moviesDbContext.Movies
            .FirstOrDefaultAsync(x => x.Id == request.id, cancellationToken);

        if (movie is null)
        {
            throw new NotFoundException($"{nameof(Movie)}with {nameof(Movie.Id)}: {request.id}"
                + $"was not found in database");
        }

        return movie.Adapt<GetMovieByIdResponse>();
    }
}