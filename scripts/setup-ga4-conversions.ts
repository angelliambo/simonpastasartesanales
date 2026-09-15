import path from 'path';
import fs from 'fs';
import { google } from 'googleapis';

async function setupGA4Conversions() {
  const credsPath = path.join(process.cwd(), 'credentials', 'gcp-service-account.json');
  if (fs.existsSync(credsPath)) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = credsPath;
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: credsPath,
    scopes: ['https://www.googleapis.com/auth/analytics.edit', 'https://www.googleapis.com/auth/analytics.readonly'],
  });

  const analyticsadmin = google.analyticsadmin({ version: 'v1beta', auth });
  const rawPropertyId = process?.env?.GA4_PROPERTY_ID;
  const propertyParent = rawPropertyId ? (rawPropertyId.startsWith('properties/') ? rawPropertyId : `properties/${rawPropertyId}`) : '';

  console.log(`\n======================================================`);
  console.log(`🚀 CONFIGURANDO EVENTOS CLAVE Y CONVERSIONES EN GA4`);
  console.log(`======================================================`);
  console.log(`• Propiedad GA4: ${propertyParent}`);

  // Eventos estratégicos de conversión para el embudo de ventas
  const keyEventsToCreate = [
    { eventName: 'click_cta_install', description: 'Clic en Botón de Instalación' },
    { eventName: 'welcome_funnel_view', description: 'Bienvenida / Apertura de Extensión' },
    { eventName: 'plan_upgrade_click', description: 'Clic en Pasarela de Pago PRO / Upgrade' },
    { eventName: 'tts_play', description: 'Uso Activo de Lectura de PDF (TTS)' },
    { eventName: 'dictation_start', description: 'Uso Activo de Dictado por Voz (STT)' },
  ];

  try {
    // 1. Listar Key Events existentes
    console.log(`⏳ Consultando eventos clave existentes en la propiedad GA4...`);
    const existingRes = await analyticsadmin.properties.keyEvents.list({
      parent: propertyParent,
    });

    const existingNames = new Set((existingRes.data.keyEvents || []).map(k => k.eventName));
    console.log(`📌 Eventos clave ya registrados:`, Array.from(existingNames));

    // 2. Crear los eventos clave faltantes
    for (const item of keyEventsToCreate) {
      if (existingNames.has(item.eventName)) {
        console.log(`✅ Evento clave "${item.eventName}" ya existe en GA4.`);
      } else {
        try {
          console.log(`➕ Registrando evento clave de conversión: "${item.eventName}"...`);
          await analyticsadmin.properties.keyEvents.create({
            parent: propertyParent,
            requestBody: {
              eventName: item.eventName,
            },
          });
          console.log(`🎉 ¡Evento clave "${item.eventName}" creado exitosamente en GA4!`);
        } catch (cErr: any) {
          console.warn(`⚠️ No se pudo crear "${item.eventName}": ${cErr?.message || cErr}`);
        }
      }
    }
  } catch (err: any) {
    console.error(`❌ Error al conectar con GA4 Admin API: ${err?.message || err}`);
  }
}

setupGA4Conversions();
