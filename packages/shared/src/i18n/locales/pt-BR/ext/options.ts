/**
 * Textos para la página de configuración (options.html)
 * @type {object}
 */
export const options = {
  // Header
  headerTitulo: '{{nombreSitio}}',
  headerSlogan: 'A comunicação no auge.',

  // Loading
  cargando: 'Cargando...',
  general: 'Geral',
  reading: 'Leitura',
  dictation: 'Ditado',

  // Sección Idiomas
  sectionIdiomasTitulo: 'Configurações de idioma',
  sectionIdiomasDesc: 'Selecione o idioma de entrada (microfone e ferramentas) e o idioma de saída (voz e escrita do que você dita).',
  sectionIdiomasNote: 'Esta configuração também afeta o Modo Narrador, que narrará páginas no idioma de saída selecionado.',
  sectionIdiomasNoteIcon: 'ℹ️',

  // Sección Idiomas TTS/STT
  sectionIdiomasTTSSTT: 'Idiomas de voz e escrita',
  sectionIdiomasTTSSTTDesc: 'Defina os idiomas para síntese de fala (TTS) e reconhecimento de fala (STT).',

  // Auto-detección de idioma
  autoDetectLanguage: 'Detecção automática de idioma',
  autoDetectRecommended: 'Recomendado',
  autoDetectLanguageDesc: 'Detecta automaticamente o idioma de entrada para melhor precisão.',

  // Selectores de idioma entrada/salida
  idiomaEntrada: 'Idioma de entrada',
  idiomaSalida: 'Idioma de saída (voz e escrita)',
  idiomaEntradaHint: 'Selecione o idioma que você usará para falar no microfone',
  idiomaSalidaHint: 'Selecione o idioma em que deseja que o texto seja lido ou escrito',

  // Selector idioma UI
  idiomaInterfaz: 'Idioma da interface',
  idiomaInterfazDesc: 'Selecione o idioma dos textos de extensão.',
  idiomaInterfazHint: 'Ao alterar o idioma da interface, os idiomas de entrada (STT) e saída (TTS) também serão sincronizados automaticamente.',

  // Opciones de idioma
  idiomaEspanolLatino: 'Espanhol (latim)',
  idiomaEspanolEspana: 'Espanhol (Espanha)',
  idiomaInglesUSA: 'Inglês (EUA)',
  idiomaInglesUK: 'Inglês (Reino Unido)',
  idiomaFrances: 'Francês',
  idiomaPortugues: 'Português',
  idiomaItaliano: 'italiano',
  idiomaAleman: 'Alemão',
  idiomaJapones: 'japonês',

  // Sección Voz
  sectionVozTitulo: 'Velocidade de leitura',
  sectionVozDesc: 'Selecione a velocidade de leitura',
  sectionVozNote: 'Essa configuração também afeta o modo Narrador.',
  sectionVozNoteIcon: 'ℹ️',

  // Velocidades
  velocidadLenta: 'Lento',
  velocidadNormal: 'Normal',
  velocidadRapida: 'Rápido',

  // Sección Micrófono
  sectionMicTitulo: 'Microfone',
  sectionMicDesc: 'Ligue ou desligue o microfone para ditar texto',
  micActivo: 'Ativado',
  micInactivo: 'Desabilitado',
  micTiempoActivo: 'Tempo ativo do microfone:',
  micTiempo10seg: '10 segundos (padrão)',
  micTiempo1min: '1 minuto',
  micTiempoMantener: 'Mantenha-se ativo',
  dblClickActivo: 'Duplo clique ativado',
  dblClickInactivo: 'Duplo clique desativado',
  dblClickDesc: 'Duplo clique para ditar texto',

  // Sección Narración Visual
  sectionNarracionTitulo: 'Narração Visual',
  sectionNarracionDesc: 'Controla os elementos visuais que aparecem durante a narração de páginas.',
  subtitulosLabel: 'Legendas',
  subtitulosDesc: 'Mostra o texto narrado na parte inferior da tela.',
  subtitulosActivado: 'Ativado',
  subtitulosDesactivado: 'Desativado',
  resaltadoLabel: 'Destaque',
  resaltadoDesc: 'Resalta visualmente el texto que se está leyendo.',
  resaltadoActivado: 'Ativado',
  resaltadoDesactivado: 'Desativado',

  // Demo
  pdfSectionTitulo: 'Lector de PDF',
  pdfSectionDesc: 'Usa o ZenithNexus dentro de arquivos PDF para ler em voz alta.',

  sectionDemoTitulo: 'Demonstração e teste',
  sectionDemoDesc: 'Teste os recursos {{nombreSitio}} antes de usá-los',

  // Demo TTS
  demoTTS: 'Teste de leitura',
  demoTTSHint: 'Clique no botão para ouvir um texto de teste na velocidade selecionada.',
  demoTTSPlay: 'Jogar demonstração',
  demoTTSPlaying: 'Jogando...',

  // Demo STT
  demoSTT: 'Teste de Redação',
  demoSTTHint: 'Ative o microfone e fale para ver sua voz transcrita em texto.',
  demoSTTActivar: 'Iniciar ditado',
  demoSTTDetener: 'Pare o ditado',
  demoSTTPlaceholder: ' Ative o microfone acima para iniciar o ditado...\nO texto que você falar aparecerá aqui automaticamente.',
  demoPremiumNote: 'O ditado ilimitado é um recurso Premium. Experimente aqui e se gostar, obtenha o plano completo.',
  demoMicInactivo: 'Microfone inativo',
  demoMicEscuchando: 'Audição...',

  // Estado demos
   demoTranslating: 'Traduzindo...',
  demoComplete: 'Reprodução concluída',
  demoError: 'Erro ao jogar',
  demoNavegadorNoSoportado: 'Seu navegador não suporta',

  // Atajos
  sectionShortcutsTitulo: 'Atalhos de teclado',
  sectionShortcutsDesc: 'Use estes atalhos para controlar {{nombreSitio}} rapidamente.',
  shortcutLeer: 'Ler',
  shortcutDetener: 'Prender prisão',
  shortcutMic: 'Microfone',
  shortcutEscritura: 'Escrita automática',
  shortcutLeerDesc: 'Leia o texto selecionado em voz alta',
  shortcutDetenerDesc: 'Interromper a leitura atual',
  shortcutMicDesc: 'Ative o microfone para ditar texto',
  shortcutEscrituraDesc: 'Ativar/desativar leitura automática ao selecionar texto',
  shortcutMac: 'Para usuários de Mac',
  shortcutMacDesc: 'No Mac, a tecla Ctrl é substituída por Command (⌘).',
  shortcutMacExample: 'Exemplo: Ctrl+Shift+L → ⌘+Shift+L',

  // Guardado
  btnGuardar: 'Salvar configurações',
  statusGuardado: 'Configurações salvas com sucesso!',
  statusError: 'Erro ao salvar as configurações',

  // Seção Animações
  animationsTitulo: 'Animações e Efeitos Visuais',
  animationsDesc: 'Ative ou desative as animações e efeitos visuais da extensão. Isso inclui o fundo animado, transições e outros efeitos.',
  animationsActivadas: 'Animações ativadas',
  animationsDesactivadas: 'Animações desativadas',
  animationsPreviewOn: 'As animações estão visíveis',
  animationsPreviewOff: 'As animações estão desativadas',

  // Seção Barra de Ferramentas
  sectionToolbarTitulo: 'Barra de Ferramentas',
  sectionToolbarDesc: 'Controla a visibilidade da barra de ferramentas flutuante nas páginas da web.',
  toolbarLabel: 'Mostrar barra de ferramentas',
  toolbarDesc: 'Mostra a barra de ferramentas flutuante com controles de leitura nas páginas da web.',
  toolbarVisible: 'Visível',
  toolbarOculto: 'Oculto',

  // Doação/Inscrição
  sectionDonacionTitulo: 'Apoie o Projeto',
  sectionDonacionDesc: '{{nombreSitio}} é gratuito. Se você gostou, considere se inscrever para manter o projeto vivo!!!',
   sectionDonacionLink: 'Inscrever-se',
   footerDonacionTitle: 'Apoie o projeto',
   footerDonacionCta: 'Apoie o projeto',
   footerDonacionThanks: 'Obrigado pelo seu apoio!',

   // Footer
   footerNote: 'Mais opções em Configurações',
  footerTerminos: 'Termos e Condições',
  footerPrivacidad: 'Política de Privacidade',

  // Términos y Condiciones
  sectionTerminosTitulo: 'Termos e Condições',
  sectionTerminosDesc: 'Para usar ZenithNexus, você deve aceitar os termos e condições de uso.',
  terminosVersion: 'Versão',
  terminosEstadoAceptado: 'Aceito',
  terminosEstadoPendiente: 'Aceitação pendente',
  terminosEstadoActualizado: 'Você precisa aceitar a nova versão',
  terminosAceptar: 'Aceitar os Termos',
  terminosCheckbox: 'Eu li e aceito o',
  terminosLink: 'termos e condições de uso',
  terminosFechaAceptacion: 'Aceito em',
  terminosBtnDesbloquear: 'Desbloquear recursos',

  blocklistSectionTitulo: 'Lista de Bloqueio',
  blocklistSectionDesc: 'Gerencie os sites e idiomas onde você prefere que a extensão não atue.',
  blocklistSitesTitle: 'Sites desativados',
  blocklistSitesDesc: 'A extensão será totalmente desativada nesses sites.',
  blocklistLanguagesTitle: 'Idiomas ignorados',
  blocklistLanguagesDesc: 'O modal de detecção de idioma não será exibido para esses idiomas.',
  blocklistInputPlaceholder: 'Digite um domínio ou URL (ex: github.com)',
  blocklistAddBtn: 'Adicionar',
  blocklistNoSites: 'Nenhum site desativado.',
  blocklistNoLanguages: 'Nenhum idioma ignorado.',
  blocklistLanguageSelectPlaceholder: 'Selecione um idioma...',

  // Ajuda comandos de voz
  voiceCommandsHelpTitle: 'Guia de Comandos de Voz',
  voiceCommandsHelpDesc: 'Consulte as palavras-chave para pontuação e formatação de texto.',
  voiceCommandsSearchPlaceholder: 'Buscar comando ou símbolo (ex: vírgula, negrito)...',
  voiceCommandsNoResults: 'Nenhum comando correspondente à busca encontrado.',
};

export default {};
