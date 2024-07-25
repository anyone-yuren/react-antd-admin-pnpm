import { map } from 'lodash-es';
import { useEffect, useState } from 'react';

import BaseCharts from '@/components/baseCharts';

import { oldConfig } from './data';

const TransferChart = (props) => {
  const { data = [], ...rest } = props;

  const [myData1, setMyData1] = useState(
    map(data, (item) => {
      return {
        name: item.supplierName,
        value: item.orderAmount,
      };
    }),
  );
  useEffect(() => {
    if (data.length) {
      setMyData1(
        map(data, (item) => {
          return {
            name: item.materialName,
            value: item.quantity,
          };
        }),
      );
    }
  }, [data]);

  const listData = myData1.sort((a, b) => {
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
        rotate: 20,
      },
      splitLine: {
        show: false,
      },
      max,
    },
    yAxis: {
      type: 'category',
      offset: 10,
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
          // return `{a${label}|${name}}{b|} {span${label}|}`;
          const formattedName = name.length > 8 ? `${name.slice(0, 8)}\n${name.slice(8)}` : name;
          return `{a${label}|${formattedName}}{b|} {span${label}|}`;
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
              fontSize: 10,
            },
            formatter: (p) => {
              return p.data.value;
            },
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
          show: false,
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
