import { useECharts } from '@/hooks/web/useECharts';

import type { EChartsOption } from 'echarts';
import type { FC } from 'react';

interface PropState {
  loading: boolean;
  options: EChartsOption;
  height?: number;
}

const ChartsCard: FC<PropState> = ({ loading, options, height = '100%' }) => {
  const { chartRef } = useECharts(options, loading);

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%',
        height,
      }}
    />
  );
};

export default ChartsCard;
