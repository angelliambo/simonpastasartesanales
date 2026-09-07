import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from './I18nProvider';
import { DownOutlined } from '@ant-design/icons';
import { LanguageSelectorProps } from './LanguageSelector.types';
import {
  SelectorContainer,
  TriggerButton,
  TriggerContent,
  FlagImg,
  ArrowIcon,
  DropdownMenu,
  MenuItem,
} from './LanguageSelector.styles';

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  fullWidth,
  dropUp = false,
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
        onClick={() => setIsOpen(!isOpen)}
        $fullWidth={fullWidth}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Seleccionar idioma"
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
        <DropdownMenu $dropUp={dropUp} role="listbox">
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
