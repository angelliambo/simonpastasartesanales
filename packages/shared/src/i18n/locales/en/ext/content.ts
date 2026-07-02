/**
 * Textos para el content script (popups e indicadores dinámicos)
 * @type {object}
 */
export const content = {
  // Popup de idioma detectado
  idioma: {
    titulo: 'PDF Reader - ZenithNexus',
    mensaje: 'This page is in {{idioma}}. Do you want {{nombreSitio}} to read in that language?',
    btnUnaVez: 'Just this once',
    btnSiempre: 'Yes, always for any site',
    btnSitio: 'Yes, only this site',
    btnNunca: 'Never bother again'
  },

  // Popup de idioma incompatible (advertencia)
  idiomaIncompatible: {
    titulo: 'Unsupported language',
    mensaje: 'This page is in {{idioma}}. ZenithNexus does not fully support this language. The experience may not be optimal.',
    btnAuto: 'Enable auto-recognition',
    btnConfig: 'Change in settings',
    btnIgnorar: 'Ignore'
  },

  // Premium feature lock
  featureLocked: 'Premium feature',
  upgradeMessage: 'This feature requires a premium plan.',

  // Popup de idioma compatible (ofrecimiento)
  idiomaCompatible: {
    titulo: 'Language detected',
    mensaje: 'This page is in {{idioma}}. Do you want to adapt {{nombreSitio}} for better experience?',
    btnCambiar: 'Change language',
    btnAuto: 'Enable auto-recognition',
    btnMantener: 'Keep current'
  },

  // Confirmación de idioma
  idiomaConfirm: {
    titulo: 'Language detected'
  },

  // Banner de permisos
  permisos: {
    titulo: 'Microphone permission',
    mensaje: '{{nombreSitio}} needs microphone access to dictate text.',
    btnActivar: 'Activate now',
    btnActivarMicrofono: 'Activate Microphone',
    btnMasTarde: 'Later'
  },

  // Indicador STT (dictado)
  stt: {
    escuchando: 'Dictating...',
    listening: 'Listening...',
    waiting: 'Waiting...',
    dormant: 'Dormant',
    error: 'Microphone error'
  },

  // Indicador TTS (lectura)
  tts: {
    procesando: 'Preparing...',
    traduciendo: 'Translating...',
    lectura: 'Reading...',
    narracion: 'Narrating page...'
  },

   // Notificaciones
   notificacion: {
     lecturaDetenida: 'Reading stopped',
     dictamenDetenido: 'Dictation stopped',
     errorContenido: 'The main content of this page could not be detected.'
   },

   // PDF Reader
   pdfReader: {
     titulo: 'PDF Reader - ZenithNexus',
     paginaDe: 'Page {{actual}} of {{total}}',
     play: 'Play',
     stop: 'Stop',
     next: 'Next',
     prev: 'Previous',
     irAPagina: 'Go to page',
     cargando: 'Loading...',
     precargando: 'Preloading page {{pagina}}...',
     leyendo: 'Reading page {{pagina}}...',
     pausado: 'Paused',
     detenido: 'Stopped',
     completado: 'Reading completed',
     reanudar: 'Resume from page {{pagina}}',
     empezarDesdeInicio: 'Start from beginning',
     ultimaLeida: 'Last read: page {{pagina}}',
     progreso: 'Progress: {{porcentaje}}%',
     errorPagina: 'Error loading page {{pagina}}',
     errorPDF: 'Error processing PDF',
     texto: 'Text',
     tablaContenido: 'Table of Contents',
     marcadores: 'Bookmarks',
     oraciones: 'sentences',
     velocidad: 'Speed',
     agregar: 'Add',
     noMarcadores: 'No bookmarks yet',
     pagina: 'Page',
     eliminarMarcador: 'Delete bookmark',
     velocidadLenta: 'Slow',
     velocidadNormal: 'Normal',
     velocidadRapida: 'Fast',
     ocultarToolbar: 'Hide tools',
     ocultarCompletamente: 'Hide completely',
     dictar: 'Dictate',
     resaltar: 'Highlight',
     configuracion: 'Config'
   },

    // Document tips
    documentTip: {
      googleDocs: '{{titulo}} · Read with {{leer_hotkey}} · Dictate with {{microfono_hotkey}}',
      pdf: 'PDF detected · Preparing tools...'
    },

    // Toolbar - visual narration controls
    visualControls: {
      toggleSubs: 'Enable/disable subtitles',
      toggleHighlight: 'Enable/disable text highlighting'
    },

    terminosPopup: {
      funcLectura: 'read aloud',
      funcMicrofono: 'the microphone',
      funcEscritura: 'automatic writing',
      funcNarrador: 'page narrator',
      btnAceptarContinuar: 'Accept and Continue',
      cuerpoAntesFunc: 'To use',
      cuerpoDespuesFunc: 'you must accept the terms and conditions of use of ZenithNexus.',
    },

    // Ventana Picture-in-Picture (PiP)
    pip: {
      reading: 'Reading',
      recording: 'Dictating',
      ready: 'Ready',
      progress: 'Progress',
      listening: 'Listening...',
      listeningPlaceholder: 'Dictated text will appear here...',
      copy: 'Copy',
      clear: 'Clear',
      stopMic: 'Disable Microphone',
      startMic: 'Enable Microphone',
      pause: 'Pause',
      play: 'Play',
      stop: 'Stop all',
      speed: 'Speed:',
      trial: 'Trial'
    }
};

export default {};
