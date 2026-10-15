import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useNewsFeed({ topic } = {}) {
  return useInfiniteQuery({
    queryKey: ['news-feed', topic],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const params = { page: pageParam };
      if (topic && topic !== 'All dispatches') params.topic = topic;
      const { data } = await api.get('/api/news/feed', { params });
      return data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.hasMore === false || lastPage?.nextPage === null) return undefined;
      if (typeof lastPage?.nextPage === 'number') return lastPage.nextPage;
      if (typeof lastPage?.pagination?.nextPage === 'number') return lastPage.pagination.nextPage;
      return pages.length + 1;
    },
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: true,
    placeholderData: (previous) => previous
  });
}
