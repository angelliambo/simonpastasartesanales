/**
 * Textos para el content script (content.ts)
 * @type {object}
 */
export const content = {
  // Popup de idioma detectado
  idioma: {
    titulo: 'Leitor PDF - ZenithNexus',
    mensaje: 'Esta página está em {{idioma}}. Deseja que {{nombreSitio}} leia nesse idioma?',
    btnUnaVez: 'Só desta vez',
    btnSiempre: 'Sim, sempre para qualquer site',
    btnSitio: 'Sim, apenas este site',
    btnNunca: 'Nunca mais incomodar'
  },

  // Popup de idioma incompatible (advertencia)
  idiomaIncompatible: {
    titulo: 'Idioma não suportado',
    mensaje: 'Esta página está em {{idioma}}. ZenithNexus não suporta completamente este idioma. A experiência pode não ser ideal.',
    btnAuto: 'Ativar reconhecimento automático',
    btnConfig: 'Alterar nas configurações',
    btnIgnorar: 'Ignorar'
  },

  // Popup de idioma compatible (ofrecimiento)
  idiomaCompatible: {
    titulo: 'Idioma detectado',
    mensaje: 'Esta página está em {{idioma}}. Deseja adaptar {{nombreSitio}} para uma melhor experiência?',
    btnCambiar: 'Alterar idioma',
    btnAuto: 'Ativar reconhecimento automático',
    btnMantener: 'Manter atual'
  },

  // Confirmación de idioma
  idiomaConfirm: {
    titulo: 'Idioma detectado'
  },

  // Banner de permisos
  permisos: {
    titulo: 'Permissão do microfone',
    mensaje: '{{nombreSitio}} precisa de acesso ao microfone para ditar texto.',
    btnActivar: 'Ativar agora',
    btnActivarMicrofono: 'Ativar microfone',
    btnMasTarde: 'Mais tarde'
  },

  // Indicador STT (dictado)
  stt: {
    escuchando: 'Ditando...',
    listening: 'Ouvindo...',
    waiting: 'Aguardando...',
    dormant: 'Inativo',
    error: 'Erro de microfone'
  },

  // Indicador TTS (lectura)
  tts: {
    procesando: 'Preparando...',
    traduciendo: 'Traduzindo...',
    lectura: 'Lendo...',
    narracion: 'Narrando página...'
  },

   // Notificaciones
   notificacion: {
     lecturaDetenida: 'Leitura interrompida',
     dictamenDetenido: 'Ditado interrompido',
     errorContenido: 'Não foi possível detectar o conteúdo principal desta página.'
   },

   // Leitor PDF
   pdfReader: {
     titulo: 'Leitor PDF - ZenithNexus',
     paginaDe: 'Página {{actual}} de {{total}}',
     play: 'Reproduzir',
     stop: 'Parar',
     next: 'Próxima',
     prev: 'Anterior',
     irAPagina: 'Ir para página',
     cargando: 'Carregando...',
     precargando: 'Pré-carregando página {{pagina}}...',
     leyendo: 'Lendo página {{pagina}}...',
     pausado: 'Pausado',
     detenido: 'Parado',
     completado: 'Leitura completada',
     reanudar: 'Retomar da página {{pagina}}',
     empezarDesdeInicio: 'Começar do início',
     ultimaLeida: 'Última lida: página {{pagina}}',
     progreso: 'Progresso: {{porcentaje}}%',
     errorPagina: 'Erro ao carregar a página {{pagina}}',
      errorPDF: 'Erro ao processar o PDF',
      texto: 'Texto',
      tablaContenido: 'Índice',
      marcadores: 'Marcadores',
      velocidadLenta: 'Lenta',
      velocidadNormal: 'Normal',
      velocidadRapida: 'Rápida',
      ocultarToolbar: 'Ocultar ferramentas',
      ocultarCompletamente: 'Ocultar completamente',
      dictar: 'Ditar',
      resaltar: 'Destacar',
      configuracion: 'Config'
    },

    // Dicas para documentos
    documentTip: {
      googleDocs: '{{titulo}} · Ler com {{leer_hotkey}} · Ditar com {{microfono_hotkey}}',
      pdf: 'PDF detectado · Preparando ferramentas...'
    },

    // Toolbar - controles de narração visual
    visualControls: {
      toggleSubs: 'Ativar/desativar legendas',
      toggleHighlight: 'Ativar/desativar destaque de texto'
    },

    terminosPopup: {
      funcLectura: 'a leitura de texto',
      funcMicrofono: 'o microfone',
      funcEscritura: 'a escrita automática',
      funcNarrador: 'o narrador de páginas',
      btnAceptarContinuar: 'Aceitar e Continuar',
      cuerpoAntesFunc: 'Para usar',
      cuerpoDespuesFunc: 'você deve aceitar os termos e condições de uso do ZenithNexus.',
    },

    // Ventana Picture-in-Picture (PiP)
    pip: {
      reading: 'Lendo',
      recording: 'Ditando',
      ready: 'Pronto',
      progress: 'Progresso',
      listening: 'Ouvindo...',
      listeningPlaceholder: 'O texto ditado aparecerá aqui...',
      copy: 'Copiar',
      clear: 'Limpar',
      stopMic: 'Desativar Microfone',
      startMic: 'Ativar Microfone',
      pause: 'Pausar',
      play: 'Reproduzir',
      stop: 'Parar tudo',
      speed: 'Velocidade:',
      trial: 'Teste'
    }
};
