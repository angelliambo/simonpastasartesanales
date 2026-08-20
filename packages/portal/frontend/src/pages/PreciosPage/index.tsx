import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import SEO from "../../components/SEO";
import type { Product } from "@factory/shared/types/products";

import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import {
  LockOutlined,
  WhatsAppOutlined,
  ZoomInOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  TagOutlined,
  ShareAltOutlined,
  CopyOutlined,
  SendOutlined,
  FacebookOutlined,
  TwitterOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const NO_IMAGE_PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23f3f4f6'/><g fill='%239ca3af' transform='translate(100, 70)'><rect x='10' y='10' width='80' height='80' rx='8' fill='none' stroke='%239ca3af' stroke-width='4'/><circle cx='35' cy='35' r='8'/><path d='M20 75 L45 45 L60 60 L75 45 L80 75 Z'/></g><text x='150' y='200' font-size='16' font-weight='600' font-family='sans-serif' fill='%236b7280' text-anchor='middle'>Sin Imagen</text></svg>";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  min-height: 80vh;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  background: ${props => props.theme.gradients.glass};
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.border.normal};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.typography.fontWeight.bold};

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const AdminBadgeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.primary[50]};
  color: ${props => props.theme.colors.primary[700]};
  border-radius: ${props => props.theme.borderRadius.xl};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  text-decoration: none;
  border: 1px solid ${props => props.theme.colors.primary[300]};
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    background-color: ${props => props.theme.colors.primary[100]};
  }
`;

const ControlsBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const TopSearchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
`;

const SearchInput = styled.input`
  flex: 1;
  max-width: 450px;
  min-width: 240px;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border.normal};
  background-color: ${props => props.theme.colors.background.card};
  color: ${props => props.theme.colors.text.primary};
  border-radius: 30px;
  font-size: 0.95rem;
  outline: none;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all ${props => props.theme.transitions.normal};

  &:focus {
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: ${props => props.theme.effects.glow.primary};
  }
`;

const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const SelectSort = styled.select`
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.border.normal};
  background-color: ${props => props.theme.colors.background.card};
  color: ${props => props.theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: ${props => props.theme.colors.primary[500]};
  }
`;

const ViewToggleGroup = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.background.secondary};
  padding: 4px;
  border-radius: 24px;
  border: 1px solid ${props => props.theme.colors.border.normal};
`;

const ViewToggleButton = styled.button<{ $active?: boolean }>`
  background-color: ${props => (props.$active ? props.theme.colors.primary[500] : "transparent")};
  color: ${props => (props.$active ? "#ffffff" : props.theme.colors.text.secondary)};
  border: none;
  padding: 8px 14px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => (props.$active ? "#ffffff" : props.theme.colors.text.primary)};
  }
`;

/* Barra de Filtro de Categorías en Pills (Sin emojis) */
const CategoryPillsBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 6px;
  scrollbar-width: thin;
`;

const CategoryPill = styled.button<{ $active?: boolean }>`
  background-color: ${props =>
    props.$active ? props.theme.colors.primary[500] : props.theme.colors.background.card};
  color: ${props => (props.$active ? "#ffffff" : props.theme.colors.text.primary)};
  border: 1px solid
    ${props => (props.$active ? props.theme.colors.primary[500] : props.theme.colors.border.normal)};
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  box-shadow: ${props => (props.$active ? props.theme.shadows.light : "none")};

  &:hover {
    border-color: ${props => props.theme.colors.primary[500]};
    color: ${props => (props.$active ? "#ffffff" : props.theme.colors.primary[600])};
  }
`;

/* Section Category Header para catálogo agrupado (Texto puro sin emojis) */
const CategoryGroupSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const CategoryGroupHeader = styled.h2`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 ${props => props.theme.spacing.md} 0;
  padding-bottom: 8px;
  border-bottom: 2px solid ${props => props.theme.colors.primary[500]};
  display: flex;
  align-items: center;
  gap: 8px;
`;

/* Grid View Styles */
const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  animation: ${fadeIn} 0.3s ease-out;
`;

const ProductCard = styled.div`
  background: ${props => props.theme.colors.background.card};
  border: 1px solid ${props => props.theme.colors.border.normal};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.shadows.light};
  transition: transform ${props => props.theme.transitions.normal}, box-shadow ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

/* Skeleton Card Loader */
const SkeletonCard = styled.div`
  background: ${props => props.theme.colors.background.card};
  border: 1px solid ${props => props.theme.colors.border.normal};
  border-radius: ${props => props.theme.borderRadius.lg};
  height: 380px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(240, 240, 240, 0) 0%,
      rgba(230, 230, 230, 0.6) 50%,
      rgba(240, 240, 240, 0) 100%
    );
    background-size: 200px 100%;
    animation: ${shimmer} 1.5s infinite;
  }
`;

const SkeletonBox = styled.div<{ $h: string; $w?: string; $radius?: string }>`
  height: ${props => props.$h};
  width: ${props => props.$w || "100%"};
  border-radius: ${props => props.$radius || "8px"};
  background-color: ${props => props.theme.colors.background.secondary};
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background-color: ${props => props.theme.colors.background.secondary};
  overflow: hidden;
  border-top-left-radius: ${props => props.theme.borderRadius.lg};
  border-top-right-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s ease;

  ${ImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

const GalleryThumbBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: ${props => props.theme.colors.background.secondary};
  border-bottom: 1px solid ${props => props.theme.colors.border.normal};
`;

const GalleryThumbBtn = styled.button<{ $active?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid ${props => (props.$active ? props.theme.colors.primary[500] : "transparent")};
  cursor: pointer;
  padding: 0;
  background: transparent;
  opacity: ${props => (props.$active ? 1 : 0.65)};
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ZoomIconButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.65);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background-color: ${props => props.theme.colors.primary[500]};
    transform: scale(1.1);
  }
`;

const ShareIconButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.65);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background-color: #1890ff;
    transform: scale(1.1);
  }
`;

const ListShareBtn = styled.button`
  background-color: ${props => props.theme.colors.background.secondary};
  color: ${props => props.theme.colors.text.primary};
  border: 1px solid ${props => props.theme.colors.border.normal};
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1890ff;
    color: #ffffff;
    border-color: #1890ff;
  }
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CategoryTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
`;

const CategoryTag = styled.span`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary[50]};
  color: ${props => props.theme.colors.primary[800]};
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 6px 0;
`;

const ProductDescription = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.4;
`;

const VarietiesContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const VarietiesTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 4px;
`;

const VarietyBadge = styled.span`
  display: inline-block;
  background-color: ${props => props.theme.colors.background.secondary};
  color: ${props => props.theme.colors.text.primary};
  border: 1px solid ${props => props.theme.colors.border.normal};
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 12px;
  margin: 2px;
`;

const PresentationsList = styled.div`
  margin-top: auto;
  border-top: 1px solid ${props => props.theme.colors.border.normal};
  padding-top: ${props => props.theme.spacing.sm};
`;

const PresentationRowItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px dashed ${props => props.theme.colors.border.normal};

  &:last-child {
    border-bottom: none;
  }
`;

const PresentationName = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const PresentationPrice = styled.span`
  font-size: 1.05rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary[500]};
`;

const ActionRowGrid = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 14px;
`;

const WhatsAppBtn = styled.a`
  background-color: #25d366;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
  transition: background-color 0.2s, transform 0.15s ease;

  &:hover {
    background-color: #128c7e;
    transform: translateY(-1px);
  }
`;

/* List View / Table Styles con Columna Separada de Categorías */
const ListViewContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${props => props.theme.colors.background.card};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.border.normal};
  box-shadow: ${props => props.theme.shadows.medium};
  margin-bottom: ${props => props.theme.spacing.xl};
  animation: ${fadeIn} 0.3s ease-out;
`;

const ListTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 750px;
`;

const ListTh = styled.th`
  text-align: left;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background.secondary};
  border-bottom: 2px solid ${props => props.theme.colors.border.normal};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;

const ListTr = styled.tr`
  transition: background-color ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.background.secondary};
  }
`;

const ListTd = styled.td`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border.normal};
  color: ${props => props.theme.colors.text.primary};
  vertical-align: middle;
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

/* Componentes de Paginación */
const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin: 24px 0;
  padding: 16px;
  background-color: ${props => props.theme.colors.background.card};
  border: 1px solid ${props => props.theme.colors.border.normal};
  border-radius: 16px;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 18px;
  border: 1px solid
    ${props => (props.$active ? props.theme.colors.primary[500] : props.theme.colors.border.normal)};
  background-color: ${props =>
    props.$active ? props.theme.colors.primary[500] : props.theme.colors.background.card};
  color: ${props => (props.$active ? "#ffffff" : props.theme.colors.text.primary)};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${props => props.theme.colors.primary[500]};
    color: ${props => (props.$active ? "#ffffff" : props.theme.colors.primary[600])};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PageSizeSelect = styled.select`
  padding: 6px 12px;
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colors.border.normal};
  background-color: ${props => props.theme.colors.background.card};
  color: ${props => props.theme.colors.text.primary};
  font-size: 0.85rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
`;

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 48px 24px;
  background-color: ${props => props.theme.colors.background.card};
  border-radius: 16px;
  border: 1px dashed ${props => props.theme.colors.border.normal};
  color: ${props => props.theme.colors.text.secondary};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  padding: ${props => props.theme.spacing.md};
  backdrop-filter: blur(6px);
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.large};
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalTitleText = styled.h3`
  color: #ffffff;
  margin-top: ${props => props.theme.spacing.md};
  font-size: 1.2rem;
  text-align: center;
`;

/* Styled Components del Modal de Compartir */
const ShareDialog = styled.div`
  background: ${props => props.theme.colors.background.card};
  border: 1px solid ${props => props.theme.colors.border.normal};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 520px;
  width: 100%;
  padding: 24px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  position: relative;
`;

const ShareHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ShareTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ShareCardPreview = styled.div`
  display: flex;
  gap: 12px;
  background-color: ${props => props.theme.colors.background.secondary};
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.normal};
  margin-bottom: 20px;
`;

const ShareCardThumb = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.border.normal};
`;

const ShareCardInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ShareGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
`;

const ShareOptionBtn = styled.a<{ $bg: string; $color?: string }>`
  background-color: ${props => props.$bg};
  color: ${props => props.$color || "#ffffff"};
  padding: 10px 14px;
  border-radius: 24px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  border: none;
  transition: transform 0.15s ease, opacity 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
    color: ${props => props.$color || "#ffffff"};
  }
`;

const CopyBox = styled.div`
  background-color: ${props => props.theme.colors.background.secondary};
  border: 1px solid ${props => props.theme.colors.border.normal};
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text.secondary};
  white-space: pre-wrap;
  max-height: 90px;
  overflow-y: auto;
  margin-bottom: 12px;
`;

const LegalDisclaimerCard = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.background.card};
  border: 1px solid ${props => props.theme.colors.border.normal};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.small};
`;

const LegalDisclaimerTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegalDisclaimerText = styled.p`
  font-size: 0.825rem;
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

const LegalLink = styled.a`
  color: ${props => props.theme.colors.primary[500]};
  text-decoration: underline;
  margin-left: 4px;
  font-weight: 500;
  &:hover {
    color: ${props => props.theme.colors.primary[700]};
  }
`;

const SnackbarContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999999;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 24px;
  background-color: ${props => props.theme.colors.success[600]};
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  font-weight: 600;
  font-size: 0.875rem;
  animation: ${fadeIn} 0.25s ease-out;

  @media (max-width: 480px) {
    bottom: 16px;
    right: 16px;
    left: 16px;
    justify-content: space-between;
  }
`;

const ProductCardItem: React.FC<{
  product: Product;
  onOpenLightbox: (url: string, title: string) => void;
  onShare: (product: Product) => void;
}> = ({ product, onOpenLightbox, onShare }) => {
  const imagenes = product.imagenes && product.imagenes.length > 0 ? product.imagenes : (product.imagen ? [product.imagen] : []);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const currentImg = imagenes[activeImgIndex] || product.imagen || NO_IMAGE_PLACEHOLDER;
  const presentaciones =
    product.presentaciones && product.presentaciones.length > 0
      ? product.presentaciones
      : [{ presentacion: product.presentacion || "Unidad", precio: product.precio ?? 0 }];

  const prodCategories = product.categorias && product.categorias.length > 0 ? product.categorias : (product.categoria ? [product.categoria] : []);

  const waMessage = encodeURIComponent(
    `Hola! Quisiera realizar un pedido de: ${product.titulo}`
  );
  const waLink = `${BRAND_CONFIG.whatsappUrl}?text=${waMessage}`;

  return (
    <ProductCard>
      <ImageContainer onClick={() => onOpenLightbox(currentImg, product.titulo)}>
        <ProductImage
          src={currentImg}
          alt={product.titulo}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = NO_IMAGE_PLACEHOLDER;
          }}
        />
        <ShareIconButton
          type="button"
          aria-label="Compartir este producto"
          title="Compartir en redes sociales"
          onClick={(e) => {
            e.stopPropagation();
            onShare(product);
          }}
        >
          <ZnIcon icon={ShareAltOutlined} />
        </ShareIconButton>
        <ZoomIconButton
          type="button"
          aria-label="Ver imagen ampliada"
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox(currentImg, product.titulo);
          }}
        >
          <ZnIcon icon={ZoomInOutlined} />
        </ZoomIconButton>
      </ImageContainer>

      {imagenes.length > 1 && (
        <GalleryThumbBar>
          {imagenes.map((img, idx) => (
            <GalleryThumbBtn
              key={idx}
              $active={idx === activeImgIndex}
              onClick={() => setActiveImgIndex(idx)}
            >
              <img src={img} alt={`Miniatura ${idx + 1}`} loading="lazy" decoding="async" />
            </GalleryThumbBtn>
          ))}
        </GalleryThumbBar>
      )}

      <CardContent>
        {prodCategories.length > 0 && (
          <CategoryTagsContainer>
            {prodCategories.map((c, cIdx) => (
              <CategoryTag key={cIdx}>{c}</CategoryTag>
            ))}
          </CategoryTagsContainer>
        )}
        <ProductTitle>{product.titulo}</ProductTitle>
        <ProductDescription>{product.descripcion}</ProductDescription>

        {product.variedades && product.variedades.length > 0 && (
          <VarietiesContainer>
            <VarietiesTitle>
              <ZnIcon icon={TagOutlined} /> Variedades disponibles:
            </VarietiesTitle>
            {product.variedades.map((v, vIdx) => (
              <VarietyBadge key={vIdx}>{v}</VarietyBadge>
            ))}
          </VarietiesContainer>
        )}

        <PresentationsList>
          {presentaciones.map((p, pIdx) => (
            <PresentationRowItem key={pIdx}>
              <PresentationName>{p.presentacion}</PresentationName>
              <PresentationPrice>${p.precio.toLocaleString("es-AR")}*</PresentationPrice>
            </PresentationRowItem>
          ))}
        </PresentationsList>

        <ActionRowGrid>
          <WhatsAppBtn href={waLink} target="_blank" rel="noopener noreferrer">
            <ZnIcon icon={WhatsAppOutlined} /> Pedir por WhatsApp
          </WhatsAppBtn>
          <ListShareBtn type="button" onClick={() => onShare(product)} title="Compartir">
            <ZnIcon icon={ShareAltOutlined} />
          </ListShareBtn>
        </ActionRowGrid>
      </CardContent>
    </ProductCard>
  );
};

export const PreciosPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [sortBy, setSortBy] = useState<string>("orden");
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
  const [shareProduct, setShareProduct] = useState<Product | null>(null);

  // Estados de Paginación y Renderizado Optimizados
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(12); // 12 por defecto para carga ultrarrápida en mobile

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error("Error cargando productos:", err))
      .finally(() => setLoading(false));
  }, []);

  // Resetear a la página 1 cuando cambia algún filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, sortBy, pageSize]);

  // Lista dinámica de categorías únicas existentes en la BBD
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.categorias && Array.isArray(p.categorias)) {
        p.categorias.forEach((c) => c && set.add(c.trim()));
      } else if (p.categoria && p.categoria.trim()) {
        set.add(p.categoria.trim());
      }
    });
    return ["Todas", ...Array.from(set)];
  }, [products]);

  // Filtrado y Ordenamiento Combinado
  const processedProducts = useMemo(() => {
    let result = products.filter((p) => p.disponible !== false);

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.titulo.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q) ||
          (p.categoria && p.categoria.toLowerCase().includes(q)) ||
          (p.categorias && p.categorias.some((c) => c.toLowerCase().includes(q))) ||
          (p.variedades && p.variedades.some((v) => v.toLowerCase().includes(q)))
      );
    }

    if (selectedCategory !== "Todas") {
      result = result.filter((p) => {
        if (p.categorias && Array.isArray(p.categorias) && p.categorias.length > 0) {
          return p.categorias.includes(selectedCategory);
        }
        return p.categoria === selectedCategory;
      });
    }

    return [...result].sort((a, b) => {
      const priceA = a.presentaciones?.[0]?.precio ?? a.precio ?? 0;
      const priceB = b.presentaciones?.[0]?.precio ?? b.precio ?? 0;

      if (sortBy === "precio-asc") return priceA - priceB;
      if (sortBy === "precio-desc") return priceB - priceA;
      if (sortBy === "nombre") return a.titulo.localeCompare(b.titulo);
      if (sortBy === "categoria") return (a.categoria || "").localeCompare(b.categoria || "");
      return (a.orden ?? 0) - (b.orden ?? 0);
    });
  }, [products, search, selectedCategory, sortBy]);

  // Cálculo de Paginación
  const totalItems = processedProducts.length;
  const totalPages = pageSize > 0 ? Math.ceil(totalItems / pageSize) : 1;

  const paginatedProducts = useMemo(() => {
    if (pageSize <= 0) return processedProducts;
    const startIndex = (currentPage - 1) * pageSize;
    return processedProducts.slice(startIndex, startIndex + pageSize);
  }, [processedProducts, currentPage, pageSize]);

  // Agrupamiento por Categorías para los productos paginados
  const groupedProducts = useMemo(() => {
    if (selectedCategory !== "Todas") {
      return { [selectedCategory]: paginatedProducts };
    }
    const groups: { [key: string]: Product[] } = {};
    paginatedProducts.forEach((p) => {
      const mainCat = p.categorias?.[0] || p.categoria || "Especialidades";
      if (!groups[mainCat]) groups[mainCat] = [];
      groups[mainCat].push(p);
    });
    return groups;
  }, [paginatedProducts, selectedCategory]);

  const getPortalTarget = (): Element => {
    return document.getElementById("floating-elements") || document.body;
  };

  const getShareText = (prod: Product) => {
    const presentacionesStr = (prod.presentaciones || [])
      .map((p) => `${p.presentacion}: $${p.precio.toLocaleString("es-AR")}`)
      .join(" | ");

    const variedadesStr =
      prod.variedades && prod.variedades.length > 0 ? ` (Sabores: ${prod.variedades.join(", ")})` : "";

    return `🍝 *${prod.titulo}* - Simón Pastas Artesanales\n${prod.descripcion}${variedadesStr}\n💰 Precios: ${presentacionesStr}\n📍 Catálogo y Pedidos: ${window.location.origin}/precios`;
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showShareToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyText = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    showShareToast("¡Ficha copiada! Lista para pegar.");
  };

  const handleDownloadImage = async (imgUrl: string, title: string) => {
    try {
      showShareToast("Descargando imagen...");
      const res = await fetch(imgUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      const fileName = `${title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-")}.webp`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      showShareToast("¡Foto descargada a tu dispositivo!");
    } catch (err) {
      window.open(imgUrl, "_blank");
    }
  };

  const handleNativeShare = async (prod: Product) => {
    const imgUrl = (prod.imagenes && prod.imagenes[0]) || prod.imagen;
    const text = getShareText(prod);

    if (navigator.share) {
      try {
        if (imgUrl && navigator.canShare) {
          const response = await fetch(imgUrl);
          const blob = await response.blob();
          const file = new File([blob], `${prod.titulo.toLowerCase().replace(/[^a-z0-9]/g, "-")}.webp`, {
            type: blob.type || "image/webp",
          });

          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: `${prod.titulo} | Simón Pastas`,
              text: text,
              files: [file],
            });
            return;
          }
        }
        await navigator.share({
          title: `${prod.titulo} | Simón Pastas`,
          text: text,
          url: `${window.location.origin}/precios`,
        });
      } catch (err) {
        // Ignorar cancelación del usuario
      }
    }
  };

  const structuredCatalogData = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Lista Oficial de Precios - Simón Pastas Artesanales",
    "url": "https://simonpastasartesanales.com.ar/precios",
    "numberOfItems": products.length,
    "itemListElement": products.map((prod, idx) => ({
      "@type": "Offer",
      "position": idx + 1,
      "price": prod.presentaciones?.[0]?.precio ?? prod.precio ?? 0,
      "priceCurrency": "ARS",
      "availability": prod.disponible !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemOffered": {
        "@type": "Product",
        "name": prod.titulo,
        "description": prod.descripcion,
        "image": prod.imagen || undefined,
      },
    })),
  };

  return (
    <PageContainer>
      <SEO
        title={`Lista de Precios de Pastas Frescas y Mayorista | Sorrentinos, Ravioles & Empanadas | ${BRAND_CONFIG.siteName}`}
        description="Catálogo oficial y lista de precios de fábrica de pastas artesanales. Sorrentinos caseros, ravioles, ñoquis del 29, panzottis, fideos al huevo y empanadas. Venta minorista, delivery y distribución al por mayor para restaurantes en Zona Sur."
        keywords={[
          "lista de precios pastas",
          "precios sorrentinos",
          "ravioles bernal precios",
          "venta de pastas al por mayor",
          "proveedor de pastas para restaurantes",
          "fábrica de pastas quilmes",
          "comprar pastas artesanales",
          "delivery de pastas frescas",
          "ñoquis del 29",
        ]}
        structuredData={structuredCatalogData}
      />

      <HeroSection>
        <Title>Lista de Precios Oficial</Title>
        <Subtitle>
          Pastas frescas artesanales elaboradas día a día con ingredientes seleccionados.
        </Subtitle>
        <div style={{ marginTop: 20 }}>
          <AdminBadgeLink href="/admin/precios">
            <ZnIcon icon={LockOutlined} /> Administrador
          </AdminBadgeLink>
        </div>
      </HeroSection>

      <ControlsBar>
        <TopSearchRow>
          <SearchInput
            type="text"
            placeholder="Buscar por nombre, sabor o ingrediente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <ControlsRight>
            <SelectSort value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="orden">Orden Recomendado</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="nombre">Nombre (A-Z)</option>
              <option value="categoria">Por Categoría</option>
            </SelectSort>

            <ViewToggleGroup>
              <ViewToggleButton $active={viewMode === "cards"} onClick={() => setViewMode("cards")}>
                <ZnIcon icon={AppstoreOutlined} /> Tarjetas
              </ViewToggleButton>
              <ViewToggleButton $active={viewMode === "list"} onClick={() => setViewMode("list")}>
                <ZnIcon icon={UnorderedListOutlined} /> Lista Rápida
              </ViewToggleButton>
            </ViewToggleGroup>
          </ControlsRight>
        </TopSearchRow>

        {/* Barra de Pills de Categorías Dinámicas */}
        {categoriesList.length > 1 && (
          <CategoryPillsBar>
            {categoriesList.map((cat, idx) => (
              <CategoryPill
                key={idx}
                $active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "Todas" ? "Todas las Categorías" : cat}
              </CategoryPill>
            ))}
          </CategoryPillsBar>
        )}
      </ControlsBar>

      {/* SKELETON LOADER EN CASO DE CARGA INICIAL (Cero Parpadeos) */}
      {loading ? (
        viewMode === "cards" ? (
          <ProductsGrid>
            {[1, 2, 3, 4, 5, 6].map((key) => (
              <SkeletonCard key={key}>
                <SkeletonBox $h="180px" />
                <SkeletonBox $h="20px" $w="70%" />
                <SkeletonBox $h="14px" $w="90%" />
                <SkeletonBox $h="14px" $w="50%" />
                <SkeletonBox $h="40px" style={{ marginTop: "auto" }} />
              </SkeletonCard>
            ))}
          </ProductsGrid>
        ) : (
          <ListViewContainer>
            <div style={{ padding: 24, textAlign: "center", color: "#888" }}>
              <ZnIcon icon={LoadingOutlined} style={{ fontSize: "1.8rem", marginBottom: 8 }} />
              <br />
              Cargando catálogo oficial de pastas...
            </div>
          </ListViewContainer>
        )
      ) : processedProducts.length === 0 ? (
        <EmptyStateContainer>
          <InfoCircleOutlined style={{ fontSize: "2.5rem", color: "#ccc", marginBottom: 12 }} />
          <h3>No se encontraron productos</h3>
          <p style={{ margin: 0 }}>Intenta modificar los términos de búsqueda o cambiar de categoría.</p>
        </EmptyStateContainer>
      ) : viewMode === "cards" ? (
        /* VISTA DE TARJETAS (CARDS VIEW) */
        <div>
          {Object.entries(groupedProducts).map(([catTitle, groupProds]) => (
            <CategoryGroupSection key={catTitle}>
              {selectedCategory === "Todas" && (
                <CategoryGroupHeader>
                  {catTitle} <small style={{ fontSize: "0.85rem", color: "#888", fontWeight: 500 }}>({groupProds.length})</small>
                </CategoryGroupHeader>
              )}
              <ProductsGrid>
                {groupProds.map((product) => (
                  <ProductCardItem
                    key={product.id}
                    product={product}
                    onOpenLightbox={(url, title) => setSelectedImage({ url, title })}
                    onShare={(prod) => setShareProduct(prod)}
                  />
                ))}
              </ProductsGrid>
            </CategoryGroupSection>
          ))}
        </div>
      ) : (
        /* VISTA DE LISTA MENÚ RÁPIDO */
        <ListViewContainer>
          <ListTable>
            <thead>
              <tr>
                <ListTh style={{ width: "160px" }}>Categoría(s)</ListTh>
                <ListTh>Producto y Descripción</ListTh>
                <ListTh>Variedades / Sabores</ListTh>
                <ListTh>Presentaciones y Precios</ListTh>
                <ListTh style={{ width: "180px", textAlign: "center" }}>Acción</ListTh>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => {
                const presentaciones =
                  product.presentaciones && product.presentaciones.length > 0
                    ? product.presentaciones
                    : [{ presentacion: product.presentacion || "Unidad", precio: product.precio ?? 0 }];

                const prodCategories = product.categorias && product.categorias.length > 0 ? product.categorias : (product.categoria ? [product.categoria] : []);

                const waMessage = encodeURIComponent(
                  `Hola! Quisiera realizar un pedido de: ${product.titulo}`
                );
                const waLink = `${BRAND_CONFIG.whatsappUrl}?text=${waMessage}`;

                return (
                  <ListTr key={product.id}>
                    <ListTd>
                      {prodCategories.length > 0 ? (
                        <CategoryTagsContainer>
                          {prodCategories.map((c, cIdx) => (
                            <CategoryTag key={cIdx}>{c}</CategoryTag>
                          ))}
                        </CategoryTagsContainer>
                      ) : (
                        <small style={{ color: "#999" }}>General</small>
                      )}
                    </ListTd>
                    <ListTd>
                      <div>
                        <strong style={{ fontSize: "1rem" }}>{product.titulo}</strong>
                      </div>
                      <small style={{ color: "#666" }}>{product.descripcion}</small>
                    </ListTd>
                    <ListTd>
                      {product.variedades && product.variedades.length > 0 ? (
                        product.variedades.map((v, vIdx) => <VarietyBadge key={vIdx}>{v}</VarietyBadge>)
                      ) : (
                        <small style={{ color: "#888" }}>Tradicional</small>
                      )}
                    </ListTd>
                    <ListTd>
                      {presentaciones.map((p, pIdx) => (
                        <div key={pIdx} style={{ marginBottom: 4 }}>
                          <strong>{p.presentacion}</strong>: ${p.precio.toLocaleString("es-AR")}*
                        </div>
                      ))}
                    </ListTd>
                    <ListTd style={{ textAlign: "center" }}>
                      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                        <WhatsAppBtn href={waLink} target="_blank" rel="noopener noreferrer">
                          <ZnIcon icon={WhatsAppOutlined} /> Pedir
                        </WhatsAppBtn>
                        <ListShareBtn
                          type="button"
                          onClick={() => setShareProduct(product)}
                          title="Compartir producto"
                        >
                          <ZnIcon icon={ShareAltOutlined} />
                        </ListShareBtn>
                      </div>
                    </ListTd>
                  </ListTr>
                );
              })}
            </tbody>
          </ListTable>
        </ListViewContainer>
      )}

      {/* BARRA DE PAGINACIÓN Y CONTROL DE PRODUCTOS POR PÁGINA */}
      {!loading && processedProducts.length > 0 && (
        <PaginationContainer>
          <div style={{ fontSize: "0.875rem", color: "#666", fontWeight: 500 }}>
            Mostrando {pageSize > 0 ? `${(currentPage - 1) * pageSize + 1} - ${Math.min(currentPage * pageSize, totalItems)}` : totalItems} de {totalItems} pastas
          </div>

          {totalPages > 1 && (
            <PaginationControls>
              <PageButton
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                aria-label="Página anterior"
              >
                <ZnIcon icon={LeftOutlined} />
              </PageButton>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <PageButton
                  key={pageNum}
                  type="button"
                  $active={pageNum === currentPage}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </PageButton>
              ))}

              <PageButton
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                aria-label="Página siguiente"
              >
                <ZnIcon icon={RightOutlined} />
              </PageButton>
            </PaginationControls>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "#666" }}>
            <span>Mostrar por página:</span>
            <PageSizeSelect
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={12}>12 productos</option>
              <option value={24}>24 productos</option>
              <option value={48}>48 productos</option>
              <option value={0}>Ver Todos</option>
            </PageSizeSelect>
          </div>
        </PaginationContainer>
      )}

      {/* Tarjeta de Aviso Legal */}
      <LegalDisclaimerCard>
        <LegalDisclaimerTitle>
          <ZnIcon icon={InfoCircleOutlined} /> * Aviso Legal y Variación de Precios
        </LegalDisclaimerTitle>
        <LegalDisclaimerText>
          Los precios, presentaciones, promociones y disponibilidad de productos exhibidos en esta lista oficial están sujetos a modificaciones y ajustes sin previo aviso debido a variaciones de costos de insumos y mercado. Fábrica de Pastas Simón y la administración de la plataforma quedan exentas de toda responsabilidad civil, comercial o legal por eventuales errores tipográficos, desactualizaciones temporales o imponderables de stock. Para confirmar valores vigentes, cotizaciones especiales o pedidos mayoristas, consulte vía WhatsApp antes de concretar su compra. Consulte nuestros <LegalLink href="/legal/terms">Términos y Condiciones</LegalLink>.
        </LegalDisclaimerText>
      </LegalDisclaimerCard>

      {/* Modal Lightbox */}
      {selectedImage &&
        createPortal(
          <ModalOverlay onClick={() => setSelectedImage(null)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalCloseButton type="button" onClick={() => setSelectedImage(null)}>
                <ZnIcon icon={CloseOutlined} />
              </ModalCloseButton>
              <ModalImage src={selectedImage.url} alt={selectedImage.title} />
              <ModalTitleText>{selectedImage.title}</ModalTitleText>
            </ModalContent>
          </ModalOverlay>,
          getPortalTarget()
        )}

      {/* Modal de Compartir en Redes Sociales */}
      {shareProduct &&
        createPortal(
          <ModalOverlay onClick={() => setShareProduct(null)}>
            <ShareDialog onClick={(e) => e.stopPropagation()}>
              <ShareHeader>
                <ShareTitle>
                  <ZnIcon icon={ShareAltOutlined} /> Compartir Producto
                </ShareTitle>
                <ModalCloseButton
                  type="button"
                  onClick={() => setShareProduct(null)}
                  style={{ position: "static", color: "#666", fontSize: "1.2rem" }}
                >
                  <ZnIcon icon={CloseOutlined} />
                </ModalCloseButton>
              </ShareHeader>

              <ShareCardPreview>
                <ShareCardThumb
                  src={
                    (shareProduct.imagenes && shareProduct.imagenes[0]) ||
                    shareProduct.imagen ||
                    NO_IMAGE_PLACEHOLDER
                  }
                  alt={shareProduct.titulo}
                  onError={(e) => {
                    e.currentTarget.src = NO_IMAGE_PLACEHOLDER;
                  }}
                />
                <ShareCardInfo>
                  <strong style={{ fontSize: "1rem" }}>{shareProduct.titulo}</strong>
                  <small style={{ color: "#666" }}>
                    {shareProduct.presentaciones?.[0]?.presentacion || shareProduct.presentacion || "Unidad"} — $
                    {(shareProduct.presentaciones?.[0]?.precio ?? shareProduct.precio ?? 0).toLocaleString("es-AR")}
                  </small>
                </ShareCardInfo>
              </ShareCardPreview>

              <ShareGrid>
                {/* 1. WhatsApp */}
                <ShareOptionBtn
                  $bg="#25d366"
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getShareText(shareProduct))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ZnIcon icon={WhatsAppOutlined} /> WhatsApp
                </ShareOptionBtn>

                {/* 2. Facebook */}
                <ShareOptionBtn
                  $bg="#1877f2"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `${window.location.origin}/precios`
                  )}&quote=${encodeURIComponent(getShareText(shareProduct))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ZnIcon icon={FacebookOutlined} /> Facebook
                </ShareOptionBtn>

                {/* 3. Threads */}
                <ShareOptionBtn
                  $bg="#000000"
                  href={`https://threads.net/intent/post?text=${encodeURIComponent(getShareText(shareProduct))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ZnIcon icon={SendOutlined} /> Threads
                </ShareOptionBtn>

                {/* 4. X (Twitter) */}
                <ShareOptionBtn
                  $bg="#1da1f2"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText(shareProduct))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ZnIcon icon={TwitterOutlined} /> X (Twitter)
                </ShareOptionBtn>

                {/* 5. Telegram */}
                <ShareOptionBtn
                  $bg="#0088cc"
                  href={`https://t.me/share/url?url=${encodeURIComponent(
                    `${window.location.origin}/precios`
                  )}&text=${encodeURIComponent(getShareText(shareProduct))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ZnIcon icon={SendOutlined} /> Telegram
                </ShareOptionBtn>
              </ShareGrid>

              {/* Botón de Compartir Nativo Mobile (Foto + Texto adjunto) si está disponible */}
              {typeof navigator !== "undefined" && navigator.share && (
                <div style={{ marginBottom: 12 }}>
                  <ShareOptionBtn
                    $bg="#722ed1"
                    onClick={() => handleNativeShare(shareProduct)}
                    style={{ width: "100%" }}
                  >
                    <ZnIcon icon={ShareAltOutlined} /> Compartir Foto + Texto en Celular
                  </ShareOptionBtn>
                </div>
              )}

              {/* Botón de 1-Click para Descargar la Imagen */}
              <div style={{ marginBottom: 12 }}>
                <ShareOptionBtn
                  $bg="#eb2f96"
                  onClick={() =>
                    handleDownloadImage(
                      (shareProduct.imagenes && shareProduct.imagenes[0]) ||
                        shareProduct.imagen ||
                        NO_IMAGE_PLACEHOLDER,
                      shareProduct.titulo
                    )
                  }
                  style={{ width: "100%" }}
                >
                  <ZnIcon icon={DownloadOutlined} /> Descargar Foto del Producto (Para Postear)
                </ShareOptionBtn>
              </div>

              {/* Vista Previa del Texto y Botón de Copiar para Instagram / Historias */}
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#666", marginBottom: 4, display: "block" }}>
                Ficha lista para copiar y pegar:
              </label>
              <CopyBox>{getShareText(shareProduct)}</CopyBox>

              <ShareOptionBtn
                $bg="#fa8c16"
                onClick={() => handleCopyText(getShareText(shareProduct))}
                style={{ width: "100%" }}
              >
                <ZnIcon icon={CopyOutlined} /> Copiar Texto de Ficha
              </ShareOptionBtn>
            </ShareDialog>
          </ModalOverlay>,
          getPortalTarget()
        )}

      {/* Snackbar Toast dinámico */}
      {toastMessage &&
        createPortal(
          <SnackbarContainer>
            <ZnIcon icon={CheckCircleOutlined} />
            <span>{toastMessage}</span>
          </SnackbarContainer>,
          getPortalTarget()
        )}
    </PageContainer>
  );
};

export default PreciosPage;
