import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import { AppModeEnum } from '@/enums/appEnum';

// app mode
export const baseAppMode = AppModeEnum.LIGHT;

// app theme color
export const APP_THEME_COLOR_LIST = [
  {
    name: t('薄暮'),
    color: '#00A76F',
  },
  {
    name: t('火山'),
    color: '#ff3030',
  },
  {
    name: t('明青'),
    color: '#078dee',
  },
  {
    name: t('落霞'),
    color: '#fda92d',
  },
  {
    name: t('极客'),
    color: '#2065d1',
  },
  {
    name: t('酱紫'),
    color: '#7635dc',
  },
];
