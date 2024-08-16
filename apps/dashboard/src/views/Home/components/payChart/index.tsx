import { map } from 'lodash-es';
import { useEffect, useState } from 'react';

import BaseCharts from '@/components/baseCharts';

export default function PayChart(props) {
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
            name: item.supplierName,
            // 转换成万
            value: Math.round((item.orderAmount / 10000) * 100) / 100,
            // value:item.orderAmount,
          };
        }),
      );
    }
  }, [data]);
  const colorA = ['#F26C4F', '#F94FFF', '#F5335C', '#FFD200', '#00E1EF'];
  const option = {
    tooltip: {
      show: false,
      confine: true,
      trigger: 'item',
      formatter: '{b} : {c}',
    },
    series: [
      {
        avoidLabelOverlap: false,
        type: 'pie',
        roseType: 'area', // 玫瑰图
        center: ['50%', '50%'],
        radius: ['50%', '80%'],
        color: colorA,
        itemStyle: {
          normal: {
            // borderColor: '#050F20',
            // borderWidth: 3,
          },
        },
        label: {
          normal: {
            // formatter: '{b}\n{d}%\t{c}',
            formatter: '{b|{b}}\n{d|{d}%\t{c}}\t{f|万}',
            rich: {
              icon: {
                fontSize: 12,
              },
              d: {
                fontSize: 10,
                padding: [0, 0, 0, 0],
                color: '#fff',
              },
              b: {
                fontSize: 10,
                padding: [0, 0, 0, 0],
                color: '#fff',
              },
              f: {
                fontSize: 10,
                padding: [0, 0, 0, -3],
                color: 'red',
              },
            },
          },
        },
        labelLine: {
          normal: {
            length: 10,
            length2: 15,
          },
        },
        data: myData1,
      },
    ],
  };

  return <BaseCharts option={option} {...rest} />;
}
