export type HeroCopyVariant = 'control' | 'concrete';

export const HERO_COPY_FLAG_KEY = 'landing_hero_copy_variant';
const HERO_COPY_VARIANT_STORAGE_KEY = 'stu:hero-copy-variant';

const CONCRETE_VARIANT_VALUES = new Set(['b', 'concrete', 'treatment', 'test', 'variant']);

export const resolveHeroCopyVariant = (flagValue: string | boolean | undefined): HeroCopyVariant => {
  if (flagValue === true) return 'concrete';

  if (typeof flagValue === 'string') {
    const normalized = flagValue.trim().toLowerCase();
    if (CONCRETE_VARIANT_VALUES.has(normalized)) {
      return 'concrete';
    }
  }

  return 'control';
};

export const persistHeroCopyVariant = (variant: HeroCopyVariant) => {
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.setItem(HERO_COPY_VARIANT_STORAGE_KEY, variant);
  } catch {
    // Silently ignore storage failures in restricted browser contexts.
  }
};

export const getPersistedHeroCopyVariant = (): HeroCopyVariant | null => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.sessionStorage.getItem(HERO_COPY_VARIANT_STORAGE_KEY);
    if (stored === 'control' || stored === 'concrete') {
      return stored;
    }
  } catch {
    // Silently ignore storage failures in restricted browser contexts.
  }

  return null;
};
