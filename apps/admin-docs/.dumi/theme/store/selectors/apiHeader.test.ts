import type { SiteStore } from '..';
import { apiHeaderSel } from './apiHeader';

describe('apiHeaderSel', () => {
  test('有 siteData，但没有 themeConfig.apiHeader 的情况', () => {
    const s = {
      siteData: {},
    } as unknown as SiteStore;
    const result = apiHeaderSel(s);
    expect(result).toEqual({
      title: undefined,
      description: undefined,
      pkg: undefined,
      defaultImport: false,
      componentName: undefined,
      sourceUrl: undefined,
      docUrl: undefined,
    });
  });

  test('有 siteData 和 themeConfig.apiHeader，但没有 fm.apiHeader 的情况', () => {
    const s = {
      siteData: {
        themeConfig: {
          apiHeader: {},
        },
      },
      routeMeta: {
        frontmatter: {},
      },
      locale: {
        id: 'zh-CN',
      },
    } as unknown as SiteStore;
    const result = apiHeaderSel(s);
    expect(result).toEqual({
      title: undefined,
      description: undefined,
      pkg: undefined,
      defaultImport: false,
      componentName: undefined,
      sourceUrl: undefined,
      docUrl: undefined,
    });
  });

  test('有 siteData、themeConfig.apiHeader 和 fm.apiHeader，但其中某些值为空的情况', () => {
    const s = {
      siteData: {
        pkg: {
          name: 'vuepress',
        },
        themeConfig: {
          apiHeader: {
            pkg: 'test-pkg',
            sourceUrl: '{github}/blob/main/{locale}/{title}.vue',
            docUrl: '{github}/blob/main/{locale}/docs/{atomId}.md',
          },
        },
      },
      routeMeta: {
        frontmatter: {
          title: 'test-title',
          description: 'test-description',
          atomId: 'test-atomId',
          apiHeader: {
            defaultImport: true,
          },
        },
      },
      locale: {
        id: 'zh-CN',
      },
    } as unknown as SiteStore;
    const result = apiHeaderSel(s);
    expect(result).toEqual({
      title: 'test-title',
      description: 'test-description',
      pkg: 'test-pkg',
      defaultImport: true,
      componentName: 'test-atomId',
    });
  });

  test('有 siteData、themeConfig.apiHeader 和 fm.apiHeader，且所有值都存在的情况', () => {
    const s = {
      siteData: {
        pkg: {
          name: 'vuepress',
        },
        themeConfig: {
          apiHeader: {
            pkg: 'test-pkg',
            sourceUrl: '{github}/blob/main/{locale}/{title}.vue',
            docUrl: '{github}/blob/main/{locale}/docs/{atomId}.md',
          },
        },
      },
      routeMeta: {
        frontmatter: {
          title: 'test-title',
          description: 'test-description',
          atomId: 'test-atomId',
          apiHeader: {
            pkg: 'test-fm-pkg',
            defaultImport: true,
            sourceUrl: '{github}/blob/main/{locale}/{title}.ts',
            docUrl: '{github}/blob/main/{locale}/docs/{atomId}.md',
          },
        },
      },
      locale: {
        id: 'zh-CN',
      },
    } as unknown as SiteStore;
    const result = apiHeaderSel(s);
    expect(result).toEqual({
      title: 'test-title',
      description: 'test-description',
      pkg: 'test-fm-pkg',
      defaultImport: true,
      componentName: 'test-atomId',
    });
  });

  test('atomId插值', () => {
    const docUrl = (atomId: string, caseStyle: 'camel' | 'kebab' | 'snake' | 'pascal') => {
      return apiHeaderSel({
        siteData: {
          pkg: {
            name: 'vuepress',
          },
          themeConfig: {
            github: 'https://github.com',
            apiHeader: {
              pkg: 'test-pkg',
              sourceUrl: '{github}/blob/main/{locale}/{title}.vue',
              docUrl: '{github}/{locale}/{atomId}.md',
            },
          },
        },
        routeMeta: {
          frontmatter: {
            title: 'test-title',
            description: 'test-description',
            atomId,
            apiHeader: {
              pkg: 'test-fm-pkg',
              defaultImport: true,
              sourceUrl: '{github}/blob/main/{locale}/{title}.ts',
              docUrl: `{github}/{locale}/{atomId.${caseStyle}}.md`,
            },
          },
        },
        locale: {
          id: 'zh-CN',
        },
      } as unknown as SiteStore).docUrl;
    };

    const camel = 'testAtomId';
    expect(docUrl(camel, 'camel')).toEqual('https://github.com/zh-CN/testAtomId.md');
    expect(docUrl(camel, 'kebab')).toEqual('https://github.com/zh-CN/test-atom-id.md');
    expect(docUrl(camel, 'snake')).toEqual('https://github.com/zh-CN/test_atom_id.md');
    expect(docUrl(camel, 'pascal')).toEqual('https://github.com/zh-CN/TestAtomId.md');

    const kebab = 'test-atomId';
    expect(docUrl(kebab, 'camel')).toEqual('https://github.com/zh-CN/testAtomId.md');
    expect(docUrl(kebab, 'kebab')).toEqual('https://github.com/zh-CN/test-atom-id.md');
    expect(docUrl(kebab, 'snake')).toEqual('https://github.com/zh-CN/test_atom_id.md');
    expect(docUrl(kebab, 'pascal')).toEqual('https://github.com/zh-CN/TestAtomId.md');

    const snake = 'test_atom_id';
    expect(docUrl(snake, 'camel')).toEqual('https://github.com/zh-CN/testAtomId.md');
    expect(docUrl(snake, 'kebab')).toEqual('https://github.com/zh-CN/test-atom-id.md');
    expect(docUrl(snake, 'snake')).toEqual('https://github.com/zh-CN/test_atom_id.md');
    expect(docUrl(snake, 'pascal')).toEqual('https://github.com/zh-CN/TestAtomId.md');

    const pascal = 'TestAtomId';
    expect(docUrl(pascal, 'camel')).toEqual('https://github.com/zh-CN/testAtomId.md');
    expect(docUrl(pascal, 'kebab')).toEqual('https://github.com/zh-CN/test-atom-id.md');
    expect(docUrl(pascal, 'snake')).toEqual('https://github.com/zh-CN/test_atom_id.md');
    expect(docUrl(pascal, 'pascal')).toEqual('https://github.com/zh-CN/TestAtomId.md');

    expect(docUrl(pascal, '123' as any)).toEqual('https://github.com/zh-CN/TestAtomId.md');
  });
});
