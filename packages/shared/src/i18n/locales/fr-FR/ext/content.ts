/**
 * Textos para el content script (content.ts)
 * @type {object}
 */
export const content = {
  // Popup de idioma detectado
  idioma: {
    titulo: 'Lecteur PDF - ZenithNexus',
    mensaje: 'Cette page est en {{idioma}}. Voulez-vous que {{nombreSitio}} lise dans cette langue?',
    btnUnaVez: 'Cette fois seulement',
    btnSiempre: 'Oui, toujours pour tout site',
    btnSitio: 'Oui, seulement ce site',
    btnNunca: 'Ne plus jamais déranger'
  },

  // Popup de idioma incompatible (advertencia)
  idiomaIncompatible: {
    titulo: 'Langue non prise en charge',
    mensaje: 'Cette page est en {{idioma}}. ZenithNexus ne prend pas entièrement en charge cette langue. L\'expérience peut ne pas être optimale.',
    btnAuto: 'Activer la reconnaissance automatique',
    btnConfig: 'Modifier dans les paramètres',
    btnIgnorar: 'Ignorer'
  },

  // Popup de idioma compatible (ofrecimiento)
  idiomaCompatible: {
    titulo: 'Langue détectée',
    mensaje: 'Cette page est en {{idioma}}. Voulez-vous adapter {{nombreSitio}} pour une meilleure expérience?',
    btnCambiar: 'Changer de langue',
    btnAuto: 'Activer la reconnaissance automatique',
    btnMantener: 'Garder actuel'
  },

  // Confirmación de idioma
  idiomaConfirm: {
    titulo: 'Langue détectée'
  },

  // Banner de permisos
  permisos: {
    titulo: 'Permission du microphone',
    mensaje: '{{nombreSitio}} a besoin d\'accéder au microphone pour dicter du texte.',
    btnActivar: 'Activer maintenant',
    btnActivarMicrofono: 'Activer le microphone',
    btnMasTarde: 'Plus tard'
  },

  // Indicador STT (dictado)
  stt: {
    escuchando: 'Dictée...',
    listening: 'Écoute...',
    waiting: 'En attente...',
    dormant: 'Inactif',
    error: 'Erreur de microphone'
  },

  // Indicador TTS (lectura)
  tts: {
    procesando: 'Préparation...',
    traduciendo: 'Traduction...',
    lectura: 'Lecture...',
    narracion: 'Narration de la page...'
  },

   // Notificaciones
    notificacion: {
      lecturaDetenida: 'Lecture arrêtée',
      dictamenDetenido: 'Dictée arrêtée',
      errorContenido: 'Le contenu principal de cette page n\'a pas pu être détecté.'
    },

   // Lecteur PDF
   pdfReader: {
     titulo: 'Lecteur PDF - ZenithNexus',
     paginaDe: 'Page {{actual}} sur {{total}}',
     play: 'Lire',
     stop: 'Arrêter',
     next: 'Suivant',
     prev: 'Précédent',
     irAPagina: 'Aller à la page',
     cargando: 'Chargement...',
     precargando: 'Préchargement de la page {{pagina}}...',
     leyendo: 'Lecture de la page {{pagina}}...',
     pausado: 'En pause',
     detenido: 'Arrêté',
     completado: 'Lecture terminée',
     reanudar: 'Reprendre à la page {{pagina}}',
     empezarDesdeInicio: 'Commencer au début',
     ultimaLeida: 'Dernière lecture : page {{pagina}}',
     progreso: 'Progrès : {{porcentaje}}%',
     errorPagina: 'Erreur lors du chargement de la page {{pagina}}',
      errorPDF: 'Erreur lors du traitement du PDF',
      texto: 'Texte',
      tablaContenido: 'Table des matières',
      marcadores: 'Signets',
      velocidadLenta: 'Lente',
      velocidadNormal: 'Normale',
      velocidadRapida: 'Rapide',
      ocultarToolbar: 'Masquer les outils',
      ocultarCompletamente: 'Masquer complètement',
      dictar: 'Dicter',
      resaltar: 'Surligner',
      configuracion: 'Config'
    },

    // Conseils pour documents
    documentTip: {
      googleDocs: '{{titulo}} · Lire avec {{leer_hotkey}} · Dictée avec {{microfono_hotkey}}',
      pdf: 'PDF détecté · Préparation des outils...'
    },

    // Toolbar - commandes de narration visuelle
    visualControls: {
      toggleSubs: 'Activer/désactiver les sous-titres',
      toggleHighlight: 'Activer/désactiver le surlignage du texte'
    },

    terminosPopup: {
      funcLectura: 'la lecture à voix haute',
      funcMicrofono: 'le microphone',
      funcEscritura: 'l\'écriture automatique',
      funcNarrador: 'le narrateur de pages',
      btnAceptarContinuar: 'Accepter et Continuer',
      cuerpoAntesFunc: 'Pour utiliser',
      cuerpoDespuesFunc: 'vous devez accepter les conditions d\'utilisation de ZenithNexus.',
    },

    // Ventana Picture-in-Picture (PiP)
    pip: {
      reading: 'Lecture',
      recording: 'Dictée',
      ready: 'Prêt',
      progress: 'Progression',
      listening: 'Écoute...',
      listeningPlaceholder: 'Le texte dicté apparaîtra ici...',
      copy: 'Copier',
      clear: 'Effacer',
      stopMic: 'Désactiver le microphone',
      startMic: 'Activer le microphone',
      pause: 'Pause',
      play: 'Lire',
      stop: 'Tout arrêter',
      speed: 'Vitesse :',
      trial: 'Essai'
    }
};
