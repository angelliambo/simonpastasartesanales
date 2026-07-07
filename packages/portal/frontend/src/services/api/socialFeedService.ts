import { api } from "./base";
import { SocialPost } from "@factory/shared/types/socialFeed";

export const socialFeedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInstagramFeed: builder.query<{ success: boolean; feed: SocialPost[] }, void>({
      query: () => "/social-feed/instagram",
    }),
  }),
  overrideExisting: false,
});

export const { useGetInstagramFeedQuery } = socialFeedApi;
export default socialFeedApi;
