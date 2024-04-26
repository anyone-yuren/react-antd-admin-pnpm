// eslint-disable-next-line import/no-extraneous-dependencies
import { Button, Col, Divider, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { AnimatePanel } from 'ui';

import { AnalyzeCard } from './components/AnalyzeCard';
import BarChart from './components/barChart';
import CategoryChart from './components/categoryChart';
import InlineChart from './components/lineChart';
import useStyles from './index.style';

import type { FC } from 'react';

const { Title, Text } = Typography;
const HomePage: FC = () => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  return (
    <div className={styles['home-container']}>
      <Row gutter={[16, 16]}>
        <AnalyzeCard />
        <Col span={12}>
          <BarChart />
        </Col>
        <Col span={12}>
          <CategoryChart />
        </Col>
        <Col span={24}>
          <InlineChart />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
