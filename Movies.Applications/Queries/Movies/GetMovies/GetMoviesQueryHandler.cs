using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movies.Contracts.Responces;
using Movies.Domain.Entities;
using Movies.Infrastructure;

namespace Movies.Applications.Queries.Movies.GetMovies;

public class GetMoviesQueryHandler : IRequestHandler<GetMoviesQuery , GetMoviesResponse>
{
    private readonly MoviesDBContext _moviesDbContext;

    public GetMoviesQueryHandler(MoviesDBContext moviesDbContext)
    {
        _moviesDbContext = moviesDbContext;
    }
    public async Task<GetMoviesResponse> Handle(GetMoviesQuery request, CancellationToken cancellationToken)
    {
      var movies= await _moviesDbContext.Movies.ToListAsync(cancellationToken);

      return movies.Adapt<GetMoviesResponse>();
    }
    
}