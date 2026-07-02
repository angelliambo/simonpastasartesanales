/**
 * Textos para el content script (content.ts)
 * @type {object}
 */
export const content = {
  // Popup de idioma detectado
  idioma: {
    titulo: '{{nombreSitio}}',
    mensaje: 'Questa pagina è in {{idioma}}. Vuoi che {{nombreSitio}} legga in quella lingua?',
    btnUnaVez: 'Solo questa volta',
    btnSiempre: 'Sì, sempre per qualsiasi sito',
    btnSitio: 'Sì, solo questo sito',
    btnNunca: 'Non disturbare più'
  },

  // Popup de idioma incompatible (advertencia)
  idiomaIncompatible: {
    titulo: 'Lingua non supportata',
    mensaje: 'Questa pagina è in {{idioma}}. ZenithNexus non supporta completamente questa lingua. L\'esperienza potrebbe non essere ottimale.',
    btnAuto: 'Attiva riconoscimento automatico',
    btnConfig: 'Modifica nelle impostazioni',
    btnIgnorar: 'Ignora'
  },

  // Popup de idioma compatible (ofrecimiento)
  idiomaCompatible: {
    titulo: 'Lingua rilevata',
    mensaje: 'Questa pagina è in {{idioma}}. Vuoi adattare {{nombreSitio}} per una migliore esperienza?',
    btnCambiar: 'Cambia lingua',
    btnAuto: 'Attiva riconoscimento automatico',
    btnMantener: 'Mantieni attuale'
  },

  // Confirmación de idioma
  idiomaConfirm: {
    titulo: 'Lingua rilevata'
  },

  // Banner de permisos
  permisos: {
    titulo: 'Autorizzazione microfono',
    mensaje: '{{nombreSitio}} necessita accesso al microfono per dettare testo.',
    btnActivar: 'Attiva ora',
    btnActivarMicrofono: 'Attiva microfono',
    btnMasTarde: 'Più tardi'
  },

  // Indicador STT (dictado)
  stt: {
    escuchando: 'Dettatura...',
    listening: 'Ascolto...',
    waiting: 'In attesa...',
    dormant: 'Inattivo',
    error: 'Errore microfono'
  },

  // Indicador TTS (lectura)
  tts: {
    procesando: 'Preparazione...',
    traduciendo: 'Traduzione...',
    lectura: 'Lettura...',
    narracion: 'Narrando la pagina...'
  },

   // Notificaciones
   notificacion: {
     lecturaDetenida: 'Lettura interrotta',
     dictamenDetenido: 'Dittatura interrotta',
     errorContenido: 'Non è stato possibile rilevare il contenuto principale di questa pagina.'
   },

   // Lettore PDF
   pdfReader: {
     titulo: 'Lettore PDF - ZenithNexus',
     paginaDe: 'Pagina {{actual}} di {{total}}',
     play: 'Riproduci',
     stop: 'Ferma',
     next: 'Successiva',
     prev: 'Precedente',
     irAPagina: 'Vai a pagina',
     cargando: 'Caricamento...',
     precargando: 'Precaricamento pagina {{pagina}}...',
     leyendo: 'Lettura pagina {{pagina}}...',
     pausado: 'In pausa',
     detenido: 'Fermato',
     completado: 'Lettura completata',
     reanudar: 'Riprendi dalla pagina {{pagina}}',
     empezarDesdeInicio: 'Inizia dall\'inizio',
     ultimaLeida: 'Ultima letta: pagina {{pagina}}',
     progreso: 'Progresso: {{porcentaje}}%',
     errorPagina: 'Errore nel caricamento della pagina {{pagina}}',
      errorPDF: 'Errore nell\'elaborazione del PDF',
      texto: 'Testo',
      tablaContenido: 'Indice',
      marcadores: 'Segnalibri',
      velocidadLenta: 'Lenta',
      velocidadNormal: 'Normale',
      velocidadRapida: 'Veloce',
      ocultarToolbar: 'Nascondi strumenti',
      ocultarCompletamente: 'Nascondi completamente',
      dictar: 'Dettare',
      resaltar: 'Evidenziare',
      configuracion: 'Config'
    },

    // Suggerimenti per documenti
    documentTip: {
      googleDocs: '{{titulo}} · Leggi con {{leer_hotkey}} · Detta con {{microfono_hotkey}}',
      pdf: 'PDF rilevato · Preparazione degli strumenti...'
    },

    // Toolbar - controlli di narrazione visiva
    visualControls: {
      toggleSubs: 'Attiva/disattiva sottotitoli',
      toggleHighlight: 'Attiva/disattiva evidenziazione testo'
    },

    terminosPopup: {
      funcLectura: 'la lettura ad alta voce',
      funcMicrofono: 'il microfono',
      funcEscritura: 'la scrittura automatica',
      funcNarrador: 'il narratore di pagine',
      btnAceptarContinuar: 'Accetta e Continua',
      cuerpoAntesFunc: 'Per utilizzare',
      cuerpoDespuesFunc: 'devi accettare i termini e le condizioni d\'uso di ZenithNexus.',
    },

    // Ventana Picture-in-Picture (PiP)
    pip: {
      reading: 'Lettura',
      recording: 'Dettatura',
      ready: 'Pronto',
      progress: 'Progresso',
      listening: 'Ascolto...',
      listeningPlaceholder: 'Il testo dettato apparirà qui...',
      copy: 'Copia',
      clear: 'Cancella',
      stopMic: 'Disattiva Microfono',
      startMic: 'Attiva Microfono',
      pause: 'Pausa',
      play: 'Riproduci',
      stop: 'Ferma tutto',
      speed: 'Velocità:',
      trial: 'Prova'
    }
};
