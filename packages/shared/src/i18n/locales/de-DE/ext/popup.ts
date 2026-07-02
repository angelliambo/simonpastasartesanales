/**
 * Textos para el popup (popup.html)
 * @type {object}
 */
export const popup = {
  // Header
  headerTitulo: '{{nombreSitio}}',

  // Estado Micrófono
  micVerificando: 'Überprüfung...',
  micEsperandoConfig: 'Warten auf Konfiguration',
  micListo: 'Mikrofon bereit',
  micActivo: 'Hören',
  micInactivo: 'Mikrofon deaktiviert',
  micError: 'Mikrofonfehler',
  micClickParaActivar: 'Zum Aktivieren klicken',

  // Estado Micrófono - Hardcodeados anteriormente en popup.js
  micListoLabel: 'Mikrofon bereit',
  micListoHint: 'Drücken Sie zum Diktieren Strg+Umschalt+Q',
  micActivoLabel: 'Hören...',
  micActivoHint: 'Auf dieser Seite diktieren',
  micSinConfigurarLabel: 'Unkonfiguriert',
  micSinConfigurarHint: 'Aktivieren Sie es in den Einstellungen',
  micRevisarPermisos: 'Berechtigungen prüfen',
  micConfigurando: 'Konfigurieren...',

  // Botones acciones
  btnDictar: 'Diktieren',
  btnLeer: 'Auswahl lesen',
  btnDetener: 'Stoppen',

  // Tooltips
  btnDictarTitle: 'Aktivieren Sie das Mikrofon, um zu diktieren',
  btnLeerTitle: 'Lesen Sie den ausgewählten Text laut vor',

  // Atajos
  shortcutTitulo: 'Verknüpfungen',
  shortcutMic: 'Mikrofon aktivieren',
  shortcutLeer: 'Auswahl lesen',

  // Footer
  footerConfig: 'Einstellungen',
  footerNote: 'Weitere Optionen in den Einstellungen',

  // Premium / License
  loginPortal: 'Am Portal anmelden',
  premiumBadge: 'Premium',
  upgradeToPremium: 'Premium erhalten',
  planActive: 'Plan {{plan}} aktiv',
  planExpired: 'Plan abgelaufen',
  planExpires: 'Läuft ab am {{date}}',
  trialDayLeft: 'Tag verbleibend',
  trialDaysLeft: 'Tage verbleibend',
  trialLastDay: 'Letzter Tag',
  checkoutTitle: 'Kauf abschließen',
  btnPipTitle: 'Schwebende Konsole (Immer im Vordergrund)',
  btnPip: 'Schwebend',

  // Pricing modal
  pricingTitle: '{{nombreSitio}} Premium',
  pricingSubtitle: 'Schalten Sie die Kraft der Stimme frei',
  pricingGratis: 'Kostenlos',
  pricingChoose: 'Wählen Sie {{plan}}',
  pricingCurrent: 'Ihr aktueller Plan',
};

export default {};
