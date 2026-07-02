/**
 * Textos para el content script (popups e indicadores dinámicos)
 * @type {object}
 */
export const content = {
  // Popup de idioma detectado
  idioma: {
    titulo: '{{nombreSitio}}',
    mensaje: 'Esta página está en {{idioma}}. ¿Querés que {{nombreSitio}} lea en ese idioma?',
    btnUnaVez: 'Solo esta vez',
    btnSiempre: 'Sí, siempre para cualquier sitio',
    btnSitio: 'Sí, solo este sitio',
    btnNunca: 'No molestar nunca más'
  },

  // Popup de idioma incompatible (advertencia)
  idiomaIncompatible: {
    titulo: 'Idioma no soportado',
    mensaje: 'Esta página está en {{idioma}}. {{nombreSitio}} no soporta completamente este idioma. La experiencia puede no ser óptima.',
    btnAuto: 'Activar reconocimiento automático',
    btnConfig: 'Cambiar en configuración',
    btnIgnorar: 'Ignorar'
  },

  // Premium feature lock
  featureLocked: 'Función premium',
  upgradeMessage: 'Esta función requiere un plan premium.',

  // Popup de idioma compatible (ofrecimiento)
  idiomaCompatible: {
    titulo: 'Idioma detectado',
    mensaje: 'Esta página está en {{idioma}}. ¿Querés adaptar {{nombreSitio}} para mejor experiencia?',
    btnCambiar: 'Cambiar idioma',
    btnAuto: 'Activar reconocimiento automático',
    btnMantener: 'Mantener actual'
  },

  // Confirmación de idioma
  idiomaConfirm: {
    titulo: 'Idioma detectado'
  },

  // Banner de permisos
  permisos: {
    titulo: 'Permiso de micrófono',
    mensaje: '{{nombreSitio}} necesita permiso para usar el micrófono.',
    btnActivar: 'Activar ahora',
    btnActivarMicrofono: 'Activar Micrófono',
    btnMasTarde: 'Más tarde'
  },

  // Indicador STT (dictado)
  stt: {
    escuchando: 'Dictando...',
    listening: 'Escuchando...',
    waiting: 'En espera...',
    dormant: 'Inactivo',
    error: 'Error de micrófono'
  },

  // Indicador TTS (lectura)
  tts: {
    procesando: 'Preparando...',
    traduciendo: 'Traduciendo...',
    lectura: 'Leyendo...',
    narracion: 'Narrando página...'
  },

  // Notificaciones
  notificacion: {
    lecturaDetenida: 'Lectura detenida',
    dictamenDetenido: 'Dictado detenido',
    errorContenido: 'No se pudo detectar el contenido principal de esta página.'
  },

  // Tips para documentos
  documentTip: {
    googleDocs: '{{titulo}} · Lee con {{leer_hotkey}} · Dicta con {{microfono_hotkey}}',
    pdf: 'PDF detectado · Preparando herramientas...'
  },

  // Toolbar - controles de narración visual
  visualControls: {
    toggleSubs: 'Activar/desactivar subtítulos',
    toggleHighlight: 'Activar/desactivar resaltado de texto'
  },

  // Lector de PDF
  pdfReader: {
    titulo: 'Lector PDF - {{nombreSitio}}',
    paginaDe: 'Página {{actual}} de {{total}}',
    play: 'Reproducir',
    stop: 'Detener',
    next: 'Siguiente',
    prev: 'Anterior',
    irAPagina: 'Ir a página',
    cargando: 'Cargando...',
    precargando: 'Precargando página {{pagina}}...',
    leyendo: 'Leyendo página {{pagina}}...',
    pausado: 'Pausado',
    detenido: 'Detenido',
    completado: 'Lectura completada',
    reanudar: 'Reanudar desde página {{pagina}}',
    empezarDesdeInicio: 'Empezar desde el inicio',
    ultimaLeida: 'Última leída: página {{pagina}}',
    progreso: 'Progreso: {{porcentaje}}%',
    errorPagina: 'Error al cargar la página {{pagina}}',
    errorPDF: 'Error al procesar el PDF',
    texto: 'Texto',
    tablaContenido: 'Índice',
    marcadores: 'Marcadores',
    oraciones: 'oraciones',
    velocidad: 'Velocidad',
    agregar: 'Agregar',
    noMarcadores: 'No hay marcadores aún',
    pagina: 'Página',
    eliminarMarcador: 'Eliminar marcador',
    velocidadLenta: 'Lenta',
    velocidadNormal: 'Normal',
    velocidadRapida: 'Rápida',
    ocultarToolbar: 'Ocultar herramientas',
    ocultarCompletamente: 'Ocultar completamente',
    dictar: 'Dictar',
    resaltar: 'Resaltar',
    configuracion: 'Config'
  },

  // Popup de términos bloqueado (para funciones que requieren aceptación)
  terminosPopup: {
    funcLectura: 'la lectura de texto',
    funcMicrofono: 'el micrófono',
    funcEscritura: 'la escritura automática',
    funcNarrador: 'el narrador de páginas',
    btnAceptarContinuar: 'Aceptar y Continuar',
    cuerpoAntesFunc: 'Para usar',
    cuerpoDespuesFunc: 'debes aceptar los términos y condiciones de uso de {{nombreSitio}}.',
  },

  // Estados adicionales
  cargando: 'Cargando...',
  completado: 'Completado',
  detenido: 'Detenido',
  empezarDesdeInicio: 'Empezar desde el inicio',
  errorPagina: 'Error al cargar la página',
  errorPDF: 'Error al procesar el PDF',
  irAPagina: 'Ir a página',
  leyendo: 'Leyendo...',
  next: 'Siguiente',
  paginaDe: 'Página {{actual}} de {{total}}',
  pausado: 'Pausado',
  play: 'Reproducir',
  precargando: 'Precargando...',
  prev: 'Anterior',
  progreso: 'Progreso: {{porcentaje}}%',
  reanudar: 'Reanudar',
  stop: 'Detener',
  titulo: '{{nombreSitio}}',
  ultimaLeida: 'Última leída: página {{pagina}}',

  // Ventana Picture-in-Picture (PiP)
  pip: {
    reading: 'Leyendo',
    recording: 'Dictando',
    ready: 'Listo',
    progress: 'Progreso',
    listening: 'Escuchando...',
    listeningPlaceholder: 'El texto dictado aparecerá aquí...',
    copy: 'Copiar',
    clear: 'Limpiar',
    stopMic: 'Desactivar Micrófono',
    startMic: 'Activar Micrófono',
    pause: 'Pausar',
    play: 'Reproducir',
    stop: 'Detener todo',
    speed: 'Velocidad:',
    tip: '💡 Controla {{nombreSitio}} mientras navegas o trabajas en otras pestañas.',
    trial: 'Prueba'
  }
};

export default {};
