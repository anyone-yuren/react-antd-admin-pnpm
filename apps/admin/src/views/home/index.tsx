import { useRequest } from 'ahooks';
import { Col, Row } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { GetSumDatal } from '@/api/summary';

import { AnalyzeCard } from './components/AnalyzeCard';
import InlineChart from './components/lineChart';
import useStyles from './index.style';

const HomePage: any = () => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const { activeOrgCode } = useWarehouseOptions();
  // const { data: sumData, loading: ajaxLoading } = useRequest(() => {
  //   console.log('获取数据的时候的组织', activeOrgCode);
  //   return GetSumDatal({ orgCode: activeOrgCode });
  // });
  const {
    data: sumData,
    loading: ajaxLoading,
    run,
  } = useRequest(GetSumDatal, {
    manual: true,
  });
  useEffect(() => {
    run({ orgCode: activeOrgCode });
  }, [activeOrgCode]);
  return (
    <div className={styles['home-container']}>
      <Row gutter={[16, 16]}>
        <AnalyzeCard sumData={sumData} ajaxLoading={ajaxLoading} />
        {/* <Col span={12}>
          <BarChart />
        </Col>
        <Col span={12}>
          <CategoryChart />
        </Col> */}
        <Col span={24}>
          <InlineChart sumOption={sumData?.resultData?.outboundSummary ?? []} />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
