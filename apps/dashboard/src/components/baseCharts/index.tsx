// eslint-disable-next-line import/no-extraneous-dependencies
import ReactECharts from 'echarts-for-react';

export interface ChartsProp {
  option: any;
  style?: any;
}

const BaseCharts = (prop: ChartsProp) => (
  <ReactECharts opts={{ renderer: 'svg' }} style={prop.style || { height: '300px' }} option={prop.option} />
);

export default BaseCharts;
