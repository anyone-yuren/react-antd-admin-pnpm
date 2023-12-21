import useStyles from './style';

const LoadingPage = () => {
  const { styles } = useStyles();
  return <div className={styles['loading-page']}>Loading...</div>;
};
export default LoadingPage;
