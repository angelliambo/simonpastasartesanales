import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Script de Generación de Feeds RSS 2.0 y Atom 1.0 (ZenithNexus SEO Architecture)
 * Fábrica de Pastas Simón — Bernal & Zona Sur
 */

const PUBLIC_DIR = join(__dirname, '../public');
const DIST_DIR = join(__dirname, '../dist');
const siteUrl = 'https://simonpastasartesanales.com.ar';
const buildDate = new Date().toISOString();
const rfcDate = new Date().toUTCString();

// 1. Generar RSS 2.0 XML
const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fábrica de Pastas Simón — Pastas Artesanales &amp; Venta Mayorista</title>
    <link>${siteUrl}/</link>
    <description>Catálogo oficial, precios actualizados de sorrentinos, ravioles, ñoquis del 29 y distribución mayorista a restaurantes en Bernal, Quilmes y Zona Sur GBA.</description>
    <language>es-ar</language>
    <pubDate>${rfcDate}</pubDate>
    <lastBuildDate>${rfcDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />

    <item>
      <title>Sorrentinos de Jamón y Queso — Caja x 12 unidades ($4800)</title>
      <link>${siteUrl}/productos/</link>
      <guid>${siteUrl}/productos/#sorrentinos-jamon-queso</guid>
      <pubDate>${rfcDate}</pubDate>
      <description><![CDATA[Masa artesanal al huevo rellena con abundante jamón cocido seleccionado y queso mozzarella cremoso. Congelados en origen en caja de presentación.]]></description>
    </item>

    <item>
      <title>Ravioles de Espinaca y Ricota — Caja x 48 unidades ($4500)</title>
      <link>${siteUrl}/productos/</link>
      <guid>${siteUrl}/productos/#ravioles-espinaca-ricota</guid>
      <pubDate>${rfcDate}</pubDate>
      <description><![CDATA[Ravioles caseros de plancha al huevo con relleno suave de espinaca fresca salteada y ricota magra artesanal.]]></description>
    </item>

    <item>
      <title>Ñoquis de Papa Artesanales del 29 — Bolsa x 1 kg ($4200)</title>
      <link>${siteUrl}/productos/</link>
      <guid>${siteUrl}/productos/#noquis-papa-29</guid>
      <pubDate>${rfcDate}</pubDate>
      <description><![CDATA[Ñoquis tradicionales elaborados con puré de papa natural seleccionada y sémola candeal. Suaves y ligeros.]]></description>
    </item>

    <item>
      <title>Tallarines al Huevo Cintas Medianas — Bolsa x 500g ($3200)</title>
      <link>${siteUrl}/productos/</link>
      <guid>${siteUrl}/productos/#tallarines-al-huevo</guid>
      <pubDate>${rfcDate}</pubDate>
      <description><![CDATA[Pastas frescas al huevo amasadas con sémola candeal de trigo. Ideales para acompañar con boloñesa, tuco o cuatro quesos.]]></description>
    </item>

    <item>
      <title>Venta Mayorista de Pastas Congeladas en Caja para Restaurantes</title>
      <link>${siteUrl}/mayorista/</link>
      <guid>${siteUrl}/mayorista/#proveedor-gastronomico</guid>
      <pubDate>${rfcDate}</pubDate>
      <description><![CDATA[Suministro mayorista directo a restaurantes, rotiserías, cantinas y catering en Bernal, Quilmes, Avellaneda y Zona Sur con porciones estandarizadas congeladas a -18°C.]]></description>
    </item>

    <item>
      <title>Lista de Precios Oficial Actualizada — Fábrica Simón</title>
      <link>${siteUrl}/precios/</link>
      <guid>${siteUrl}/precios/#lista-oficial</guid>
      <pubDate>${rfcDate}</pubDate>
      <description><![CDATA[Consulta los precios actualizados de sorrentinos, ravioles, ñoquis y empanadas gourmet con pedidos directos por WhatsApp.]]></description>
    </item>
  </channel>
</rss>`;

// 2. Generar Atom 1.0 XML
const atomXml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Fábrica de Pastas Simón — Feed Atom</title>
  <subtitle>Catálogo oficial y novedades de pastas frescas congeladas en Bernal y Quilmes.</subtitle>
  <link href="${siteUrl}/atom.xml" rel="self"/>
  <link href="${siteUrl}/"/>
  <updated>${buildDate}</updated>
  <id>${siteUrl}/</id>
  <author>
    <name>Fábrica de Pastas Simón</name>
    <email>info@simonpastasartesanales.com.ar</email>
  </author>

  <entry>
    <title>Sorrentinos de Jamón y Queso — Caja x 12 unidades ($4800)</title>
    <link href="${siteUrl}/productos/"/>
    <id>${siteUrl}/productos/#sorrentinos-jamon-queso</id>
    <updated>${buildDate}</updated>
    <summary>Masa artesanal al huevo rellena con abundante jamón cocido seleccionado y queso mozzarella cremoso.</summary>
  </entry>

  <entry>
    <title>Ravioles de Espinaca y Ricota — Caja x 48 unidades ($4500)</title>
    <link href="${siteUrl}/productos/"/>
    <id>${siteUrl}/productos/#ravioles-espinaca-ricota</id>
    <updated>${buildDate}</updated>
    <summary>Ravioles caseros de plancha al huevo con relleno suave de espinaca fresca salteada y ricota magra artesanal.</summary>
  </entry>

  <entry>
    <title>Venta Mayorista de Pastas Congeladas para Restaurantes</title>
    <link href="${siteUrl}/mayorista/"/>
    <id>${siteUrl}/mayorista/#proveedor-gastronomico</id>
    <updated>${buildDate}</updated>
    <summary>Suministro mayorista directo a restaurantes, rotiserías, cantinas y catering en Bernal, Quilmes y Zona Sur.</summary>
  </entry>
</feed>`;



const BUILD_DIR = join(__dirname, '../build');
const TARGET_DIR = existsSync(DIST_DIR) ? DIST_DIR : (existsSync(BUILD_DIR) ? BUILD_DIR : PUBLIC_DIR);

const filesToWrite = [
  { path: join(TARGET_DIR, 'feed.xml'), content: rssXml },
  { path: join(TARGET_DIR, 'rss.xml'), content: rssXml },
  { path: join(TARGET_DIR, 'atom.xml'), content: atomXml },
];

filesToWrite.forEach(f => {
  writeFileSync(f.path, f.content, 'utf8');
  console.log(`✅ [FEEDS] Generado: ${f.path}`);
});

console.log('🎉 [FEEDS] Feeds RSS 2.0 y Atom 1.0 generados exitosamente.');
