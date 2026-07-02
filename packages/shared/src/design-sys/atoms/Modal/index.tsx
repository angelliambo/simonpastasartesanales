import React, { useEffect } from 'react';
import type { ModalProps } from './Modal.types';
import { Overlay, ModalContainer, CloseButton } from './Modal.styles';
import { ZnIcon } from '../ZnIcon';
import { CloseOutlined } from '@ant-design/icons';

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, $wide }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer $wide={$wide} onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <ZnIcon icon={CloseOutlined} />
        </CloseButton>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
