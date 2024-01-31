import { SiteStore } from '../useSiteStore';

/**
 * 站点标题选择器
 */
export const siteTitleSel = (s: SiteStore) => s.siteData.themeConfig.name;

export const githubSel = (s: SiteStore) =>
  // 优先取 socialLinks 里的 github
  // TODO: 后面的 github 在 1.0 里废弃
  s.siteData.themeConfig?.socialLinks?.github || s.siteData.themeConfig?.github;

export const logoSel = (s: SiteStore): string => {
  const logo = s.siteData.themeConfig.logo;

  if (!logo) return logo || '';

  // 如果是 url 地址，则什么也不处理
  if (logo.startsWith('http')) return logo;

  // TODO: 如果是相对路径，则拼接上 base
  return logo;
};
