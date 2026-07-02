import React, { useState, useEffect } from 'react';
import { getVoiceCommandsByCategory, HelpCategory, HelpCommandItem } from '@shared/config/voice-commands';
import { useTranslation } from '../../i18n/I18nProvider';
import { AnimatedBackground } from '../../components/AnimatedBackground';
import { ZnIcon } from '@design-sys/atoms/ZnIcon';
import {
  SearchOutlined,
  AudioOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  BorderOutlined,
  PlusOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import {
  PageContainer,
  HeaderSection,
  Title,
  Subtitle,
  ControlsContainer,
  SearchWrapper,
  SearchInput,
  LanguageSelectWrapper,
  Label,
  StyledSelect,
  CategoriesWrapper,
  CategoryBlock,
  CategoryTitle,
  CommandsGrid,
  CommandCard,
  PhraseLabel,
  SpokenPhrase,
  ResultLabel,
  ActionOutput,
  NoResults
} from './VoiceCommandsPage.styles';

const LANGUAGE_LABELS: Record<string, string> = {
  es: 'Español (es)',
  en: 'English (en)',
  fr: 'Français (fr)',
  pt: 'Português (pt)',
  it: 'Italiano (it)',
  de: 'Deutsch (de)',
  ja: '日本語 (ja)'
};

const VoiceCommandsPage: React.FC = () => {
  const { t, lang } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Inicializar el idioma de los comandos de voz con el idioma del portal (o por defecto es)
  const [selectedLang, setSelectedLang] = useState('es');

  useEffect(() => {
    if (lang) {
      const code = lang.split('-')[0].toLowerCase();
      if (['es', 'en', 'fr', 'pt', 'it', 'de', 'ja'].includes(code)) {
        setSelectedLang(code);
      }
    }
  }, [lang]);

  // Obtener categorías estructuradas
  const categories = getVoiceCommandsByCategory(selectedLang);

  // Mapear categoría ID a su icono correspondiente
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'basic':
        return BookOutlined;
      case 'punctuation':
        return QuestionCircleOutlined;
      case 'editing':
        return EditOutlined;
      case 'symbols':
        return BorderOutlined;
      case 'math':
        return PlusOutlined;
      case 'web':
        return GlobalOutlined;
      default:
        return AudioOutlined;
    }
  };

  // Filtrar en tiempo real
  const queryNormalized = searchQuery.toLowerCase().trim();
  
  const filteredCategories = categories.map(cat => {
    const matchedItems = cat.items.filter(item => 
      item.phrase.toLowerCase().includes(queryNormalized) || 
      item.result.toLowerCase().includes(queryNormalized)
    );
    return { ...cat, items: matchedItems };
  }).filter(cat => cat.items.length > 0);

  const hasResults = filteredCategories.length > 0;

  return (
    <>
      <AnimatedBackground />
      <PageContainer>
        <HeaderSection>
          <Title>{t('pages.commands.title') || 'Comandos de Voz ZenithNexus'}</Title>
          <Subtitle>
            {t('pages.commands.subtitle') || 'Descubrí cómo dictar de manera fluida utilizando comandos de voz automáticos para signos de puntuación, símbolos y estilos de formato enriquecido sin usar las manos.'}
          </Subtitle>
        </HeaderSection>

        <ControlsContainer>
          <SearchWrapper>
            <div style={{ position: 'absolute', left: '16px', display: 'flex', alignItems: 'center' }}>
              <ZnIcon icon={SearchOutlined} color="text.secondary" />
            </div>
            <SearchInput
              type="text"
              placeholder={t('pages.commands.searchPlaceholder') || 'Escribí un símbolo, signo o comando para buscar (ej: coma, negrita, párrafo)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>

          <LanguageSelectWrapper>
            <Label>{t('pages.commands.selectLanguage') || 'Idioma de comandos:'}</Label>
            <StyledSelect
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
            >
              {Object.entries(LANGUAGE_LABELS).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </StyledSelect>
          </LanguageSelectWrapper>
        </ControlsContainer>

        {hasResults ? (
          <CategoriesWrapper>
            {filteredCategories.map((category: HelpCategory) => {
              const catName = category.name[selectedLang] || category.name['en'] || category.id;
              
              return (
                <CategoryBlock key={category.id}>
                  <CategoryTitle>
                    <ZnIcon icon={getCategoryIcon(category.id)} color="primary.400" />
                    {catName}
                  </CategoryTitle>
                  <CommandsGrid>
                    {category.items.map((item: HelpCommandItem, idx: number) => (
                      <CommandCard key={`${item.phrase}-${idx}`}>
                        <div>
                          <PhraseLabel>{t('pages.commands.phraseLabel') || 'Lo que decís:'}</PhraseLabel>
                          <SpokenPhrase>"{item.phrase}"</SpokenPhrase>
                        </div>
                        <div>
                          <ResultLabel>
                            {item.isFormat 
                              ? (t('pages.commands.formatLabel') || 'Acción de Formato:') 
                              : (t('pages.commands.resultLabel') || 'Resultado escrito:')}
                          </ResultLabel>
                          <ActionOutput>{item.result}</ActionOutput>
                        </div>
                      </CommandCard>
                    ))}
                  </CommandsGrid>
                </CategoryBlock>
              );
            })}
          </CategoriesWrapper>
        ) : (
          <NoResults>
            {t('pages.commands.noResults') || 'No se encontraron comandos que coincidan con tu búsqueda. Intentá con otro término.'}
          </NoResults>
        )}
      </PageContainer>
    </>
  );
};

export default VoiceCommandsPage;
