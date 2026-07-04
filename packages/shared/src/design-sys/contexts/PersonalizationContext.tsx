import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface AccessibilitySettings {
  highContrast: boolean;
  increasedSpacing: boolean;
  reduceMotion: boolean;
  disableAnimations: boolean;
  dyslexiaSupport: boolean;
  readingGuide: boolean;
  focusIndicator: boolean;
  keyboardNavigation: boolean;
  textToSpeech: boolean;
  colorBlindSupport: boolean;
  colorBlindType: string;
  fontSizeMultiplier: number;
  spacingMultiplier: number;
}

export interface PersonalizationContextType {
  accessibility: AccessibilitySettings;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
}

const defaultAccessibility: AccessibilitySettings = {
  highContrast: false,
  increasedSpacing: false,
  reduceMotion: false,
  disableAnimations: false,
  dyslexiaSupport: false,
  readingGuide: false,
  focusIndicator: false,
  keyboardNavigation: false,
  textToSpeech: false,
  colorBlindSupport: false,
  colorBlindType: "",
  fontSizeMultiplier: 1,
  spacingMultiplier: 1,
};

const PersonalizationContext = createContext<PersonalizationContextType>({
  accessibility: defaultAccessibility,
  updateAccessibility: () => {},
});

export const usePersonalization = () => useContext(PersonalizationContext);

interface PersonalizationProviderProps {
  children: ReactNode;
}

export const PersonalizationProvider: React.FC<PersonalizationProviderProps> = ({ children }) => {
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(defaultAccessibility);

  const updateAccessibility = useCallback(
    (settings: Partial<AccessibilitySettings>) => {
      setAccessibility((prev) => ({ ...prev, ...settings }));
    },
    []
  );

  return (
    <PersonalizationContext.Provider value={{ accessibility, updateAccessibility }}>
      {children}
    </PersonalizationContext.Provider>
  );
};
