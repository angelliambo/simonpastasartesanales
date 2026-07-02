/**
 * Textos para la página de configuración (options.html)
 * @type {object}
 */
export const options = {
  // Header
  headerTitulo: '{{nombreSitio}}',
  headerSlogan: 'La comunicazione al suo apice.',

  // Loading
  cargando: 'Cargando...',
  general: 'Generale',
  reading: 'Lettura',
  dictation: 'Dettatura',

  // Sección Idiomas
  sectionIdiomasTitulo: 'Impostazioni della lingua',
  sectionIdiomasDesc: 'Seleziona la lingua di input (microfono e strumenti) e la lingua di output (voce e scrittura di ciò che detta).',
  sectionIdiomasNote: 'Questa impostazione influisce anche sulla modalità Narratore, che narrerà le pagine nella lingua di output selezionata.',
  sectionIdiomasNoteIcon: 'ℹ️',

  // Sección Idiomas TTS/STT
  sectionIdiomasTTSSTT: 'Lingue vocali e scritte',
  sectionIdiomasTTSSTTDesc: 'Imposta le lingue per la sintesi vocale (TTS) e il riconoscimento vocale (STT).',

  // Auto-detección de idioma
  autoDetectLanguage: 'Rilevamento automatico della lingua',
  autoDetectRecommended: 'Raccomandato',
  autoDetectLanguageDesc: 'Rileva automaticamente la lingua di input per una migliore precisione.',

  // Selectores de idioma entrada/salida
  idiomaEntrada: 'Lingua di input',
  idiomaSalida: 'Lingua di output (voce e scrittura)',
  idiomaEntradaHint: 'Seleziona la lingua che utilizzerai per parlare al microfono',
  idiomaSalidaHint: 'Seleziona la lingua in cui desideri che il testo venga letto o scritto',

  // Selector idioma UI
  idiomaInterfaz: 'Linguaggio dell\'interfaccia',
  idiomaInterfazDesc: 'Seleziona la lingua dei testi delle estensioni.',
  idiomaInterfazHint: 'Quando si cambia la lingua dell\'interfaccia, anche le lingue di input(STT) e di output(TTS) verranno sincronizzate automaticamente.',

  // Opciones de idioma
  idiomaEspanolLatino: 'spagnolo (latino)',
  idiomaEspanolEspana: 'Spagnolo (Spagna)',
  idiomaInglesUSA: 'Inglese (Stati Uniti)',
  idiomaInglesUK: 'Inglese (Regno Unito)',
  idiomaFrances: 'francese',
  idiomaPortugues: 'portoghese',
  idiomaItaliano: 'Italiano',
  idiomaAleman: 'tedesco',
  idiomaJapones: 'giapponese',

  // Sección Voz
  sectionVozTitulo: 'Velocità di lettura',
  sectionVozDesc: 'Seleziona la velocità di lettura',
  sectionVozNote: 'Questa impostazione influisce anche sulla modalità Assistente vocale.',
  sectionVozNoteIcon: 'ℹ️',

  // Velocidades
  velocidadLenta: 'Lento',
  velocidadNormal: 'Normale',
  velocidadRapida: 'Presto',

  // Sección Micrófono
  sectionMicTitulo: 'Microfono',
  sectionMicDesc: 'Attiva o disattiva il microfono per dettare il testo',
  micActivo: 'Attivato',
  micInactivo: 'Disabilitato',
  micTiempoActivo: 'Tempo attivo del microfono:',
  micTiempo10seg: '10 secondi (predefinito)',
  micTiempo1min: '1 minuto',
  micTiempoMantener: 'Mantieniti attivo',
  dblClickActivo: 'Doppio clic abilitato',
  dblClickInactivo: 'Doppio clic disabilitato',
  dblClickDesc: 'Doppio clic per dettare testo',

  // Sección Narración Visual
  sectionNarracionTitulo: 'Narrazione Visiva',
  sectionNarracionDesc: 'Controlla gli elementi visivi che appaiono durante la narrazione delle pagine.',
  subtitulosLabel: 'Sottotitoli',
  subtitulosDesc: 'Mostra il testo narrato nella parte inferiore dello schermo.',
  subtitulosActivado: 'Attivato',
  subtitulosDesactivado: 'Disattivato',
  resaltadoLabel: 'Evidenziazione',
  resaltadoDesc: 'Resalta visualmente el texto que se está leyendo.',
  resaltadoActivado: 'Attivato',
  resaltadoDesactivado: 'Disattivato',

  // Demo
  pdfSectionTitulo: 'Lector de PDF',
  pdfSectionDesc: 'Usa ZenithNexus nei file PDF per leggere ad alta voce.',

  sectionDemoTitulo: 'Demo e test',
  sectionDemoDesc: 'Testare le funzionalità {{nombreSitio}} prima di utilizzarle',

  // Demo TTS
  demoTTS: 'Prova di lettura',
  demoTTSHint: 'Fare clic sul pulsante per ascoltare un testo di prova alla velocità selezionata.',
  demoTTSPlay: 'Gioca alla demo',
  demoTTSPlaying: 'Giocando...',

  // Demo STT
  demoSTT: 'Prova di scrittura',
  demoSTTHint: 'Attiva il microfono e parla per vedere la tua voce trascritta in testo.',
  demoSTTActivar: 'Avvia dettatura',
  demoSTTDetener: 'Interrompi la dettatura',
  demoSTTPlaceholder: ' Attiva il microfono qui sopra per iniziare la dettatura...\nIl testo che pronunci apparirà qui automaticamente.',
  demoPremiumNote: 'La dettatura illimitata è una funzione Premium. Provala qui e se ti piace, ottieni il piano completo.',
  demoMicInactivo: 'Microfono inattivo',
  demoMicEscuchando: 'Ascolto...',

  // Estado demos
  demoTranslating: 'Traducendo...',
  demoComplete: 'Riproduzione completata',
  demoError: 'Errore durante il gioco',
  demoNavegadorNoSoportado: 'Il tuo browser non supporta',

  // Atajos
  sectionShortcutsTitulo: 'Scorciatoie da tastiera',
  sectionShortcutsDesc: 'Utilizza queste scorciatoie per controllare rapidamente {{nombreSitio}}.',
  shortcutLeer: 'Leggere',
  shortcutDetener: 'Arresto',
  shortcutMic: 'Microfono',
  shortcutEscritura: 'Scrittura automatica',
  shortcutLeerDesc: 'Leggi ad alta voce il testo selezionato',
  shortcutDetenerDesc: 'Interrompe la lettura corrente',
  shortcutMicDesc: 'Attiva il microfono per dettare il testo',
  shortcutEscrituraDesc: 'Attiva/disattiva la lettura automatica durante la selezione del testo',
  shortcutMac: 'Per utenti Mac',
  shortcutMacDesc: 'Su Mac, il tasto Ctrl è sostituito da Comando (⌘).',
  shortcutMacExample: 'Esempio: Ctrl+Maiusc+L → ⌘+Maiusc+L',

  // Guardado
  btnGuardar: 'Salva impostazioni',
  statusGuardado: 'Impostazioni salvate con successo!',
  statusError: 'Errore durante il salvataggio delle impostazioni',

  // Sezione Animazioni
  animationsTitulo: 'Animazioni ed Effetti Visivi',
  animationsDesc: 'Attiva o disattiva le animazioni e gli effetti visivi dell\'estensione. Questo include lo sfondo animato, le transizioni e altri effetti.',
  animationsActivadas: 'Animazioni attivate',
  animationsDesactivadas: 'Animazioni disattivate',
  animationsPreviewOn: 'Le animazioni sono visibili',
  animationsPreviewOff: 'Le animazioni sono disattivate',

  // Sezione Barra degli Strumenti
  sectionToolbarTitulo: 'Barra degli strumenti',
  sectionToolbarDesc: 'Controlla la visibilità della barra degli strumenti fluttuante sulle pagine web.',
  toolbarLabel: 'Mostra la barra degli strumenti',
  toolbarDesc: 'Mostra la barra degli strumenti fluttuante con i controlli di lettura sulle pagine web.',
  toolbarVisible: 'Visibile',
  toolbarOculto: 'Nascosto',

  // Donazione/Abonnement
  sectionDonacionTitulo: 'Sostieni il progetto',
  sectionDonacionDesc: '{{nombreSitio}} è gratuito. Se ti piace, considera di iscriverti per mantenere vivo il progetto!!!',
   sectionDonacionLink: 'Iscriviti',
   footerDonacionTitle: 'Sostieni il progetto',
   footerDonacionCta: 'Sostieni il progetto',
   footerDonacionThanks: 'Grazie per il tuo sostegno!',

   // Footer
   footerNote: 'Altre opzioni in Impostazioni',
  footerTerminos: 'Termini e Condizioni',
  footerPrivacidad: 'Informativa sulla privacy',

  // Términos y Condiciones
  sectionTerminosTitulo: 'Termini e Condizioni',
  sectionTerminosDesc: 'Per utilizzare ZenithNexus è necessario accettare i termini e le condizioni d\'uso.',
  terminosVersion: 'Versione',
  terminosEstadoAceptado: 'Accettato',
  terminosEstadoPendiente: 'In attesa di accettazione',
  terminosEstadoActualizado: 'È necessario accettare la nuova versione',
  terminosAceptar: 'Accetta i termini',
  terminosCheckbox: 'Ho letto e accetto i',
  terminosLink: 'termini e condizioni d\'uso',
  terminosFechaAceptacion: 'Accettato il',
  terminosBtnDesbloquear: 'Sblocca funzionalità',

  blocklistSectionTitulo: 'Lista di Blocco',
  blocklistSectionDesc: 'Gestisci i siti web e le lingue in cui preferisci che l\'estensione non agisca.',
  blocklistSitesTitle: 'Siti web disabilitati',
  blocklistSitesDesc: 'L\'estensione sarà completamente disabilitata su questi siti.',
  blocklistLanguagesTitle: 'Lingue ignorate',
  blocklistLanguagesDesc: 'Il modal di rilevamento della lingua non verrà mostrato per queste lingue.',
  blocklistInputPlaceholder: 'Inserisci un dominio o URL (es: github.com)',
  blocklistAddBtn: 'Aggiungi',
  blocklistNoSites: 'Nessun sito disabilitato.',
  blocklistNoLanguages: 'Nessuna lingua ignorata.',
  blocklistLanguageSelectPlaceholder: 'Seleziona una lingua...',

  // Aiuto comandi vocali
  voiceCommandsHelpTitle: 'Guia ai Comandi Vocali',
  voiceCommandsHelpDesc: 'Consulta le parole chiave per la punteggiatura e la formattazione del testo.',
  voiceCommandsSearchPlaceholder: 'Cerca comando o simbolo (es: virgola, grassetto)...',
  voiceCommandsNoResults: 'Nessun comando trovato corrispondente alla ricerca.',
};

export default {};
