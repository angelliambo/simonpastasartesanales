import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${props => props.theme.spacing.lg};
  width: 100%;
`;

export const StyledPostCard = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  background: ${props => props.theme.colors.background.card};
  border: 1px solid ${props => props.theme.colors.border.normal};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.light};
  padding: ${props => props.theme.spacing.md};
  transition: transform ${props => props.theme.transitions.normal}, box-shadow ${props => props.theme.transitions.normal};
  width: 100%;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    width: calc(50% - ${props => props.theme.spacing.md});
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: calc(33.33% - ${props => props.theme.spacing.lg});
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

export const Username = styled.span`
  font-family: ${props => props.theme.typography.fontFamily.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
`;

export const PlatformBadge = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.neutral[400]};
  transition: color ${props => props.theme.transitions.fast};
  font-size: ${props => props.theme.typography.fontSize.md};

  &:hover {
    color: ${props => props.theme.brand.pink500 || '#ec4899'};
  }
`;

export const CardMediaWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: ${props => props.theme.colors.background.secondary};
`;

export const CardMedia = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${props => props.theme.transitions.slow};

  ${StyledPostCard}:hover & {
    transform: scale(1.03);
  }
`;

export const MediaTypeIcon = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  pointer-events: none;
`;

export const CardCaption = styled.p`
  font-family: ${props => props.theme.typography.fontFamily.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: ${props => props.theme.typography.lineHeight.normal};
  color: ${props => props.theme.colors.text.secondary};
  margin-top: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

export const CardStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 1px solid ${props => props.theme.colors.border.light};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-family: ${props => props.theme.typography.fontFamily.primary};
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.text.tertiary};
`;

export const CardCommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

export const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background.secondary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
`;

export const CommentUser = styled.span`
  font-family: ${props => props.theme.typography.fontFamily.primary};
  font-size: 11px;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 2px;
`;

export const CommentText = styled.p`
  font-family: ${props => props.theme.typography.fontFamily.primary};
  font-size: ${props => props.theme.typography.fontSize.xs};
  line-height: ${props => props.theme.typography.lineHeight.tight};
  color: ${props => props.theme.colors.text.secondary};
  margin: 0;
`;

// Skeleton styles
export const SkeletonCard = styled(StyledPostCard)`
  pointer-events: none;
`;

export const SkeletonMedia = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: ${props => props.theme.borderRadius.md};
  background: linear-gradient(90deg, 
    ${props => props.theme.colors.background.secondary} 25%, 
    ${props => props.theme.colors.background.tertiary} 50%, 
    ${props => props.theme.colors.background.secondary} 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export const SkeletonLine = styled.div<{ $width?: string; $height?: string }>`
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '12px'};
  border-radius: ${props => props.theme.borderRadius.sm};
  margin-top: ${props => props.theme.spacing.sm};
  background: linear-gradient(90deg, 
    ${props => props.theme.colors.background.secondary} 25%, 
    ${props => props.theme.colors.background.tertiary} 50%, 
    ${props => props.theme.colors.background.secondary} 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export const FeedPlaceholder = styled.div`
  width: 100%;
  min-height: 350px;
  background: transparent;
`;

