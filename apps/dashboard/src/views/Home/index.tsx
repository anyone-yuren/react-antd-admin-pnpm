import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { button } from '@/assets/motion/index';

import useStyles from './index.style';

const publicPath = import.meta.env.VITE_PUBLIC_PATH;
function Home() {
  const navigate = useNavigate();
  const goAboutPage = () => {
    navigate('/about');
  };
  const { styles } = useStyles();

  return (
    <div className={styles.home}>
      <motion.div initial={{ translateY: -300 }} whileInView={{ translateY: 0 }} transition={{ type: 'spring' }}>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src={`${publicPath}vite.svg`} alt='Vite logo' />
        </a>
      </motion.div>
      <motion.div initial={{ translateY: 300 }} whileInView={{ translateY: 0 }} transition={{ type: 'spring' }}>
        <h1>Vite + React</h1>
        <div className={styles.card}>
          <motion.button {...button} onClick={() => {}}>
            UserStore&apos;s count is
          </motion.button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
        <motion.button {...button} onClick={goAboutPage}>
          click to jump to the about page
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Home;
