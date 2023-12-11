import { AnyKeyProps } from '../types/AnyKeyProps'
import zhCN from './zh_CN'
import enUS from './en_US'
import jaJP from './ja_JP'
import koKr from './ko_KR'

export let activeLang = localStorage.getItem('MULTIWAY_LOCALE') || 'zh_CN'

let langMap: AnyKeyProps = {
  zh_CN: zhCN,
  en_US: enUS,
  ja_JP: jaJP,
  ko_KR: koKr
}

export const isJP = () => {
  return activeLang === 'ja_JP'
}

/** 设置语言 */
export const setLanguage = (lang: string) => {
  activeLang = lang
  localStorage.setItem('MULTIWAY_LOCALE', lang)
}

export default langMap[activeLang]
