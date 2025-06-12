import { fetcher } from './fetcher';

export function discoverMovies(params = {}) {
  return fetcher('/discover/movie', {
    params,
  });
}
