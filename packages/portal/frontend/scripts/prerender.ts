import fs from "fs";
import path from "path";
import { BRAND_CONFIG } from "../../../shared/src/config/brand";

const BUILD_DIR = path.join(__dirname, "../build");
const PUBLIC_DIR = path.join(__dirname, "../public");

interface PrerenderRoute {
  path: string;
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  heading: string;
  subheading: string;
  bodyHtml: string;
}

const LANDING_ROUTES: PrerenderRoute[] = [
  {
    path: "",
    title: `${BRAND_CONFIG.seoTitle}`,
    description: `${BRAND_CONFIG.seoDescription}`,
    keywords: `${BRAND_CONFIG.seoKeywords}`,
    canonicalUrl: `https://${BRAND_CONFIG.domain}`,
    heading: `${BRAND_CONFIG.siteName} — Solución SaaS de Alto Rendimiento`,
    subheading: "Plataforma modular con soporte multi-tenant, autenticación y diseño responsivo.",
    bodyHtml: `
      <section>
        <h1>${BRAND_CONFIG.siteName}</h1>
        <p>${BRAND_CONFIG.seoDescription}</p>
        <ul>
          <li>Panel de control y dashboard administrativo.</li>
          <li>Soporte multi-idioma (i18n) e integración con Google Auth.</li>
          <li>Arquitectura desacoplada y escalable.</li>
        </ul>
      </section>
    `,
  },
  {
    path: "servicios",
    title: `Servicios y Soluciones | ${BRAND_CONFIG.siteName}`,
    description: "Explora todos los módulos y características avanzadas que ofrece nuestra plataforma.",
    keywords: "servicios saas, modulos saas, caracteristicas plataforma, soluciones web",
    canonicalUrl: `https://${BRAND_CONFIG.domain}/servicios`,
    heading: "Nuestros Servicios y Características",
    subheading: "Herramientas diseñadas para potenciar tu productividad y escalabilidad.",
    bodyHtml: `
      <article>
        <h2>Gestión de Usuarios y Roles</h2>
        <p>Autenticación segura mediante JWT, Google OAuth y panel de administración completo.</p>
      </article>
      <article>
        <h2>Diseño Adaptativo y Accesible</h2>
        <p>Sistema de diseño totalmente configurable con soporte para modo oscuro y temas personalizados.</p>
      </article>
    `,
  },
  {
    path: "preguntas-frecuentes",
    title: `Preguntas Frecuentes | ${BRAND_CONFIG.siteName}`,
    description: "Respuestas a las preguntas más habituales sobre nuestra plataforma y servicios.",
    keywords: "preguntas frecuentes, soporte, ayuda saas, FAQ",
    canonicalUrl: `https://${BRAND_CONFIG.domain}/preguntas-frecuentes`,
    heading: "Preguntas Frecuentes",
    subheading: "Resolvemos tus dudas principales de forma clara y rápida.",
    bodyHtml: `
      <dl>
        <dt>¿Cómo inicio sesión en la plataforma?</dt>
        <dd>Puedes acceder utilizando tu correo electrónico o tu cuenta de Google.</dd>
        <dt>¿Tiene soporte multi-idioma?</dt>
        <dd>Sí, la plataforma cuenta con internacionalización (i18n) nativa en varios idiomas.</dd>
      </dl>
    `,
  },
  {
    path: "contacto",
    title: `Contacto | ${BRAND_CONFIG.siteName}`,
    description: `Ponte en contacto con el equipo de ${BRAND_CONFIG.siteName}. Estamos para ayudarte.`,
    keywords: "contacto, soporte email, ayuda, formulario contacto",
    canonicalUrl: `https://${BRAND_CONFIG.domain}/contacto`,
    heading: "Contacto Directo",
    subheading: "Envíanos tu consulta y te responderemos a la brevedad.",
    bodyHtml: `
      <section>
        <h2>Canales de Atención</h2>
        <p><strong>Email:</strong> ${BRAND_CONFIG.supportEmail}</p>
        <p><strong>Dirección:</strong> ${BRAND_CONFIG.address}</p>
      </section>
    `,
  },
  {
    path: "legal/terms",
    title: `Términos y Condiciones | ${BRAND_CONFIG.siteName}`,
    description: "Términos y condiciones de uso de la plataforma.",
    keywords: "terminos y condiciones, legal, contrato de uso",
    canonicalUrl: `https://${BRAND_CONFIG.domain}/legal/terms`,
    heading: "Términos y Condiciones del Servicio",
    subheading: "Condiciones y normas de uso de nuestra plataforma.",
    bodyHtml: `
      <section>
        <h2>Condiciones Generales</h2>
        <p>El uso de este sitio implica la aceptación de todos nuestros términos y condiciones de servicio.</p>
      </section>
    `,
  },
  {
    path: "legal/privacy",
    title: `Política de Privacidad | ${BRAND_CONFIG.siteName}`,
    description: "Política de privacidad y protección de datos personales.",
    keywords: "politica de privacidad, proteccion de datos, legal",
    canonicalUrl: `https://${BRAND_CONFIG.domain}/legal/privacy`,
    heading: "Política de Privacidad",
    subheading: "Compromiso con la seguridad de la información.",
    bodyHtml: `
      <section>
        <h2>Protección de Datos</h2>
        <p>Tus datos personales son procesados con la máxima seguridad y confidencialidad.</p>
      </section>
    `,
  },
];

function generateStructuredData(route: PrerenderRoute) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "WebSite"],
    "name": BRAND_CONFIG.siteName,
    "description": route.description,
    "url": route.canonicalUrl,
    "logo": `https://${BRAND_CONFIG.domain}${BRAND_CONFIG.logoUrl}`,
    "image": `https://${BRAND_CONFIG.domain}/og-image.jpg`,
    "email": BRAND_CONFIG.supportEmail,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BRAND_CONFIG.address,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": BRAND_CONFIG.latitude,
      "longitude": BRAND_CONFIG.longitude,
    },
  };
}

export async function runPrerender() {
  console.log("🚀 [SSG-PRERENDER] Iniciando prerenderizado estático build-time...");

  const baseHtmlPath = fs.existsSync(path.join(BUILD_DIR, "index.html"))
    ? path.join(BUILD_DIR, "index.html")
    : path.join(PUBLIC_DIR, "index.html");

  if (!fs.existsSync(baseHtmlPath)) {
    console.error(`❌ [SSG-PRERENDER] Error: No se encontró index.html base en ${baseHtmlPath}`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, "utf-8");
  const targetBaseDir = fs.existsSync(BUILD_DIR) ? BUILD_DIR : PUBLIC_DIR;

  console.log(`📁 [SSG-PRERENDER] Directorio objetivo: ${targetBaseDir}`);

  for (const route of LANDING_ROUTES) {
    let pageHtml = baseHtml;

    pageHtml = pageHtml
      .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
      .replace(/<meta name="description"\s+content=".*?"\s*\/>/s, `<meta name="description" content="${route.description}" />`)
      .replace(/<meta name="keywords"\s+content=".*?"\s*\/>/s, `<meta name="keywords" content="${route.keywords}" />`)
      .replace(/<link rel="canonical"\s+href=".*?"\s*\/>/s, `<link rel="canonical" href="${route.canonicalUrl}" />`)
      .replace(/<meta property="og:title"\s+content=".*?"\s*\/>/s, `<meta property="og:title" content="${route.title}" />`)
      .replace(/<meta property="og:description"\s+content=".*?"\s*\/>/s, `<meta property="og:description" content="${route.description}" />`)
      .replace(/<meta property="og:url"\s+content=".*?"\s*\/>/s, `<meta property="og:url" content="${route.canonicalUrl}" />`)
      .replace(/<meta property="twitter:title"\s+content=".*?"\s*\/>/s, `<meta property="twitter:title" content="${route.title}" />`)
      .replace(/<meta property="twitter:description"\s+content=".*?"\s*\/>/s, `<meta property="twitter:description" content="${route.description}" />`);

    const jsonLd = JSON.stringify(generateStructuredData(route));
    const jsonLdScript = `<script type="application/ld+json" id="prerendered-jsonld">${jsonLd}</script>`;
    if (pageHtml.includes('id="prerendered-jsonld"')) {
      pageHtml = pageHtml.replace(/<script type="application\/ld\+json" id="prerendered-jsonld">.*?<\/script>/s, jsonLdScript);
    } else {
      pageHtml = pageHtml.replace("</head>", `  ${jsonLdScript}\n</head>`);
    }

    const prerenderedStaticContent = `
      <div id="prerender-static-content" style="padding: 20px; font-family: sans-serif; max-width: 1200px; margin: 0 auto;">
        <h1>${route.heading}</h1>
        <h2>${route.subheading}</h2>
        ${route.bodyHtml}
      </div>
    `;

    const rootStartIndex = pageHtml.indexOf('<div id="root">');
    const bodyEndIndex = pageHtml.indexOf('</body>', rootStartIndex);
    if (rootStartIndex !== -1 && bodyEndIndex !== -1) {
      pageHtml = pageHtml.substring(0, rootStartIndex) + `<div id="root">\n${prerenderedStaticContent}\n  </div>\n` + pageHtml.substring(bodyEndIndex);
    } else {
      pageHtml = pageHtml.replace(
        /<div id="root">[\s\S]*?<\/div>\s*<\/body>/s,
        `<div id="root">${prerenderedStaticContent}</div>\n</body>`
      );
    }

    const outDir = route.path === ""
      ? targetBaseDir
      : path.join(targetBaseDir, route.path);

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const outFile = path.join(outDir, "index.html");
    fs.writeFileSync(outFile, pageHtml, "utf-8");
    console.log(`  ✅ Landing Prerenderizada: /${route.path} -> ${path.relative(process.cwd(), outFile)}`);
  }

  console.log("🎉 [SSG-PRERENDER] Prerenderizado estático completado exitosamente.\n");
}

if (require.main === module) {
  runPrerender().catch((err) => {
    console.error("❌ [SSG-PRERENDER] Error durante la ejecución del prerenderizado:", err);
    process.exit(1);
  });
}
