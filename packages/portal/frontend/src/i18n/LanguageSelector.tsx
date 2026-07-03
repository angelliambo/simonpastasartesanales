import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from './I18nProvider';
import { DownOutlined } from '@ant-design/icons';
import { ZnIcon } from '@design-sys/atoms/ZnIcon';

const SelectorContainer = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  font-family: ${({ theme }) => theme.typography?.fontFamily?.primary || 'sans-serif'};
`;

const TriggerButton = styled.button<{ $fullWidth?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  min-width: 180px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.effects.glassBackground};
  backdrop-filter: blur(${({ theme }) => theme.effects.blur.subtle || '4px'});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.effects.blur.subtle || '4px'});
  border: 1px solid ${({ theme }) => theme.effects.glassBorder};
  border-radius: ${({ theme }) => theme.borderRadius?.md || '6px'};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
    border-color: ${({ theme }) => theme.colors.border.normal};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.highlight.glow};
  }
`;

const TriggerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FlagImg = styled.img`
  width: 20px;
  height: 14px;
  border-radius: 2px;
  object-fit: cover;
  display: block;
  box-shadow: ${({ theme }) => theme.shadows?.light || '0 1px 3px rgba(0,0,0,0.2)'};
`;

const ArrowIcon = styled(ZnIcon)`
  font-size: 10px;
  opacity: 0.6;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 200px;
  background: ${({ theme }) => theme.colors.background.card};
  backdrop-filter: blur(${({ theme }) => theme.effects.blur.glass || '12px'});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.effects.blur.glass || '12px'});
  border: 1px solid ${({ theme }) => theme.effects.glassBorder};
  border-radius: ${({ theme }) => theme.borderRadius?.md || '6px'};
  box-shadow: ${({ theme }) => theme.effects.glassShadow};
  padding: 6px;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 124px;
  overflow-y: auto;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.light};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.border.normal};
  }
`;

const MenuItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 12px;
  background: ${({ theme, $active }) => ($active ? `${theme.colors.primary[500]}26` : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary[500] : theme.colors.text.secondary)};
  border-radius: ${({ theme }) => theme.borderRadius?.sm || '4px'};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  box-sizing: border-box;

  &:hover {
    background: ${({ theme, $active }) => ($active ? `${theme.colors.primary[500]}33` : theme.colors.background.secondary)};
    color: ${({ theme, $active }) => ($active ? theme.colors.primary[500] : theme.colors.text.primary)};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: -2px;
  }
`;

interface LanguageSelectorProps {
  fullWidth?: boolean;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  fullWidth,
  className,
}) => {
  const { lang, setLanguage, languages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getCountryCode = (locale: string): string => {
    const parts = locale.split('-');
    const langCode = parts[0].toLowerCase();
    const country = parts[1] || parts[0];
    if (langCode === 'en') return 'us';
    return country.toLowerCase();
  };

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, code: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect(code);
    }
  };

  return (
    <SelectorContainer ref={containerRef} $fullWidth={fullWidth} className={className}>
      <TriggerButton
        $fullWidth={fullWidth}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <TriggerContent>
          <FlagImg
            src={`https://flagcdn.com/w20/${getCountryCode(currentLangObj.code)}.png`}
            srcSet={`https://flagcdn.com/w40/${getCountryCode(currentLangObj.code)}.png 2x`}
            alt={currentLangObj.name}
          />
          <span>{currentLangObj.name}</span>
        </TriggerContent>
        <ArrowIcon icon={DownOutlined} />
      </TriggerButton>

      {isOpen && (
        <DropdownMenu role="listbox">
          {languages.map((l) => {
            const isActive = l.code === lang;
            return (
              <MenuItem
                key={l.code}
                $active={isActive}
                onClick={() => handleSelect(l.code)}
                role="option"
                aria-selected={isActive}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, l.code)}
              >
                <FlagImg
                  src={`https://flagcdn.com/w20/${getCountryCode(l.code)}.png`}
                  srcSet={`https://flagcdn.com/w40/${getCountryCode(l.code)}.png 2x`}
                  alt={l.name}
                />
                <span>{l.name}</span>
              </MenuItem>
            );
          })}
        </DropdownMenu>
      )}
    </SelectorContainer>
  );
};

export default LanguageSelector;
