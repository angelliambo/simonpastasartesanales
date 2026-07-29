import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { resolveTenant } from "../utils/tenantResolver";
import { BRAND_CONFIG } from "@factory/shared/config/brand";

/**
 * Middleware para servir el index.html de React inyectando dinámicamente el SEO y estado de Tenant.
 */
export async function serveReactWithSEO(req: Request, res: Response, next: NextFunction) {
  // Excluir la API y recursos estáticos con extensiones
  if (req.path.startsWith("/api") || req.path.includes(".")) {
    return next();
  }

  const host = req.headers.host || "";
  const hostname = host.split(":")[0].toLowerCase();

  // Si es un health check local a la raíz, dejar pasar
  if (req.path === "/" && (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0")) {
    return next();
  }

  try {
    // Resolver Tenant
    const tenant = await resolveTenant(host);

    // Determinar la ruta al index.html
    let indexPath = "";
    if (process.env.NODE_ENV === "production") {
      indexPath = "/usr/share/nginx/html/index.html";
      if (!fs.existsSync(indexPath)) {
        // Fallback relativo al directorio de ejecución en producción
        indexPath = path.resolve(__dirname, "../../../frontend/build/index.html");
      }
    } else {
      // Desarrollo
      indexPath = path.resolve(__dirname, "../../frontend/build/index.html");
      if (!fs.existsSync(indexPath)) {
        indexPath = path.resolve(__dirname, "../../frontend/public/index.html");
      }
    }

    if (!fs.existsSync(indexPath)) {
      return res.status(500).send("index.html not found. Please build the frontend.");
    }

    let html = fs.readFileSync(indexPath, "utf8");

    // Resolver valores SEO
    const seoTitle = tenant?.seo?.title || BRAND_CONFIG.seoTitle;
    const seoDescription = tenant?.seo?.description || BRAND_CONFIG.seoDescription;
    const seoKeywords = tenant?.seo?.keywords || BRAND_CONFIG.seoKeywords;
    const seoImage = tenant?.seo?.image || BRAND_CONFIG.mapImageUrl; // fallback a la imagen de marca por defecto
    const themeColor = tenant?.theme?.primaryColor || "#1890ff";

    // Reemplazar title y metas. Usar expresiones regulares flexibles que toleren variaciones de tags
    html = html
      // Título
      .replace(/<title>.*?<\/title>/i, `<title>${seoTitle}</title>`)
      // Descripción
      .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${seoDescription}" />`)
      // Keywords
      .replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i, `<meta name="keywords" content="${seoKeywords}" />`)
      // Open Graph
      .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${seoTitle}" />`)
      .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${seoDescription}" />`)
      .replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${seoImage}" />`)
      // Theme Color
      .replace(/<meta\s+name="theme-color"\s+content=".*?"\s*\/?>/i, `<meta name="theme-color" content="${themeColor}" />`);

    // Inyectar el estado inicial en window.__INITIAL_STATE__
    const initialState = {
      tenant: tenant ? {
        id: tenant.id,
        subdomain: tenant.subdomain,
        domain: tenant.domain,
        name: tenant.name,
        theme: tenant.theme,
        features: tenant.features,
      } : null,
      brandDefault: {
        siteName: BRAND_CONFIG.siteName,
        domain: BRAND_CONFIG.domain,
        supportEmail: BRAND_CONFIG.supportEmail,
        theme: {
          primaryColor: "#1890ff",
          secondaryColor: "#52c41a",
          darkMode: false,
        }
      }
    };

    const stateScript = `<script id="initial-state">window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>`;
    
    // Inyectar justo antes del cierre de head
    html = html.replace("</head>", `${stateScript}</head>`);

    // Servir el HTML resultante
    res.setHeader("Content-Type", "text/html");
    return res.send(html);

  } catch (error) {
    console.error("❌ [SEO_MIDDLEWARE] Error serving React SPA with dynamic SEO:", error);
    return res.status(500).send("Internal Server Error");
  }
}
