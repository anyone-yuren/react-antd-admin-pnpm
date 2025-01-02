// eslint-disable-next-line import/no-extraneous-dependencies
import ReactECharts from 'echarts-for-react';

export interface ChartsProp {
  option: any;
  height?: number;
  click?: (params: any) => void;
  ref?: any;
}

const BaseCharts = (prop: ChartsProp) => (
  <ReactECharts
    onChartReady={(chart: any) => {
      prop.ref && prop.ref(chart);
    }}
    opts={{ renderer: 'svg' }}
    style={{ height: prop.height || '300px' }}
    onEvents={{
      click: (params: any) => {
        prop.click && prop.click(params);
      },
    }}
    option={prop.option}
  />
);

export default BaseCharts;
