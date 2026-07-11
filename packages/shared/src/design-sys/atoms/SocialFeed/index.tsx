import React, { useRef, useState, useEffect } from "react";
import { SocialFeedGridProps, SocialPostCardProps } from "./SocialFeed.types";
import { SocialComment } from "../../../types/socialFeed";
import { ZnIcon } from "../ZnIcon";
import {
  InstagramOutlined,
  HeartOutlined,
  MessageOutlined,
  PlayCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { SOCIAL_INSTAGRAM_URL } from "../../../config/urls";
import {
  GridContainer,
  StyledPostCard,
  CardHeader,
  UserInfo,
  Username,
  PlatformBadge,
  CardMediaWrapper,
  CardMedia,
  MediaTypeIcon,
  CardCaption,
  CardStats,
  StatItem,
  CardCommentsList,
  StyledComment,
  CommentUser,
  CommentText,
  SkeletonCard,
  SkeletonMedia,
  SkeletonLine,
} from "./SocialFeed.styles";

/**
 * Tarjeta de publicación individual de Instagram
 */
export const SocialPostCard: React.FC<SocialPostCardProps> = ({ post }) => {
  const resolvedUsername = post.username || SOCIAL_INSTAGRAM_URL.split('/').filter(Boolean).pop() || "simonpastasartesanales";
  return (
    <StyledPostCard href={post.permalink} target="_blank" rel="noopener noreferrer">
      <CardHeader>
        <UserInfo>
          <Username>@{resolvedUsername}</Username>
        </UserInfo>
        <PlatformBadge 
          as="div"
          aria-label="Ver en Instagram"
        >
          <ZnIcon icon={InstagramOutlined} />
        </PlatformBadge>
      </CardHeader>

      <CardMediaWrapper>
        <CardMedia src={post.mediaUrl} alt={post.caption || "Publicación de Instagram"} loading="lazy" referrerPolicy="no-referrer" />
        {post.mediaType === "VIDEO" && (
          <MediaTypeIcon title="Video">
            <ZnIcon icon={PlayCircleOutlined} />
          </MediaTypeIcon>
        )}
        {post.mediaType === "CAROUSEL_ALBUM" && (
          <MediaTypeIcon title="Carrusel">
            <ZnIcon icon={CopyOutlined} />
          </MediaTypeIcon>
        )}
      </CardMediaWrapper>

      {post.caption && <CardCaption>{post.caption}</CardCaption>}

      <CardStats>
        <StatItem>
          <ZnIcon icon={HeartOutlined} /> {post.likesCount ?? 0}
        </StatItem>
        <StatItem>
          <ZnIcon icon={MessageOutlined} /> {post.commentsCount ?? 0}
        </StatItem>
      </CardStats>

      {post.comments && post.comments.length > 0 && (
        <CardCommentsList>
          {post.comments.map((comment: SocialComment) => (
            <StyledComment key={comment.id}>
              <CommentUser>@{comment.username}</CommentUser>
              <CommentText>{comment.text}</CommentText>
            </StyledComment>
          ))}
        </CardCommentsList>
      )}
    </StyledPostCard>
  );
};

/**
 * Grid de publicaciones de Instagram con Lazy Loading y Fallback a testimoniales estáticos
 */
export const SocialFeedGrid: React.FC<SocialFeedGridProps> = ({
  posts,
  isLoading = false,
  fallbackComponent,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersected, setIsIntersected] = useState(false);

  // Implementación del Intersection Observer para Carga Perezosa (Lazy Loading)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect(); // Desconectar una vez cargado
        }
      },
      {
        rootMargin: "100px", // Cargar 100px antes de que entre al viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Si no ha intersectado, no está cargando y no tenemos posts en memoria, mostrar placeholder simple para performance
  if (!isIntersected && !isLoading && (!posts || posts.length === 0)) {
    return <div ref={containerRef} style={{ minHeight: "200px", width: "100%" }} />;
  }

  // Si está cargando, renderizar Skeletons de forma responsiva
  if (isLoading) {
    return (
      <GridContainer ref={containerRef}>
        {[1, 2, 3].map((key) => (
          <SkeletonCard key={key}>
            <CardHeader>
              <SkeletonLine $width="120px" $height="16px" />
              <SkeletonLine $width="20px" $height="20px" />
            </CardHeader>
            <SkeletonMedia />
            <SkeletonLine $width="90%" $height="12px" />
            <SkeletonLine $width="80%" $height="12px" />
            <SkeletonLine $width="40%" $height="16px" />
          </SkeletonCard>
        ))}
      </GridContainer>
    );
  }

  // Red de Seguridad / Fallback inteligente: si no hay posts, renderizar testimoniales por defecto
  if (!posts || posts.length === 0) {
    console.warn("[SOCIAL-FEED] Feed vacío o fallido. Renderizando testimoniales de fallback por defecto.");
    return <>{fallbackComponent}</>;
  }

  return (
    <GridContainer ref={containerRef}>
      {posts.map((post) => (
        <SocialPostCard key={post.id} post={post} />
      ))}
    </GridContainer>
  );
};
