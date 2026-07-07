export interface SocialComment {
  id: string;
  text: string;
  username: string;
  timestamp: string;
}

export interface SocialPost {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption?: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  thumbnailUrl?: string;
  timestamp: string;
  username?: string;
  likesCount?: number;
  commentsCount?: number;
  comments?: SocialComment[];
}

export interface ISocialFeedProvider {
  getRecentPosts(username: string, limit: number): Promise<SocialPost[]>;
}
