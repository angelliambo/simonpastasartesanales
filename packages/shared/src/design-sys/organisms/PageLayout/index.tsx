import React from 'react';
import { PageContainer, PageContent } from './PageLayout.styles';
import type { PageLayoutProps } from './PageLayout.types';

export { PageContent } from './PageLayout.styles';

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className, style }) => {
  return (
    <PageContainer style={style} className={className}>
      {children}
    </PageContainer>
  );
};

export default PageLayout;
