import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  layout_feature: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '210px',
    height: '48px',
    '&-main': { display: 'flex', justifyContent: 'right', minWidth: '156px' },
    '&-divider': { height: '50%', margin: '0', borderColor: 'rgba(0, 0, 0, .3)' },
  },
}));
export default useStyles;
