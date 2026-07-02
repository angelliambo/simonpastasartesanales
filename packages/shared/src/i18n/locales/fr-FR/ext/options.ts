/**
 * Textos para la página de configuración (options.html)
 * @type {object}
 */
export const options = {
  // Header
  headerTitulo: '{{nombreSitio}}',
  headerSlogan: 'La communication à son apogée.',

  // Loading
  cargando: 'Cargando...',
  general: 'Général',
  reading: 'Lecture',
  dictation: 'Dictée',

  // Sección Idiomas
  sectionIdiomasTitulo: 'Paramètres de langue',
  sectionIdiomasDesc: 'Sélectionnez la langue d\'entrée(microphone et outils) et la langue de sortie(voix et écriture de ce que vous dictez).',
  sectionIdiomasNote: 'Ce paramètre affecte également le mode Narrateur, qui racontera les pages dans la langue de sortie sélectionnée.',
  sectionIdiomasNoteIcon: 'ℹ️',

  // Sección Idiomas TTS/STT
  sectionIdiomasTTSSTT: 'Langues vocales et écrites',
  sectionIdiomasTTSSTTDesc: 'Définissez les langues pour la synthèse vocale (TTS) et la reconnaissance vocale (STT).',

  // Auto-detección de idioma
  autoDetectLanguage: 'Détection automatique de la langue',
  autoDetectRecommended: 'Recommandé',
  autoDetectLanguageDesc: 'Détecte automatiquement la langue de saisie pour une meilleure précision.',

  // Selectores de idioma entrada/salida
  idiomaEntrada: 'Langue d\'entrée',
  idiomaSalida: 'Langue de sortie (voix et écriture)',
  idiomaEntradaHint: 'Sélectionnez la langue que vous utiliserez pour parler dans le microphone',
  idiomaSalidaHint: 'Sélectionnez la langue dans laquelle vous souhaitez que le texte soit lu ou écrit',

  // Selector idioma UI
  idiomaInterfaz: 'Langue de l\'interface',
  idiomaInterfazDesc: 'Sélectionnez la langue des textes d\'extension.',
  idiomaInterfazHint: 'Lorsque vous changez la langue de l\'interface, les langues d\'entrée (STT) et de sortie (TTS) seront également automatiquement synchronisées.',

  // Opciones de idioma
  idiomaEspanolLatino: 'espagnol (latin)',
  idiomaEspanolEspana: 'Espagnol (Espagne)',
  idiomaInglesUSA: 'Anglais (États-Unis)',
  idiomaInglesUK: 'Anglais (Royaume-Uni)',
  idiomaFrances: 'Français',
  idiomaPortugues: 'portugais',
  idiomaItaliano: 'italien',
  idiomaAleman: 'Allemand',
  idiomaJapones: 'japonais',

  // Sección Voz
  sectionVozTitulo: 'Vitesse de lecture',
  sectionVozDesc: 'Sélectionnez la vitesse de lecture',
  sectionVozNote: 'Ce paramètre affecte également le mode Narrateur.',
  sectionVozNoteIcon: 'ℹ️',

  // Velocidades
  velocidadLenta: 'Lent',
  velocidadNormal: 'Normal',
  velocidadRapida: 'Rapide',

  // Sección Micrófono
  sectionMicTitulo: 'Microphone',
  sectionMicDesc: 'Allumez ou éteignez le microphone pour dicter du texte',
  micActivo: 'Activé',
  micInactivo: 'Désactivé',
  micTiempoActivo: 'Temps d\'activité du microphone: ',
  micTiempo10seg: '10 secondes (par défaut)',
  micTiempo1min: '1 minute',
  micTiempoMantener: 'Restez actif',
  dblClickActivo: 'Double clic activé',
  dblClickInactivo: 'Double clic désactivé',
  dblClickDesc: 'Double clic pour dicter du texte',

  // Sección Narración Visual
  sectionNarracionTitulo: 'Narration Visuelle',
  sectionNarracionDesc: 'Contrôle les éléments visuels qui apparaissent pendant la narration de pages.',
  subtitulosLabel: 'Sous-titres',
  subtitulosDesc: 'Affiche le texte narré en bas de l\'écran.',
  subtitulosActivado: 'Activé',
  subtitulosDesactivado: 'Désactivé',
  resaltadoLabel: 'Surlignage',
  resaltadoDesc: 'Resalta visualmente el texto que se está leyendo.',
  resaltadoActivado: 'Activé',
  resaltadoDesactivado: 'Désactivé',

  // Demo
  pdfSectionTitulo: 'Lector de PDF',
  pdfSectionDesc: 'Utilisez ZenithNexus dans les fichiers PDF pour lire à haute voix.',

  sectionDemoTitulo: 'Démo et tests',
  sectionDemoDesc: 'Testez les fonctionnalités {{nombreSitio}} avant de les utiliser',

  // Demo TTS
  demoTTS: 'Test de lecture',
  demoTTSHint: 'Cliquez sur le bouton pour entendre un texte de test à la vitesse sélectionnée.',
  demoTTSPlay: 'Jouer à la démo',
  demoTTSPlaying: 'Jouant...',

  // Demo STT
  demoSTT: 'Test d\'écriture',
  demoSTTHint: 'Activez le microphone et parlez pour voir votre voix transcrite en texte.',
  demoSTTActivar: 'Démarrer la dictée',
  demoSTTDetener: 'Arrêter la dictée',
  demoSTTPlaceholder: ' Activez le microphone ci-dessus pour lancer la dictée...\nLe texte que vous prononcez apparaîtra ici automatiquement.',
  demoPremiumNote: 'La dictée illimitée est une fonctionnalité Premium. Essayez-la ici et si vous aimez, obtenez le plan complet.',
  demoMicInactivo: 'Micro inactif',
  demoMicEscuchando: 'Écoute...',

  // Estado demos
  demoTranslating: 'Traduction...',
  demoComplete: 'Lecture terminée',
  demoError: 'Erreur lors de la lecture',
  demoNavegadorNoSoportado: 'Votre navigateur ne prend pas en charge',

  // Atajos
  sectionShortcutsTitulo: 'Raccourcis clavier',
  sectionShortcutsDesc: 'Utilisez ces raccourcis pour contrôler rapidement {{nombreSitio}}.',
  shortcutLeer: 'Lire',
  shortcutDetener: 'Arrêter',
  shortcutMic: 'Microphone',
  shortcutEscritura: 'Écriture automatique',
  shortcutLeerDesc: 'Lire à haute voix le texte sélectionné',
  shortcutDetenerDesc: 'Arrêter la lecture en cours',
  shortcutMicDesc: 'Activez le microphone pour dicter du texte',
  shortcutEscrituraDesc: 'Activer/désactiver la lecture automatique lors de la sélection de texte',
  shortcutMac: 'Pour les utilisateurs Mac',
  shortcutMacDesc: 'Sur Mac, la touche Ctrl est remplacée par Commande (⌘).',
  shortcutMacExample: 'Exemple : Ctrl+Maj+L → ⌘+Maj+L',

  // Guardado
  btnGuardar: 'Enregistrer les paramètres',
  statusGuardado: 'Paramètres enregistrés avec succès !',
  statusError: 'Erreur lors de l\'enregistrement des paramètres',

  // Section Animations
  animationsTitulo: 'Animations et Effets Visuels',
  animationsDesc: 'Activez ou désactivez les animations et effets visuels de l\'extension. Cela inclut l\'arrière-plan animé, les transitions et autres effets.',
  animationsActivadas: 'Animations activées',
  animationsDesactivadas: 'Animations désactivées',
  animationsPreviewOn: 'Les animations sont visibles',
  animationsPreviewOff: 'Les animations sont désactivées',

  // Section Barre d'Outils
  sectionToolbarTitulo: 'Barre d\'outils',
  sectionToolbarDesc: 'Contrôle la visibilité de la barre d\'outils flottante sur les pages web.',
  toolbarLabel: 'Afficher la barre d\'outils',
  toolbarDesc: 'Affiche la barre d\'outils flottante avec les commandes de lecture sur les pages web.',
  toolbarVisible: 'Visible',
  toolbarOculto: 'Masqué',

  // Don/Abonnement
  sectionDonacionTitulo: 'Soutenez le projet',
  sectionDonacionDesc: '{{nombreSitio}} est gratuit. Si vous l\'aimez, pensez à vous abonner pour faire vivre le projet !!!',
   sectionDonacionLink: 'S\'abonner',
   footerDonacionTitle: 'Soutenez le projet',
   footerDonacionCta: 'Soutenir le projet',
   footerDonacionThanks: 'Merci pour votre soutien !',

   // Footer
   footerNote: 'Plus d\'options dans Paramètres',
  footerTerminos: 'Termes et Conditions',
  footerPrivacidad: 'Politique de confidentialité',

  // Términos y Condiciones
  sectionTerminosTitulo: 'Termes et conditions',
  sectionTerminosDesc: 'Pour utiliser ZenithNexus, vous devez accepter les termes et conditions d\'utilisation.',
  terminosVersion: 'Version',
  terminosEstadoAceptado: 'Accepté',
  terminosEstadoPendiente: 'En attente d\'acceptation',
  terminosEstadoActualizado: 'Vous devez accepter la nouvelle version',
  terminosAceptar: 'Accepter les conditions',
  terminosCheckbox: 'J\'ai lu et j\'accepte le',
  terminosLink: 'conditions générales d\'utilisation',
  terminosFechaAceptacion: 'Accepté le',
  terminosBtnDesbloquear: 'Fonctionnalités de déverrouillage',

  blocklistSectionTitulo: 'Liste de Blocage',
  blocklistSectionDesc: 'Gérez les sites web et les langues où vous préférez que l\'extension n\'agisse pas.',
  blocklistSitesTitle: 'Sites web désactivés',
  blocklistSitesDesc: 'L\'extension sera complètement désactivée sur ces sites.',
  blocklistLanguagesTitle: 'Langues ignorées',
  blocklistLanguagesDesc: 'Le modal de détection de langue ne s\'affichera pas pour ces langues.',
  blocklistInputPlaceholder: 'Entrez un domaine ou une URL (ex: github.com)',
  blocklistAddBtn: 'Ajouter',
  blocklistNoSites: 'Aucun site désactivé.',
  blocklistNoLanguages: 'Aucune langue ignorée.',
  blocklistLanguageSelectPlaceholder: 'Sélectionnez une langue...',

  // Aide commandes vocales
  voiceCommandsHelpTitle: 'Guide des commandes vocales',
  voiceCommandsHelpDesc: 'Consultez les mots-clés pour la ponctuation et le formatage du texte.',
  voiceCommandsSearchPlaceholder: 'Rechercher une commande ou un symbole (ex: virgule, gras)...',
  voiceCommandsNoResults: 'Aucune commande ne correspond à la recherche.',
};

export default {};
