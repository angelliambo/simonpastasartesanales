/**
 * Textos para la página de bienvenida (wellcome.html)
 * @type {object}
 */
export const wellcome = {
  titulo: '¡Te damos la bienvenida!',
  descripcion: 'Antes de empezar, necesitamos que aceptes nuestros términos. Es rápido, ¡y después configuramos tu micrófono!',
  yLa: 'y la',

  // Hint de sincronización de idiomas
  idiomaInterfazHint: 'Al cambiar el idioma de la interfaz, también se sincronizarán automáticamente los idiomas de entrada (STT) y salida (TTS).',

  // Términos
  aceptoTerminos: 'Acepto los',
  terminos: 'Términos y Condiciones',
  privacidad: 'Política de Privacidad',
  warningNoAceptas: 'Si no aceptás estos términos, deberás desinstalar la extensión.',
  warningNoAceptasIcon: '⚠️',

  // Botones
  btnAceptarContinuar: 'Aceptar y continuar',
  btnAceptarContinuarIcon: '🚀',
  btnActivarMicrofono: 'Activar Micrófono',
  btnActivarMicrofonoIcon: '🎙️',
  btnCerrarVentana: 'Cerrar ventana',

  // Setup view
  setupTitulo: '¡Vamos a darle superpoderes a tu voz!',
  setupDescripcion: 'Solo necesitamos que habilites el micrófono para que puedas dictar texto en cualquier sitio web. Es rápido y seguro',
  setupPrivacidad: 'Tu privacidad es nuestra prioridad. Solo escuchamos cuando vos lo decidís.',
  setupPrivacidadIcon: '🔒',

  // Success view
  successTitulo: '¡Todo listo! Ya podés disfrutar de {{nombreSitio}}',
  successDescripcion: 'Tu voz ya tiene superpoderes. Podés ver los atajos y más opciones desde',
  successLinkConfig: 'Configuración',
  successBadge: 'Voz activada correctamente',
  successBadgeIcon: '✅',

  // Footer
  footerTerminos: 'Términos y Condiciones',
  footerPrivacidad: 'Política de Privacidad',
  footerContacto: 'Contáctenos',

  // Email manual (fallback si Chrome identity falla)
  emailTitulo: 'Ingresá tu correo',
  emailDescripcion: 'No pudimos obtener tu correo automáticamente. Ingresalo manualmente para crear tu cuenta.',
  emailPlaceholder: 'tu@correo.com',
  emailSaltar: 'Saltar por ahora →'
};

export default {};
