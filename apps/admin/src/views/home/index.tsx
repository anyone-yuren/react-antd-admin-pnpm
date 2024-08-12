// eslint-disable-next-line import/no-extraneous-dependencies
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { AnalyzeCard } from './components/AnalyzeCard';
import InlineChart from './components/lineChart';
import useStyles from './index.style';

import type { FC } from 'react';

const HomePage: FC = () => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  return (
    <div className={styles['home-container']}>
      <Row gutter={[16, 16]}>
        <AnalyzeCard />
        {/* <Col span={12}>
          <BarChart />
        </Col>
        <Col span={12}>
          <CategoryChart />
        </Col> */}
        <Col span={24}>
          <InlineChart />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
