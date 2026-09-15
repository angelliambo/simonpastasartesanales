import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const AdminContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  min-height: 80vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.8rem;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SecondaryBtnLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }
`;



export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const RequiredAsterisk = styled.span`
  color: ${({ theme }) => theme.colors.error[500]};
  margin-left: 4px;
  font-weight: bold;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.primary[600]};
  color: ${({ theme }) => theme.colors.text.inverse};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[700]};
  }
`;

export const SaveAllBtn = styled(PrimaryBtn)`
  background-color: ${({ theme }) => theme.colors.success[600]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.success[700]};
  }
`;

export const CancelBtn = styled.button`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

export const DangerBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.error[600]};
  color: ${({ theme }) => theme.colors.text.inverse};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error[700]};
  }
`;

export const IconBtn = styled.button<{ $danger?: boolean }>`
  background: transparent;
  border: none;
  color: ${({ $danger, theme }) => ($danger ? theme.colors.error[500] : theme.colors.text.secondary)};
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ $danger, theme }) => ($danger ? theme.colors.error[50] : theme.colors.background.secondary)};
    color: ${({ $danger, theme }) => ($danger ? theme.colors.error[600] : theme.colors.primary[600])};
  }
`;

export const SearchCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 220px;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const CategorySelect = styled.select`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  outline: none;
  cursor: pointer;
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  box-shadow: ${({ theme }) => theme.shadows.light};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

export const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const getTrBgColor = (props: { $isDeleting?: boolean; $isEditing?: boolean; $isModified?: boolean; theme: any }) => {
  if (props.$isDeleting) return props.theme.colors.error[50];
  if (props.$isEditing || props.$isModified) return props.theme.colors.primary[50];
  return "transparent";
};

const getTrHoverBgColor = (props: { $isDeleting?: boolean; $isEditing?: boolean; $isModified?: boolean; theme: any }) => {
  if (props.$isDeleting) return props.theme.colors.error[500];
  if (props.$isEditing || props.$isModified) return props.theme.colors.primary[100];
  return props.theme.colors.background.secondary;
};

export const Tr = styled.tr<{ $isDeleting?: boolean; $isEditing?: boolean; $isModified?: boolean }>`
  transition: background-color 0.2s ease;
  background-color: ${getTrBgColor};

  &:hover {
    background-color: ${getTrHoverBgColor};
  }
`;

export const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  vertical-align: middle;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const ProductThumb = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

export const InlineInput = styled.input`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const PriceInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PriceInput = styled.input`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  width: 100px;
  text-align: right;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

export const ItemBadge = styled.span`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.primary[50]};
  color: ${({ theme }) => theme.colors.primary[700]};
  margin-right: 6px;
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  color: ${({ theme }) => theme.colors.primary[800]};
  margin-right: 4px;
  margin-bottom: 4px;
`;

export const CategoryRemoveTagBtn = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.error[500]};
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  line-height: 1;
  padding: 0 2px;
  margin-left: 4px;
  &:hover {
    color: ${({ theme }) => theme.colors.error[700]};
  }
`;

export const VarietyTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 2px;
`;

export const TagRemoveBtn = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.error[500]};
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  line-height: 1;
  padding: 0 2px;
  &:hover {
    color: ${({ theme }) => theme.colors.error[700]};
  }
`;

export const ActionsCellContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
`;

export const ModalCloseIconButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 6px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  min-height: 80px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const CategoryTag = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background-color: ${({ theme }) => theme.colors.primary[50]};
  color: ${({ theme }) => theme.colors.primary[700]};
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  padding: ${({ theme }) => theme.spacing.md};
  backdrop-filter: blur(4px);
`;

export const PinModal = styled.div`
  max-width: 420px;
  margin: 40px auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
    margin: 20px 10px;
  }
`;

export const PinInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1.1rem;
  text-align: center;
  outline: none;
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const ModalBody = styled.div`
  padding: 20px 0;
  overflow-y: auto;
  flex: 1;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.card};
  position: sticky;
  bottom: 0;
  z-index: 10;
`;

export const FormModalDialog = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 700px;
  width: 100%;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const ThumbImage = styled.img`
  width: 54px;
  height: 54px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

export const ModalDialog = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 650px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.normal};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ModalTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  ${({ $fullWidth }) => $fullWidth && `grid-column: 1 / -1;`}
`;

export const FormLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 6px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  min-height: 80px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const SectionSubTitle = styled.h4`
  font-size: 0.95rem;
  margin: ${({ theme }) => `${theme.spacing.md} 0 ${theme.spacing.xs} 0`};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const PresentationRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
`;

export const ImageGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const ImagePreviewCard = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageDeletingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: 1.2rem;
`;

export const ImageDeleteBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: ${({ theme }) => theme.colors.error[500]};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.75rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.15);
    background-color: ${({ theme }) => theme.colors.error[600]};
  }
`;

export const ConfirmDialog = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 480px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  text-align: center;
`;

export const DeleteProductCardPreview = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
  text-align: left;
`;

export const SnackbarContainer = styled.div<{ $error?: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999999;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: 24px;
  background-color: ${({ $error, theme }) => ($error ? theme.colors.error[600] : theme.colors.success[600])};
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

export const SnackbarCloseBtn = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.inverse};
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  padding: 2px;
  opacity: 0.85;
  margin-left: 4px;

  &:hover {
    opacity: 1;
  }
`;
