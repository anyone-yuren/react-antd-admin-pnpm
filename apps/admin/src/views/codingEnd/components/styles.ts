import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, isDarkMode }) => {
  console.log(token);

  return {
    driwer: {
      backdropFilter: 'blur(2px) !important',
      backgroundColor: !isDarkMode ? 'rgba(255, 255, 255, 0.9) !important' : 'rgba(0, 0, 0, 0.9) !important',
      backgroundSize: '50% 50% !important',
      backgroundRepeat: 'no-repeat !important',
      backgroundImage: `url(${token.paperCyanImg}), url(${token.paperRedImg}) !important`,
      backgroundPosition: 'right top, left bottom !important',
    },
  };
});

export default useStyles;
