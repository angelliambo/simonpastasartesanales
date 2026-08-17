import { EngagementMetrics } from './types';

/**
 * Módulo de medición de participación e interacción del usuario (Engagement & Lead Conversion Metrics)
 * Fábrica de Pastas Simón
 */

let timeOnPageSeconds = 0;
let maxScrollDepth = 0;
let whatsappClicks = 0;
let catalogInteractions = 0;
let phoneClicks = 0;

let timerInterval: number | null = null;
const scrollMilestonesReached = new Set<number>();

export function initEngagementTracking(onMilestone?: (event: string, data: Record<string, unknown>) => void): void {
  if (typeof window === 'undefined') return;

  // 1. Timer on page
  if (!timerInterval) {
    timerInterval = window.setInterval(() => {
      timeOnPageSeconds += 1;
    }, 1000);
  }

  // 2. Scroll Depth Listener
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    ) - window.innerHeight;

    if (docHeight <= 0) return;

    const currentPercent = Math.min(100, Math.round((scrollTop / docHeight) * 100));
    if (currentPercent > maxScrollDepth) {
      maxScrollDepth = currentPercent;
    }

    [25, 50, 75, 100].forEach((milestone) => {
      if (currentPercent >= milestone && !scrollMilestonesReached.has(milestone)) {
        scrollMilestonesReached.add(milestone);
        if (onMilestone) {
          onMilestone('scroll_depth_milestone', { milestone: `${milestone}%` });
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // 3. Click Listener for WhatsApp / Phone / Catalog CTA
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const link = target.closest('a') as HTMLAnchorElement | null;
    const button = target.closest('button') as HTMLButtonElement | null;

    const href = link?.href || '';
    const text = (link?.textContent || button?.textContent || '').toLowerCase();
    const id = (link?.id || button?.id || '').toLowerCase();

    // Check WhatsApp click
    if (href.includes('wa.me') || href.includes('whatsapp.com') || text.includes('whatsapp') || id.includes('whatsapp')) {
      whatsappClicks += 1;
      if (onMilestone) {
        onMilestone('whatsapp_cta_click', { href, text });
      }
    }

    // Check Phone call click
    if (href.startsWith('tel:') || text.includes('llamar') || text.includes('teléfono')) {
      phoneClicks += 1;
      if (onMilestone) {
        onMilestone('phone_cta_click', { href, text });
      }
    }

    // Check Catalog or Product interaction
    if (
      text.includes('catálogo') ||
      text.includes('ver productos') ||
      text.includes('sorrentinos') ||
      text.includes('ravioles') ||
      text.includes('empanadas') ||
      id.includes('catalog') ||
      id.includes('product')
    ) {
      catalogInteractions += 1;
      if (onMilestone) {
        onMilestone('catalog_interaction', { text });
      }
    }
  };

  document.addEventListener('click', handleClick, { capture: true });
}

export function getEngagementMetrics(): EngagementMetrics {
  return {
    timeOnPageSeconds,
    maxScrollDepth,
    whatsappClicks,
    catalogInteractions,
    phoneClicks
  };
}
