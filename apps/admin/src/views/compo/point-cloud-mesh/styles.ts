import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    background: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    overflow: 'hidden',
  },

  canvasContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    canvas: {
      display: 'block',
    },
  },

  controlPanel: {
    width: 320,
    background: token.colorBgElevated,
    borderLeft: `1px solid ${token.colorBorderSecondary}`,
    padding: token.paddingMD,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: token.marginSM,
  },

  statsPanel: {
    position: 'absolute',
    top: token.marginSM,
    left: token.marginSM,
    background: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: `${token.paddingXS}px ${token.paddingSM}px`,
    borderRadius: token.borderRadius,
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 1.6,
    minWidth: 200,
    backdropFilter: 'blur(4px)',
  },

  sliderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: token.marginXS,
    '.ant-slider': {
      flex: 1,
      margin: 0,
    },
    '.ant-input-number': {
      width: 70,
    },
  },

  controlTitle: {
    fontWeight: 600,
    marginBottom: token.marginXS,
    color: token.colorTextHeading,
  },

  buttonGroup: {
    display: 'flex',
    gap: token.marginXS,
    flexWrap: 'wrap',
    marginTop: token.marginXS,
  },

  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    '&.success': {
      color: token.colorSuccess,
    },
    '&.error': {
      color: token.colorError,
    },
    '&.warning': {
      color: token.colorWarning,
    },
  },

  webgpuBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '2px 8px',
    borderRadius: token.borderRadiusSM,
    fontSize: 11,
    fontWeight: 500,
    '&.supported': {
      background: token.colorSuccessBg,
      color: token.colorSuccess,
      border: `1px solid ${token.colorSuccessBorder}`,
    },
    '&.unsupported': {
      background: token.colorErrorBg,
      color: token.colorError,
      border: `1px solid ${token.colorErrorBorder}`,
    },
  },

  divider: {
    height: 1,
    background: token.colorBorderSecondary,
    margin: `${token.marginSM}px 0`,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: token.colorTextSecondary,
    marginBottom: token.marginXS,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  viewToggle: {
    display: 'flex',
    gap: token.marginXS,
    padding: token.paddingXS,
    background: token.colorFillQuaternary,
    borderRadius: token.borderRadius,
    '.ant-btn': {
      flex: 1,
    },
  },
}));
