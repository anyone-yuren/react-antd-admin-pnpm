import { merge } from 'lodash';
import { genMapTokenAlgorithm } from './default';
import { MapTokenAlgorithmParams, TokenRelationship } from './types';

const darkModeRelationship: TokenRelationship = (type) => {
  const key = type.toUpperCase()[0] + type.slice(1);
  return {
    [`color${key}Bg`]: 1,
    [`color${key}BgHover`]: 2,
    [`color${key}Border`]: 3,
    [`color${key}BorderHover`]: 4,
    [`color${key}Hover`]: 7,
    [`color${key}`]: 6,
    [`color${key}Active`]: 5,
    [`color${key}TextHover`]: 7,
    [`color${key}Text`]: 6,
    [`color${key}TextActive`]: 5,
  };
};

export const genDarkMapTokenAlgorithm = (params?: MapTokenAlgorithmParams) => {
  const defaultConfig = {
    lighter: {
      steps: 4, // 减少较亮颜色的数量
      targetBrightness: 0.7, // 降低最大亮度值
      saturationAdjustment: 0.6, // 减小较亮颜色的饱和度调整
      // saturationScale: 1,
    },
    darker: {
      steps: 6, // 增加较暗颜色的数量
      targetBrightness: 0.2, // 降低最小亮度值
      saturationAdjustment: 0.7,
      hueAdjustment: 0.9, // 保持暗色调的色相调整因子
      saturationScale: 1,
    },
    reverse: true,
    relationship: darkModeRelationship,
  };

  const config = merge({}, defaultConfig, params);

  return genMapTokenAlgorithm(config);
};
