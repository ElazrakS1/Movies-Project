namespace Movies.Contracts.Requests.Movies;

public record UpdateMovieRequest(int id, string Title, string Description, string Category);