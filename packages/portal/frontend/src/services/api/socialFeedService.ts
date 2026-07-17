import { api } from "./base";
import { SocialPost } from "@factory/shared/types/socialFeed";

export const socialFeedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInstagramFeed: builder.query<{ success: boolean; feed: SocialPost[]; quotaExceeded?: boolean; fromCache?: boolean; error?: string }, void>({
      query: () => "/social-feed/instagram",
    }),
  }),
  overrideExisting: false,
});

export const { useGetInstagramFeedQuery } = socialFeedApi;
export default socialFeedApi;
