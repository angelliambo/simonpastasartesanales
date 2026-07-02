/**
 * Textos para el content script (content.ts)
 * @type {object}
 */
export const content = {
  // Popup de idioma detectado
  idioma: {
    titulo: '{{nombreSitio}}',
    mensaje: 'Diese Seite ist auf {{idioma}}. Möchten Sie, dass {{nombreSitio}} in dieser Sprache liest?',
    btnUnaVez: 'Nur dieses Mal',
    btnSiempre: 'Ja, immer für jede Seite',
    btnSitio: 'Ja, nur diese Seite',
    btnNunca: 'Nie wieder stören'
  },

  // Popup de idioma incompatible (advertencia)
  idiomaIncompatible: {
    titulo: 'Nicht unterstützte Sprache',
    mensaje: 'Diese Seite ist auf {{idioma}}. ZenithNexus unterstützt diese Sprache nicht vollständig. Die Erfahrung könnte nicht optimal sein.',
    btnAuto: 'Automatische Erkennung aktivieren',
    btnConfig: 'In Einstellungen ändern',
    btnIgnorar: 'Ignorieren'
  },

  // Premium feature lock
  featureLocked: 'Premium-Funktion',
  upgradeMessage: 'Diese Funktion erfordert einen Premium-Plan.',

  // Popup de idioma compatible (ofrecimiento)
  idiomaCompatible: {
    titulo: 'Sprache erkannt',
    mensaje: 'Diese Seite ist auf {{idioma}}. Möchten Sie {{nombreSitio}} für eine bessere Erfahrung anpassen?',
    btnCambiar: 'Sprache ändern',
    btnAuto: 'Automatische Erkennung aktivieren',
    btnMantener: 'Aktuell behalten'
  },

  // Confirmación de idioma
  idiomaConfirm: {
    titulo: 'Sprache erkannt'
  },

  // Banner de permisos
  permisos: {
    titulo: 'Mikrofon-Berechtigung',
    mensaje: '{{nombreSitio}} benötigt Mikrofonzugriff zum Diktieren von Text.',
    btnActivar: 'Jetzt aktivieren',
    btnActivarMicrofono: 'Mikrofon aktivieren',
    btnMasTarde: 'Später'
  },

  // Indicador STT (dictado)
  stt: {
    escuchando: 'Diktieren...',
    listening: 'Hört zu...',
    waiting: 'Warten...',
    dormant: 'Inaktiv',
    error: 'Mikrofonfehler'
  },

  // Indicador TTS (lectura)
  tts: {
    procesando: 'Vorbereiten...',
    traduciendo: 'Übersetzen...',
    lectura: 'Lesen...',
    narracion: 'Seite wird vorgelesen...'
  },

   // Notificaciones
   notificacion: {
     lecturaDetenida: 'Lesen gestoppt',
     dictamenDetenido: 'Diktat gestoppt',
     errorContenido: 'Der Hauptinhalt dieser Seite konnte nicht erkannt werden.'
   },

   // PDF-Reader
   pdfReader: {
     titulo: 'PDF-Reader - ZenithNexus',
     paginaDe: 'Seite {{actual}} von {{total}}',
     play: 'Wiedergeben',
     stop: 'Stoppen',
     next: 'Weiter',
     prev: 'Zurück',
     irAPagina: 'Gehe zu Seite',
     cargando: 'Laden...',
     precargando: 'Vorladen Seite {{pagina}}...',
     leyendo: 'Lese Seite {{pagina}}...',
     pausado: 'Pausiert',
     detenido: 'Gestoppt',
     completado: 'Lesen abgeschlossen',
     reanudar: 'Fortsetzen ab Seite {{pagina}}',
     empezarDesdeInicio: 'Von vorne beginnen',
     ultimaLeida: 'Zuletzt gelesen: Seite {{pagina}}',
     progreso: 'Fortschritt: {{porcentaje}}%',
     errorPagina: 'Fehler beim Laden der Seite {{pagina}}',
     errorPDF: 'Fehler bei der PDF-Verarbeitung',
     texto: 'Text',
     tablaContenido: 'Inhaltsverzeichnis',
     marcadores: 'Lesezeichen',
     oraciones: 'Sätze',
     velocidad: 'Geschwindigkeit',
     agregar: 'Hinzufügen',
     noMarcadores: 'Noch keine Lesezeichen',
     pagina: 'Seite',
     eliminarMarcador: 'Lesezeichen löschen',
     velocidadLenta: 'Langsam',
     velocidadNormal: 'Normal',
     velocidadRapida: 'Schnell',
     ocultarToolbar: 'Werkzeuge ausblenden',
     ocultarCompletamente: 'Vollständig ausblenden',
     dictar: 'Diktieren',
     resaltar: 'Hervorheben',
     configuracion: 'Konfig'
   },

    // Dokumenten-Tipps
    documentTip: {
      googleDocs: '{{titulo}} · Lesen mit {{leer_hotkey}} · Diktieren mit {{microfono_hotkey}}',
      pdf: 'PDF erkannt · Werkzeuge werden vorbereitet...'
    },

    // Toolbar - visuelle Erzählsteuerung
    visualControls: {
      toggleSubs: 'Untertitel ein-/ausschalten',
      toggleHighlight: 'Texthervorhebung ein-/ausschalten'
    },

    terminosPopup: {
      funcLectura: 'Vorlesen',
      funcMicrofono: 'das Mikrofon',
      funcEscritura: 'automatisches Schreiben',
      funcNarrador: 'Seitenvorleser',
      btnAceptarContinuar: 'Akzeptieren und Fortfahren',
      cuerpoAntesFunc: 'Um',
      cuerpoDespuesFunc: 'zu nutzen, musst du die Nutzungsbedingungen von ZenithNexus akzeptieren.',
    },

    // Ventana Picture-in-Picture (PiP)
    pip: {
      reading: 'Lesen',
      recording: 'Diktieren',
      ready: 'Bereit',
      progress: 'Fortschritt',
      listening: 'Zuhören...',
      listeningPlaceholder: 'Der diktierte Text wird hier angezeigt...',
      copy: 'Kopieren',
      clear: 'Löschen',
      stopMic: 'Mikrofon deaktivieren',
      startMic: 'Mikrofon aktivieren',
      pause: 'Pause',
      play: 'Abspielen',
      stop: 'Alles stoppen',
      speed: 'Geschwindigkeit:',
      trial: 'Testversion'
    }
};
