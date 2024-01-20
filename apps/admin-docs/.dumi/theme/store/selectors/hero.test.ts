import { SiteStore } from '../useSiteStore';
import { localeValueSel } from './hero';

describe('localeValueSel', () => {
  const s = {
    locale: {
      id: 'en',
      name: 'English',
    },
    // Add other required properties for the test cases
  } as SiteStore;

  it('should return undefined when value is falsy', () => {
    const value = null;

    const result = localeValueSel(s, value);

    expect(result).toBeUndefined();
  });

  it('should return value[s.locale.id] when it exists', () => {
    const value = {
      en: 'English value',
      es: 'Spanish value',
    };

    const result = localeValueSel(s, value);

    expect(result).toBe('English value');
  });

  it('should return value when value[s.locale.id] does not exist', () => {
    const value = 'Default value';

    const result = localeValueSel(s, value);

    expect(result).toBe(value);
  });

  it('should return value[s.locale.id] for different locale.id values', () => {
    const value = {
      en: 'English value',
      es: 'Spanish value',
    };

    const localeIds = ['en', 'es'];

    localeIds.forEach((localeId) => {
      const sWithLocaleId = {
        ...s,
        locale: {
          ...s.locale,
          id: localeId,
        },
      };

      const result = localeValueSel(sWithLocaleId, value);

      // @ts-ignore
      expect(result).toBe(value[localeId]);
    });
  });

  it('should return the correct value for different types of value', () => {
    const values = ['String value', 123, [1, 2, 3], { key: 'value' }];

    values.forEach((value) => {
      const result = localeValueSel(s, value);

      expect(result).toBe(value);
    });
  });

  it('should return value when s.locale.id is falsy', () => {
    const value = {
      en: 'English value',
      es: 'Spanish value',
    };

    const sWithFalsyLocaleId = {
      ...s,
      locale: {
        ...s.locale,
        id: null,
      },
    } as unknown as SiteStore;

    const result = localeValueSel(sWithFalsyLocaleId, value);

    expect(result).toBe(value);
  });

  it('should return value when s.locale.id is a string', () => {
    const value = {
      en: 'English value',
      es: 'Spanish value',
    };

    const sWithStringLocaleId = {
      ...s,
      locale: {
        ...s.locale,
        id: 'en',
      },
    };

    const result = localeValueSel(sWithStringLocaleId, value);

    expect(result).toBe(value.en);
  });

  it('should return value when s.locale.id is a number', () => {
    const value = {
      1: 'One value',
      2: 'Two value',
    };

    const sWithNumberLocaleId = {
      ...s,
      locale: {
        ...s.locale,
        id: 1,
      },
    } as unknown as SiteStore;

    const result = localeValueSel(sWithNumberLocaleId, value);

    expect(result).toBe(value[1]);
  });

  it('should return value when s.locale.id does not exist in value object', () => {
    const value = {
      en: 'English value',
      es: 'Spanish value',
    };

    const sWithInvalidLocaleId = {
      ...s,
      locale: {
        ...s.locale,
        id: 'fr',
      },
    };

    const result = localeValueSel(sWithInvalidLocaleId, value);

    expect(result).toBe(value);
  });
});
