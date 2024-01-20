import type { ColorMapToken } from 'antd/es/theme/interface/maps/colors';

import { NeutralPaletteOptions, SeedColors, TokenType } from './utils/paletteGenerator';

export type TokenRelationship = (type: TokenType) => Partial<Record<keyof ColorMapToken, number>>;

export interface MapTokenAlgorithmParams extends NeutralPaletteOptions {
  relationship?: TokenRelationship;
  seedColors?: Partial<SeedColors>;
  infoColorFollowPrimary?: boolean;
  adjustWarning?: boolean;
  brandColor?: string;
}
