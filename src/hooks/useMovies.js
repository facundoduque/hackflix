import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
  getMovieVideos,
  getMovieCredits,
  getSimilarMovies
} from '../api/tmdbApi';

export function usePopularMovies(options = {}) {
  return useInfiniteQuery({
    queryKey: ['movies', 'popular'],
    queryFn: ({ pageParam = 1 }) => getPopularMovies({ page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length >= 3) return undefined;
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    ...options,
  });
}

export function useSearchMovies(query, options = {}) {
  return useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: () => searchMovies(query),
    enabled: !!query && query.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    ...options,
  });
}

export function useMovieDetails(movieId, options = {}) {
  return useQuery({
    queryKey: ['movie', 'details', movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 30 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    ...options,
  });
}

export function useMovieVideos(movieId, options = {}) {
  return useQuery({
    queryKey: ['movie', 'videos', movieId],
    queryFn: () => getMovieVideos(movieId),
    enabled: !!movieId,
    staleTime: 30 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    ...options,
  });
}

export function useMovieCredits(movieId, options = {}) {
  return useQuery({
    queryKey: ['movie', 'credits', movieId],
    queryFn: () => getMovieCredits(movieId),
    enabled: !!movieId,
    staleTime: 30 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    ...options,
  });
}

export function useSimilarMovies(movieId, options = {}) {
  return useQuery({
    queryKey: ['movie', 'similar', movieId],
    queryFn: () => getSimilarMovies(movieId),
    enabled: !!movieId,
    staleTime: 15 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    ...options,
  });
}