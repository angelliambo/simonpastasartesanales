import { TrafficAttribution, TrafficChannel, BotDetectionResult } from './types';

/**
 * Módulo de atribución de fuentes de tráfico, canal de origen y detección de crawlers/bots
 * Fábrica de Pastas Simón
 */

export function parseTrafficAttribution(): TrafficAttribution {
  if (typeof window === 'undefined') {
    return {
      channel: 'Unknown',
      referrer: '',
      landingPath: '/',
      timestamp: Date.now()
    };
  }

  const urlParams = new URLSearchParams(window.location.search);
  const referrer = document.referrer || '';
  const landingPath = window.location.pathname;

  const utmSource = urlParams.get('utm_source') || undefined;
  const utmMedium = urlParams.get('utm_medium') || undefined;
  const utmCampaign = urlParams.get('utm_campaign') || undefined;
  const utmTerm = urlParams.get('utm_term') || undefined;
  const utmContent = urlParams.get('utm_content') || undefined;
  const gclid = urlParams.get('gclid') || undefined;
  const fbclid = urlParams.get('fbclid') || undefined;

  let channel: TrafficChannel = 'Direct';

  if (gclid || (utmMedium && ['cpc', 'ppc', 'paid', 'paidsearch'].includes(utmMedium.toLowerCase()))) {
    channel = 'Paid Search';
  } else if (utmMedium && ['email', 'newsletter'].includes(utmMedium.toLowerCase())) {
    channel = 'Email / Campaign';
  } else if (utmMedium && ['social', 'sm'].includes(utmMedium.toLowerCase())) {
    channel = 'Social Media';
  } else if (utmSource || utmMedium) {
    channel = 'Email / Campaign';
  } else if (referrer) {
    const refLower = referrer.toLowerCase();
    if (
      refLower.includes('google.com') ||
      refLower.includes('bing.com') ||
      refLower.includes('yahoo.com') ||
      refLower.includes('duckduckgo.com') ||
      refLower.includes('ecosia.org')
    ) {
      channel = 'Organic Search';
    } else if (
      refLower.includes('facebook.com') ||
      refLower.includes('instagram.com') ||
      refLower.includes('t.co') ||
      refLower.includes('twitter.com') ||
      refLower.includes('whatsapp.com') ||
      refLower.includes('linkedin.com') ||
      refLower.includes('tiktok.com')
    ) {
      channel = 'Social Media';
    } else {
      channel = 'Referral';
    }
  } else {
    channel = 'Direct';
  }

  return {
    channel,
    referrer,
    landingPath,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    gclid,
    fbclid,
    timestamp: Date.now()
  };
}

export function detectBotOrCrawler(): BotDetectionResult {
  if (typeof navigator === 'undefined') {
    return {
      isBot: false,
      botCategory: 'Human Browser',
      userAgent: ''
    };
  }

  const ua = navigator.userAgent || '';
  const uaLower = ua.toLowerCase();

  // Search Engine Bots
  if (uaLower.includes('googlebot')) {
    return { isBot: true, botCategory: 'Search Engine', botName: 'Googlebot', userAgent: ua };
  }
  if (uaLower.includes('bingbot')) {
    return { isBot: true, botCategory: 'Search Engine', botName: 'Bingbot', userAgent: ua };
  }
  if (uaLower.includes('duckduckbot')) {
    return { isBot: true, botCategory: 'Search Engine', botName: 'DuckDuckBot', userAgent: ua };
  }

  // AI / LLM Crawlers
  if (uaLower.includes('gptbot') || uaLower.includes('chatgpt-user')) {
    return { isBot: true, botCategory: 'AI / LLM Crawler', botName: 'OpenAI GPTBot', userAgent: ua };
  }
  if (uaLower.includes('claudebot') || uaLower.includes('claude-web')) {
    return { isBot: true, botCategory: 'AI / LLM Crawler', botName: 'Anthropic ClaudeBot', userAgent: ua };
  }
  if (uaLower.includes('perplexitybot')) {
    return { isBot: true, botCategory: 'AI / LLM Crawler', botName: 'PerplexityBot', userAgent: ua };
  }
  if (uaLower.includes('applebot-extended') || uaLower.includes('applebot')) {
    return { isBot: true, botCategory: 'AI / LLM Crawler', botName: 'Applebot', userAgent: ua };
  }
  if (uaLower.includes('google-extended')) {
    return { isBot: true, botCategory: 'AI / LLM Crawler', botName: 'Google-Extended', userAgent: ua };
  }
  if (uaLower.includes('meta-externalagent')) {
    return { isBot: true, botCategory: 'AI / LLM Crawler', botName: 'Meta AI Crawler', userAgent: ua };
  }

  // Social Scrapers
  if (uaLower.includes('facebookexternalhit') || uaLower.includes('whatsapp')) {
    return { isBot: true, botCategory: 'Social Scraper', botName: 'Facebook/WhatsApp Link Preview', userAgent: ua };
  }
  if (uaLower.includes('twitterbot')) {
    return { isBot: true, botCategory: 'Social Scraper', botName: 'Twitterbot', userAgent: ua };
  }

  // Generic Bot fallback check
  if (
    uaLower.includes('bot') ||
    uaLower.includes('spider') ||
    uaLower.includes('crawler') ||
    uaLower.includes('headlesschrome') ||
    navigator.webdriver === true
  ) {
    return { isBot: true, botCategory: 'Generic Bot', botName: 'Automated Bot', userAgent: ua };
  }

  return { isBot: false, botCategory: 'Human Browser', userAgent: ua };
}
