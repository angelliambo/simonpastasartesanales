import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 80vh;
`;

export const HeroSection = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.gradients.glass};
  background-color: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.8rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

export const AdminBadgeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.primary[50]};
  color: ${({ theme }) => theme.colors.primary[700]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.primary[300]};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[100]};
  }
`;

export const ControlsBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const TopSearchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SearchInput = styled.input`
  flex: 1;
  max-width: 450px;
  min-width: 240px;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.card};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 30px;
  font-size: 0.95rem;
  outline: none;
  box-shadow: ${({ theme }) => theme.shadows.light};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: ${({ theme }) => theme.effects.glow.primary};
  }
`;

export const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const SelectSort = styled.select`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.card};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const ViewToggleGroup = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: 4px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
`;

export const ViewToggleButton = styled.button<{ $active?: boolean }>`
  background-color: ${({ $active, theme }) => ($active ? theme.colors.primary[500] : "transparent")};
  color: ${({ $active, theme }) => ($active ? theme.colors.text.inverse : theme.colors.text.secondary)};
  border: none;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ $active, theme }) => ($active ? theme.colors.text.inverse : theme.colors.text.primary)};
  }
`;

export const CategoryPillsBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
  padding-bottom: 6px;
  scrollbar-width: thin;
`;

export const CategoryPill = styled.button<{ $active?: boolean }>`
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary[500] : theme.colors.background.card};
  color: ${({ $active, theme }) => ($active ? theme.colors.text.inverse : theme.colors.text.primary)};
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary[500] : theme.colors.border.normal)};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  box-shadow: ${({ $active, theme }) => ($active ? theme.shadows.light : "none")};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    color: ${({ $active, theme }) => ($active ? theme.colors.text.inverse : theme.colors.primary[600])};
  }
`;

export const CategoryGroupSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const CategoryGroupHeader = styled.h2`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  padding-bottom: 8px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary[500]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ProductCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.light};
  transition: transform ${({ theme }) => theme.transitions.normal}, box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

export const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  height: 380px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};
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

export const SkeletonBox = styled.div<{ $h: string; $w?: string; $radius?: string }>`
  height: ${({ $h }) => $h};
  width: ${({ $w }) => $w || "100%"};
  border-radius: ${({ $radius }) => $radius || "8px"};
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  overflow: hidden;
  border-top-left-radius: ${({ theme }) => theme.borderRadius.lg};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const ProductImage = styled.img`
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

export const GalleryThumbBar = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.normal};
`;

export const GalleryThumbBtn = styled.button<{ $active?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid ${({ $active, theme }) => ($active ? theme.colors.primary[500] : "transparent")};
  cursor: pointer;
  padding: 0;
  background: transparent;
  opacity: ${({ $active }) => ($active ? 1 : 0.65)};
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

export const ZoomIconButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.65);
  color: ${({ theme }) => theme.colors.text.inverse};
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
    background-color: ${({ theme }) => theme.colors.primary[500]};
    transform: scale(1.1);
  }
`;

export const ShareIconButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.65);
  color: ${({ theme }) => theme.colors.text.inverse};
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
    background-color: ${({ theme }) => theme.colors.info[500]};
    transform: scale(1.1);
  }
`;

export const ListShareBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.info[500]};
    color: ${({ theme }) => theme.colors.text.inverse};
    border-color: ${({ theme }) => theme.colors.info[500]};
  }
`;

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const CategoryTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
`;

export const CategoryTag = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary[50]};
  color: ${({ theme }) => theme.colors.primary[800]};
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
`;

export const ProductTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 6px 0;
`;

export const ProductDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.4;
`;

export const VarietiesContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const VarietiesTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 4px;
`;

export const VarietyBadge = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 12px;
  margin: 2px;
`;

export const PresentationsList = styled.div`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border.normal};
  padding-top: ${({ theme }) => theme.spacing.sm};
`;

export const PresentationRowItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border.normal};

  &:last-child {
    border-bottom: none;
  }
`;

export const PresentationName = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PresentationPrice = styled.span`
  font-size: 1.05rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

export const ActionRowGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: 14px;
`;

export const WhatsAppBtn = styled.a`
  background-color: ${({ theme }) => theme.colors.success[500]};
  color: ${({ theme }) => theme.colors.text.inverse};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
  transition: background-color 0.2s, transform 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.success[600]};
    transform: translateY(-1px);
  }
`;

export const ListViewContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ListTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 750px;
`;

export const ListTh = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const ListTr = styled.tr`
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export const ListTd = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  vertical-align: middle;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => `${theme.spacing.lg} 0`};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: 16px;
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 18px;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary[500] : theme.colors.border.normal)};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary[500] : theme.colors.background.card};
  color: ${({ $active, theme }) => ($active ? theme.colors.text.inverse : theme.colors.text.primary)};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    color: ${({ $active, theme }) => ($active ? theme.colors.text.inverse : theme.colors.primary[600])};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const PageSizeSelect = styled.select`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.card};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.85rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
`;

export const EmptyStateContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.background.card};
  border-radius: 16px;
  border: 1px dashed ${({ theme }) => theme.colors.border.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ModalOverlay = styled.div`
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
  padding: ${({ theme }) => theme.spacing.md};
  backdrop-filter: blur(6px);
`;

export const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.heavy};
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalTitleText = styled.h3`
  color: ${({ theme }) => theme.colors.text.inverse};
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: 1.2rem;
  text-align: center;
`;

export const ShareDialog = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 520px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  position: relative;
`;

export const ShareHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ShareTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ShareCardPreview = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ShareCardThumb = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
`;

export const ShareCardInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ShareGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 10px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ShareOptionBtn = styled.a<{ $bg: string; $color?: string }>`
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color, theme }) => $color || theme.colors.text.inverse};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 24px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  border: none;
  transition: transform 0.15s ease, opacity 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
    color: ${({ $color, theme }) => $color || theme.colors.text.inverse};
  }
`;

export const CopyBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: 8px;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: pre-wrap;
  max-height: 90px;
  overflow-y: auto;
  margin-bottom: 12px;
`;

export const LegalDisclaimerCard = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.light};
`;

export const LegalDisclaimerTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const LegalDisclaimerText = styled.p`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

export const LegalLink = styled.a`
  color: ${({ theme }) => theme.colors.primary[500]};
  text-decoration: underline;
  margin-left: 4px;
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.colors.primary[700]};
  }
`;

export const SnackbarContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999999;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.success[600]};
  color: ${({ theme }) => theme.colors.text.inverse};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  font-weight: 600;
  font-size: 0.875rem;
  animation: ${fadeIn} 0.25s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    bottom: 16px;
    right: 16px;
    left: 16px;
    justify-content: space-between;
  }
`;
