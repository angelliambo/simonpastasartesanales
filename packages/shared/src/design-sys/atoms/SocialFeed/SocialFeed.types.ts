import React from "react";
import { SocialPost } from "../../../types/socialFeed";

export interface SocialPostCardProps {
  post: SocialPost;
  className?: string;
}

export interface SocialFeedGridProps {
  posts?: SocialPost[];
  isLoading?: boolean;
  fallbackComponent?: React.ReactNode;
  className?: string;
}
