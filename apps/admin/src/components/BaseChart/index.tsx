// eslint-disable-next-line import/no-extraneous-dependencies
import ReactECharts from 'echarts-for-react';

export interface ChartsProp {
  option: any;
}

const BaseCharts = (prop: ChartsProp) => (
  <ReactECharts opts={{ renderer: 'svg' }} style={{ height: '100px' }} option={prop} />
);

export default BaseCharts;
