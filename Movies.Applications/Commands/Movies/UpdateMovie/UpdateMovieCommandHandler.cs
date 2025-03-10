using MediatR;
using Microsoft.EntityFrameworkCore;
using Movies.Contracts.Exceptions;
using Movies.Domain.Entities;
using Movies.Infrastructure;

namespace Movies.Applications.Commands.Movies.UpdateMovie;

public class UpdateMovieCommandHandler : IRequestHandler<UpdateMovieCommand, Unit>
{
    private readonly MoviesDBContext _moviesDbContext;
    
    public UpdateMovieCommandHandler(MoviesDBContext moviesDbContext)
    {
        _moviesDbContext = moviesDbContext;
    }
    public async Task<Unit> Handle(UpdateMovieCommand request, CancellationToken cancellationToken)
    {
        var movieToUpdate = 
            await _moviesDbContext.Movies
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (movieToUpdate is null)
        {
            throw new NotFoundException($"{nameof(Movie)}with {nameof(Movie.Id)}: {request.Id}"
                                        + $"was not found in database");
        }

        movieToUpdate.Description = request.Description;
        movieToUpdate.Title = request.Title;
        movieToUpdate.Category = request.Category;

        _moviesDbContext.Movies.Update(movieToUpdate);
        await _moviesDbContext.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}