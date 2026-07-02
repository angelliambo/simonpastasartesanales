import esBase from './es/index';
import enBase from './en/index';

export const locales: Record<string, { pages: Record<string, unknown> }> = {
  'es': { pages: esBase },
  'en': { pages: enBase },
};
