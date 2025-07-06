import { fetcher } from './fetcher';

export function getPopularMovies(params = {}) {
  return fetcher('/movie/popular', {
    params: {
      language: 'es-ES',
      ...params,
    },
  });
}

export function searchMovies(query, params = {}) {
  return fetcher('/search/movie', {
    params: {
      query,
      language: 'es-ES',
      ...params,
    },
  });
}

export function getMovieDetails(movieId, params = {}) {
  return fetcher(`/movie/${movieId}`, {
    params: {
      language: 'es-ES',
      ...params,
    },
  });
}

export function getMovieVideos(movieId, params = {}) {
  return fetcher(`/movie/${movieId}/videos`, {
    params: {
      language: 'es-ES',
      ...params,
    },
  });
}

export function getMovieCredits(movieId, params = {}) {
  return fetcher(`/movie/${movieId}/credits`, {
    params: {
      language: 'es-ES',
      ...params,
    },
  });
}

export function getSimilarMovies(movieId, params = {}) {
  return fetcher(`/movie/${movieId}/similar`, {
    params: {
      language: 'es-ES',
      ...params,
    },
  });
}

export function discoverMovies(params = {}) {
  return fetcher('/discover/movie', {
    params: {
      language: 'es-ES',
      ...params,
    },
  });
}

export function getMovieGenres(params = {}) {
  return fetcher('/genre/movie/list', {
    params: {
      language: 'es-ES',
      ...params,
    },
  });
}