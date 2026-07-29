import Tenant from "../models/Tenant";
import { memoryCache } from "./cache";

const TENANT_CACHE_TTL = 600; // 10 minutos en caché

export interface ResolvedTenant {
  id: string;
  subdomain: string;
  domain?: string;
  name: string;
  isActive: boolean;
  seo: {
    title: string;
    description: string;
    image?: string;
    keywords?: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor?: string;
    darkMode: boolean;
  };
  features: string[];
}

/**
 * Resuelve el Tenant a partir del header Host
 */
export async function resolveTenant(host: string): Promise<ResolvedTenant | null> {
  if (!host) return null;

  // Limpiar puerto del Host si existe (ej. localhost:5000 -> localhost)
  const hostname = host.split(":")[0].toLowerCase();

  // Comprobar caché primero
  const cacheKey = `tenant:host:${hostname}`;
  const cachedTenant = memoryCache.get<ResolvedTenant>(cacheKey);
  if (cachedTenant) {
    return cachedTenant;
  }

  // Identificar si es un subdominio o dominio propio
  let domainToSearch = hostname;
  let subdomainToSearch = "";

  // Si tiene prefijo www., lo removemos para buscar
  if (domainToSearch.startsWith("www.")) {
    domainToSearch = domainToSearch.substring(4);
  }

  // Ejemplo de desarrollo: *.localhost o *.midominio.com
  const parts = domainToSearch.split(".");
  
  // Si estamos en localhost y hay más de 1 parte (ej: tenant.localhost)
  if (domainToSearch.endsWith("localhost") && parts.length > 1) {
    subdomainToSearch = parts[0];
  } else if (parts.length > 2) {
    // Para entornos productivos con subdominios tipo tenant.factory.com
    subdomainToSearch = parts[0];
  }

  let tenantDoc: any = null;

  // 1. Buscar primero por dominio propio si no estamos en localhost con subdominio
  if (domainToSearch && domainToSearch !== "localhost") {
    tenantDoc = await Tenant.findOne({ domain: domainToSearch, isActive: true }).lean();
  }

  // 2. Si no se encontró por dominio, o si detectamos subdominio, buscar por subdominio
  if (!tenantDoc && subdomainToSearch) {
    tenantDoc = await Tenant.findOne({ subdomain: subdomainToSearch, isActive: true }).lean();
  }

  if (!tenantDoc) {
    return null;
  }

  const resolved: ResolvedTenant = {
    id: tenantDoc._id.toString(),
    subdomain: tenantDoc.subdomain,
    domain: tenantDoc.domain,
    name: tenantDoc.name,
    isActive: tenantDoc.isActive,
    seo: {
      title: tenantDoc.seo?.title || tenantDoc.name,
      description: tenantDoc.seo?.description || "",
      image: tenantDoc.seo?.image,
      keywords: tenantDoc.seo?.keywords,
    },
    theme: {
      primaryColor: tenantDoc.theme?.primaryColor || "#1890ff",
      secondaryColor: tenantDoc.theme?.secondaryColor || "#52c41a",
      darkMode: !!tenantDoc.theme?.darkMode,
    },
    features: tenantDoc.features || [],
  };

  // Guardar en caché
  memoryCache.set(cacheKey, resolved, TENANT_CACHE_TTL);

  return resolved;
}
