import React from 'react';

export interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  showTitle?: boolean;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string[];
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  showBackButton?: boolean;
  containerId?: string;
  headerId?: string;
  contentId?: string;
}
