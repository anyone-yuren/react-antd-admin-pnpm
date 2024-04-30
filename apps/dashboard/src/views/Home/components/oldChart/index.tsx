import BaseCharts from '@/components/baseCharts';

import { oldConfig } from './data';

const TransferChart = (props) => {
  const listData = oldConfig.sort((a, b) => {
    return a.value - b.value;
  });

  const max = Math.max(...listData.map((r) => r.value));
  const spanColors = ['#13B5B1', '#FFF100', '#0195C2', '#00FFC0'];
  const spanStyles = {};

  for (let i = 0; i < spanColors.length; i += 1) {
    const label = `0${i}`;
    spanStyles[`span${label}`] = {
      width: 10,
      height: 10,
      borderRadius: 5,
      shadowColor: spanColors[i],
      shadowBlur: 10,
      backgroundColor: spanColors[i],
    };
    if (i > 0) {
      spanStyles[`a0${label}`] = {
        color: spanColors[i],
      };
    }
  }
  const option = {
    backgroundColor: '#041921',
    tooltip: {
      show: false,
    },
    grid: {
      top: '1%',
      left: '10%',
      right: '10%',
      bottom: '1%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff',
      },
      splitLine: {
        show: false,
      },
      max,
    },
    yAxis: {
      type: 'category',
      offset: 20,
      axisLabel: {
        margin: -10,
        padding: [0, 5, 0, 0],
        color: '#fff',
        formatter: (name, index) => {
          const obj = {
            0: '01',
            1: '02',
            2: '03',
          };
          const label = obj[10 - index] || '00';
          return `{a${label}|${name}}{b|} {span${label}|}`;
        },
        rich: {
          b: {
            width: 5,
          },
          ...spanStyles,
        },
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: 'rgba(21, 200, 221,0.2)',
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: listData.map((r) => r.name),
    },
    series: [
      {
        name: '交旧率排行',
        type: 'bar',
        barWidth: 14,
        // Y轴数字显示部分
        label: {
          normal: {
            show: true,
            position: 'inside',
            valueAnimation: true,
            offset: [5, -1],
            textStyle: {
              color: '#F5F5F5',
              fontWeight: 'bold',
              fontSize: 12,
            },
            formatter: '40%',
          },
        },
        data: listData.map((r, i) => {
          const itemStyle = {
            borderWidth: 2,
            color: '#13B5B1',
            borderRadius: 8, // 圆角
            borderColor: '#041921',
          };
          if (i >= 8 && i <= 10) {
            const colors = ['#00FFC0', '#0195C2', '#FFF100'];
            itemStyle.color = colors[i - 8];
          }

          return {
            ...r,
            itemStyle,
          };
        }),
        z: 1,
      },
      {
        type: 'bar',
        barGap: '-105%', // 柱形图偏移

        data: listData.map((items, i) => {
          const value = Math.max(...listData.map((item) => item.value));
          const itemStyle = {
            color: 'none',
            borderRadius: 8, // 圆角
            borderColor: '#041921',
          };
          if (i >= 8 && i <= 10) {
            const colors = ['#00FFC0', '#0195C2', '#FFF100'];
            itemStyle.color = colors[i - 8];
          }
          return {
            value,
          };
        }),
        barWidth: 16,
        itemStyle: {
          color: 'none',
          borderRadius: 8, // 圆角
          borderColor: '#13B5B1',
        },
        label: {
          show: true,
          position: 'right',
          color: '#13B5B1',
          fontSize: 12,
          formatter: (params) => {
            const { name } = params;
            const { value } = listData.find((item) => item.name === name);
            return value;
          },
        },
        z: 0,
      },
    ],
  };

  return <BaseCharts option={option} {...props} />;
};

export default TransferChart;
