import { MappingAlgorithm, ThemeConfig, theme } from 'antd';

import { ColorPalettes, genDarkMapTokenAlgorithm } from '../algorithms';

const cyanColors = [
  'rgba(0, 225, 242, 0.12)',
  'rgba(0, 232, 245, 0.22)',
  'rgba(0, 237, 250, 0.32)',
  'rgba(0, 243, 255, 0.42)',
  'rgba(0, 247, 255, 0.53)',
  'rgba(0, 246, 254, 0.65)',
  'rgba(0, 247, 253, 0.77)',
  'rgba(0, 245, 255, 0.75)',
  'rgba(0, 244, 255, 0.73)',
  'rgba(0, 239, 253, 0.72)',
  'rgba(0, 237, 253, 0.7)',
];

const darkMode = genDarkMapTokenAlgorithm();

export const darkColorPalettes: ColorPalettes = darkMode.palettes;

const darkAlgorithm: MappingAlgorithm = (seedToken, mapToken) => ({
  ...theme.darkAlgorithm(seedToken, mapToken),

  ...darkMode.tokens,

  'cyan-1': cyanColors[1],
  'cyan-2': cyanColors[2],
  'cyan-3': cyanColors[3],
  'cyan-4': cyanColors[4],
  'cyan-5': cyanColors[5],
  'cyan-6': cyanColors[6],
  'cyan-7': cyanColors[7],
  'cyan-8': cyanColors[8],
  'cyan-9': cyanColors[9],
  'cyan-10': cyanColors[10],
});

export const darkTheme: ThemeConfig = {
  token: {
    colorTextBase: '#c7ddff',
    colorBgBase: '#050608',

    colorLinkHover: darkColorPalettes.primary[7],
    colorLink: darkColorPalettes.primary[6],
    colorLinkActive: darkColorPalettes.primary[5],
  },
  algorithm: darkAlgorithm,
};
