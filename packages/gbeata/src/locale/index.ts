import { AnyKeyProps } from '../types/AnyKeyProps';
import enUS from './en_US';
import jaJP from './ja_JP';
import koKr from './ko_KR';
import zhCN from './zh_CN';

export let activeLang = localStorage.getItem('MULTIWAY_LOCALE') || 'zh_CN';
// activeLang = JSON.parse(activeLang);

let langMap: AnyKeyProps = {
  zh_CN: zhCN,
  en_US: enUS,
  ja_JP: jaJP,
  ko_KR: koKr,
};

export const isJP = () => {
  return activeLang === 'ja_JP';
};

/** 设置语言 */
export const setLanguage = (lang: string) => {
  activeLang = lang;
  localStorage.setItem('MULTIWAY_LOCALE', lang);
};

const handler: any = {
  get(target: any, prop: any) {
    return target?.[activeLang]
      ? target?.[activeLang]?.[prop]
      : target?.[JSON.parse(activeLang)]?.[prop] || '-';
  },
};

export default new Proxy(langMap, handler);
