import { Card } from 'antd';
import * as echarts from 'echarts/core';

import BaseCharts from '@/components/BaseChart';

const option = {
  backgroundColor: '#061740',
  // 你的代码
  tooltip: {
    backgroundColor: 'rgba(13, 64, 71, 0.50)',
    borderColor: 'rgba(143, 225, 252, 0.60)',
    padding: 8,
    textStyle: {
      color: '#fff',
    },
  },
  legend: {
    data: ['计划', '实际', '比例'],
    icon: 'rect',
    itemWidth: 14,
    itemHeight: 14,
    right: 5,
    textStyle: {
      fontSize: 14,
      color: '#FFFFFF',
    },
  },
  xAxis: [
    {
      type: 'category',
      data: ['节点1', '节点2', '节点3', '节点4', '节点5', '节点6', '节点7'],
      axisPointer: {
        type: 'shadow',
      },
      axisLabel: {
        textStyle: {
          color: '#F5F5F5', // 更改坐标轴文字颜色
          fontSize: 12, // 更改坐标轴文字大小
        },
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: '#F5F5F5', // 更改坐标轴文字颜色
          fontSize: 12, // 更改坐标轴文字大小
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#979797',
          type: [5, 10],
        },
      },
    },

    // 折线部分
    {
      type: 'value',
      name: '',
      axisLabel: {
        textStyle: {
          color: '#F5F5F5', // 更改坐标轴文字颜色
          fontSize: 12, // 更改坐标轴文字大小
        },
        formatter: '{value} %',
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '计划',
      type: 'bar',
      itemStyle: {
        opacity: 1, // 这个是 透明度
        color: new echarts.graphic.LinearGradient(
          0,
          1,
          0,
          0,
          [
            {
              offset: 0,
              color: 'rgba(219, 179, 110, 0)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(219, 179, 110, 1)', // 100% 处的颜色
            },
          ],
          false,
        ),
      },
      // 实现数字展示在柱状图
      label: {
        show: true,
        position: 'top',
        fontSize: 12,
        color: '#F5F5F5',
        offset: [0, -10],
        formatter: '{c}', // 添加单位
      },
      data: [180, 170, 110, 370, 37, 260, 420, 420],
    },
    {
      name: '实际',
      type: 'bar',
      itemStyle: {
        // lenged文本
        opacity: 1, // 这个是 透明度
        color: new echarts.graphic.LinearGradient(
          0,
          1,
          0,
          0,
          [
            {
              offset: 0,
              color: 'rgba(51, 204, 204, 0)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(51, 204, 204, 1)', // 100% 处的颜色
            },
          ],
          false,
        ),
      },
      label: {
        show: true,
        position: 'top',
        fontSize: 12,
        color: '#F5F5F5',
        offset: [0, -10],
        formatter: '{c}', // 添加单位
      },
      data: [490, 380, 200, 480, 480, 310, 370, 250],
    },

    // 折线部分
    {
      name: '比例',
      type: 'line',
      yAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: {
        shadowColor: '#fff',
        shadowBlur: 5,
        color: '#1EC5EA',
      },
      label: {
        show: true,
        position: 'top',
        color: '#F5F5F5',
        formatter: '{c} %',
      },
      data: [29, 38, 52, 75, 98, 110, 120],
    },
  ],
};

const CategoryChart = () => {
  return (
    <Card title={'流水分布统计'}>
      <BaseCharts option={option} />
    </Card>
  );
};
export default CategoryChart;
