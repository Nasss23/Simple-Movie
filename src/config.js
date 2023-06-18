export const fetcher = (...args) => fetch(...args).then(res => res.json());
export const apiKey = "5e5db40364f06babf6b3694c61fb6e6d";
const tmdbEndpoint = 'https://api.themoviedb.org/3/movie';

export const tmdbAPI = {
    getMovieList: (type) => `${tmdbEndpoint}/${type}?api_key=${apiKey}`,
    getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
    getMovieMeta: (movieId, type) => `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
    imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
    image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`

}