/**
 * Textos para la página de configuración (options.html)
 * @type {object}
 */
export const options = {
  // Header
  headerTitulo: '{{nombreSitio}}',
  headerSlogan: 'Kommunikation auf dem Höhepunkt.',

  // Loading
  cargando: 'Cargando...',
  general: 'Allgemein',
  reading: 'Lesen',
  dictation: 'Diktat',

  // Sección Idiomas
  sectionIdiomasTitulo: 'Spracheinstellungen',
  sectionIdiomasDesc: 'Wählen Sie die Eingabesprache (Mikrofon und Werkzeuge) und die Ausgabesprache (Stimme und Schrift Ihres Diktiers).',
  sectionIdiomasNote: 'Diese Einstellung wirkt sich auch auf den Erzählermodus aus, der Seiten in der ausgewählten Ausgabesprache erzählt.',
  sectionIdiomasNoteIcon: 'ℹ️',

  // Sección Idiomas TTS/STT
  sectionIdiomasTTSSTT: 'Stimm- und Schriftsprachen',
  sectionIdiomasTTSSTTDesc: 'Legen Sie die Sprachen für Sprachsynthese (TTS) und Spracherkennung (STT) fest.',

  licenseSectionDesc: 'Verwalten Sie Ihren Premium-Plan und greifen Sie auf alle Funktionen zu.',
  licenseStatus: 'Status: {{status}}',
  licensePlan: 'Plan: {{plan}}',
  licenseExpires: 'Ablaufdatum: {{date}}',
  licenseUpgrade: 'Premium erhalten',
  licenseManage: 'Kauf verwalten',
  trialDayLeft: 'Testtag verbleibend',
  trialDaysLeft: 'Testtage verbleibend',
  upgradeToPremium: 'Auf Premium upgraden',

  // Auto-detección de idioma
  autoDetectLanguage: 'Sprache automatisch erkennen',
  autoDetectRecommended: 'Empfohlen',
  autoDetectLanguageDesc: 'Erkennt die Eingabesprache automatisch für eine bessere Genauigkeit.',

  // Selectores de idioma entrada/salida
  idiomaEntrada: 'Eingabesprache',
  idiomaSalida: 'Ausgabesprache (Sprache und Schrift)',
  idiomaEntradaHint: 'Wählen Sie die Sprache aus, in der Sie in das Mikrofon sprechen möchten',
  idiomaSalidaHint: 'Wählen Sie die Sprache aus, in der der Text gelesen oder geschrieben werden soll',

  // Selector idioma UI
  idiomaInterfaz: 'Schnittstellensprache',
  idiomaInterfazDesc: 'Wählen Sie die Sprache der Erweiterungstexte aus.',
  idiomaInterfazHint: 'Wenn Sie die Sprache der Benutzeroberfläche ändern, werden auch die Eingabesprachen (STT) und Ausgabesprachen (TTS) automatisch synchronisiert.',

  // Opciones de idioma
  idiomaEspanolLatino: 'Spanisch (Latein)',
  idiomaEspanolEspana: 'Spanisch (Spanien)',
  idiomaInglesUSA: 'Englisch (USA)',
  idiomaInglesUK: 'Englisch (UK)',
  idiomaFrances: 'Französisch',
  idiomaPortugues: 'Portugiesisch',
  idiomaItaliano: 'Italienisch',
  idiomaAleman: 'Deutsch',
  idiomaJapones: 'Japanisch',

  // Sección Voz
  sectionVozTitulo: 'Lesegeschwindigkeit',
  sectionVozDesc: 'Wählen Sie die Lesegeschwindigkeit',
  sectionVozNote: 'Diese Einstellung wirkt sich auch auf den Erzählermodus aus.',
  sectionVozNoteIcon: 'ℹ️',

  // Velocidades
  velocidadLenta: 'Langsam',
  velocidadNormal: 'Normal',
  velocidadRapida: 'Schnell',

  // Sección Micrófono
  sectionMicTitulo: 'Mikrofon',
  sectionMicDesc: 'Schalten Sie das Mikrofon ein oder aus, um Text zu diktieren',
  micActivo: 'Aktiviert',
  micInactivo: 'Deaktiviert',
  micTiempoActivo: 'Mikrofon-Aktivzeit:',
  micTiempo10seg: '10 Sekunden (Standard)',
  micTiempo1min: '1 Minute',
  micTiempoMantener: 'Bleiben Sie aktiv',
  dblClickActivo: 'Doppelklick aktiviert',
  dblClickInactivo: 'Doppelklick deaktiviert',
  dblClickDesc: 'Doppelklick zum Diktieren',

  // Sección Narración Visual
  sectionNarracionTitulo: 'Visuelle Erzählung',
  sectionNarracionDesc: 'Steuert die visuellen Elemente, die während des Vorlesens von Seiten erscheinen.',
  subtitulosLabel: 'Untertitel',
  subtitulosDesc: 'Zeigt den vorgelesenen Text am unteren Bildschirmrand an.',
  subtitulosActivado: 'Aktiviert',
  subtitulosDesactivado: 'Deaktiviert',
  resaltadoLabel: 'Hervorhebung',
  resaltadoDesc: 'Hebt den gelesenen Text visuell hervor.',
  resaltadoActivado: 'Aktiviert',
  resaltadoDesactivado: 'Deaktiviert',

  // Demo
  pdfSectionTitulo: 'PDF-Reader',
  pdfSectionDesc: 'Verwenden Sie ZenithNexus in PDF-Dateien, um vorzulesen.',

  sectionDemoTitulo: 'Demo und Test',
  sectionDemoDesc: 'Testen Sie die Funktionen von {{nombreSitio}}, bevor Sie sie verwenden',

  // Demo TTS
  demoTTS: 'Lesetest',
  demoTTSHint: 'Klicken Sie auf die Schaltfläche, um einen Testtext in der ausgewählten Geschwindigkeit anzuhören.',
  demoTTSPlay: 'Demo spielen',
  demoTTSPlaying: 'Spielen...',

  // Demo STT
  demoSTT: 'Schreibtest',
  demoSTTHint: 'Aktivieren Sie das Mikrofon und sprechen Sie, um zu sehen, wie Ihre Stimme in Text umgewandelt wird.',
  demoSTTActivar: 'Diktat starten',
  demoSTTDetener: 'Stoppen Sie das Diktat',
  demoSTTPlaceholder: ' Aktivieren Sie das Mikrofon oben, um das Diktat zu starten...\nDer von Ihnen gesprochene Text wird hier automatisch angezeigt.',
  demoPremiumNote: 'Unbegrenztes Diktat ist eine Premium-Funktion. Probieren Sie es hier aus und wenn es Ihnen gefällt, holen Sie sich den vollständigen Plan.',
  demoMicInactivo: 'Mikrofon inaktiv',
  demoMicEscuchando: 'Hören...',

  // Estado demos
   demoTranslating: 'Übersetzen...',
  demoComplete: 'Wiedergabe abgeschlossen',
  demoError: 'Fehler beim Spielen',
  demoNavegadorNoSoportado: 'Ihr Browser unterstützt dies nicht',

  // Atajos
  sectionShortcutsTitulo: 'Tastaturkürzel',
  sectionShortcutsDesc: 'Verwenden Sie diese Tastenkombinationen, um {{nombreSitio}} schnell zu steuern.',
  shortcutLeer: 'Lesen',
  shortcutDetener: 'Stoppen',
  shortcutMic: 'Mikrofon',
  shortcutEscritura: 'Automatisches Schreiben',
  shortcutLeerDesc: 'Lesen Sie den ausgewählten Text laut vor',
  shortcutDetenerDesc: 'Stoppen Sie den aktuellen Messwert',
  shortcutMicDesc: 'Aktivieren Sie das Mikrofon, um Text zu diktieren',
  shortcutEscrituraDesc: 'Automatisches Vorlesen bei Textauswahl aktivieren/deaktivieren',
  shortcutMac: 'Für Mac-Benutzer',
  shortcutMacDesc: 'Auf dem Mac wird die Strg-Taste durch die Befehlstaste (⌘) ersetzt.',
  shortcutMacExample: 'Beispiel: Strg+Umschalt+L → ⌘+Umschalt+L',

  // Guardado
  btnGuardar: 'Einstellungen speichern',
  statusGuardado: 'Einstellungen erfolgreich gespeichert!',
  statusError: 'Fehler beim Speichern der Einstellungen',

  // Animations-Sektion
  animationsTitulo: 'Animationen & Visuelle Effekte',
  animationsDesc: 'Aktivieren oder deaktivieren Sie Animationen und visuelle Effekte der Erweiterung. Dies beinhaltet den animierten Hintergrund, Übergänge und andere Effekte.',
  animationsActivadas: 'Animationen aktiviert',
  animationsDesactivadas: 'Animationen deaktiviert',
  animationsPreviewOn: 'Animationen sind sichtbar',
  animationsPreviewOff: 'Animationen sind deaktiviert',

  // Abschnitt Symbolleiste
  sectionToolbarTitulo: 'Symbolleiste',
  sectionToolbarDesc: 'Steuert die Sichtbarkeit der schwebenden Symbolleiste auf Webseiten.',
  toolbarLabel: 'Symbolleiste anzeigen',
  toolbarDesc: 'Zeigt die schwebende Symbolleiste mit Lese-Steuerelementen auf Webseiten an.',
  toolbarVisible: 'Sichtbar',
  toolbarOculto: 'Versteckt',

  // Spende/Abonnement
  sectionDonacionTitulo: 'Unterstützen Sie das Projekt',
  sectionDonacionDesc: '{{nombreSitio}} ist kostenlos. Wenn es Ihnen gefällt, denken Sie über ein Abonnement nach, um das Projekt am Leben zu erhalten!!!',
   sectionDonacionLink: 'Abonnieren',
   footerDonacionTitle: 'Unterstützen Sie das Projekt',
   footerDonacionCta: 'Projekt unterstützen',
   footerDonacionThanks: 'Vielen Dank für Ihre Unterstützung!',

   // Footer
   footerNote: 'Weitere Optionen in den Einstellungen',
  footerTerminos: 'Allgemeine Geschäftsbedingungen',
  footerPrivacidad: 'Datenschutzrichtlinie',
  footerContacto: 'Kontaktieren Sie uns',

  // Términos y Condiciones
  sectionTerminosTitulo: 'Geschäftsbedingungen',
  sectionTerminosDesc: 'Um ZenithNexus nutzen zu können, müssen Sie die Nutzungsbedingungen akzeptieren.',
  terminosVersion: 'Version',
  terminosEstadoAceptado: 'Akzeptiert',
  terminosEstadoPendiente: 'Bis zur Annahme',
  terminosEstadoActualizado: 'Sie müssen die neue Version akzeptieren',
  terminosAceptar: 'Akzeptieren Sie die Bedingungen',
  terminosCheckbox: 'Ich habe die gelesen und akzeptiere sie',
  terminosLink: 'Nutzungsbedingungen',
  terminosFechaAceptacion: 'Akzeptiert am',
  terminosBtnDesbloquear: 'Funktionen freischalten',

  blocklistSectionTitulo: 'Sperrliste',
  blocklistSectionDesc: 'Verwalten Sie die Websites und Sprachen, auf denen die Erweiterung nicht aktiv werden soll.',
  blocklistSitesTitle: 'Deaktivierte Websites',
  blocklistSitesDesc: 'Die Erweiterung wird auf diesen Websites vollständig deaktiviert.',
  blocklistLanguagesTitle: 'Ignorierte Sprachen',
  blocklistLanguagesDesc: 'Das Spracherkennungs-Modal wird für diese Sprachen nicht angezeigt.',
  blocklistInputPlaceholder: 'Geben Sie eine Domain oder URL ein (z. B. github.com)',
  blocklistAddBtn: 'Hinzufügen',
  blocklistNoSites: 'Keine deaktivierten Websites.',
  blocklistNoLanguages: 'Keine ignorierten Sprachen.',
  blocklistLanguageSelectPlaceholder: 'Wählen Sie eine Sprache...',

  // Sprachbefehle-Hilfe
  voiceCommandsHelpTitle: 'Sprachbefehls-Anleitung',
  voiceCommandsHelpDesc: 'Schlüsselwörter für Zeichensetzung und Textformatierung anzeigen.',
  voiceCommandsSearchPlaceholder: 'Befehl oder Symbol suchen (z. B. Komma, fett)...',
  voiceCommandsNoResults: 'Keine passenden Befehle gefunden.',
};

export default {};
