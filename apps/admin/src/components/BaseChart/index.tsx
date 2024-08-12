// eslint-disable-next-line import/no-extraneous-dependencies
import ReactECharts from 'echarts-for-react';

export interface ChartsProp {
  option: any;
  height?: number;
}

const BaseCharts = (prop: ChartsProp) => (
  <ReactECharts opts={{ renderer: 'svg' }} style={{ height: prop.height || '300px' }} option={prop.option} />
);

export default BaseCharts;
