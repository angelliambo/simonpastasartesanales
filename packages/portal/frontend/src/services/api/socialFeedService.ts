import { useQuery } from "@tanstack/react-query";
import apiClient from "./client";
import { SocialPost } from "@factory/shared/types/socialFeed";

export interface InstagramFeedResponse {
  success: boolean;
  feed: SocialPost[];
  quotaExceeded?: boolean;
  fromCache?: boolean;
  error?: string;
}

export const INSTAGRAM_FEED_QUERY_KEY = ["social-feed", "instagram"];

export const useGetInstagramFeedQuery = (arg?: any, options?: { skip?: boolean }) => {
  const query = useQuery({
    queryKey: INSTAGRAM_FEED_QUERY_KEY,
    queryFn: () => apiClient<InstagramFeedResponse>("/social-feed/instagram"),
    enabled: options?.skip !== true,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    isLoading: query.isLoading || query.isFetching,
  };
};
