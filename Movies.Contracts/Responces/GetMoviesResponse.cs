using Movies.Contracts.Dtos;

namespace Movies.Contracts.Responces;

public record GetMoviesResponse(List<MovieDto> MovieDtos);