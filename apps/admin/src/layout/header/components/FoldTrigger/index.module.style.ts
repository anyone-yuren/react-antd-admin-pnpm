import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  'compo_fold-trigger': {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  unfold: {
    svg: { transform: 'scaleX(-1)', transition: 'transform 0.2s' },
  },
}));
export default useStyles;
