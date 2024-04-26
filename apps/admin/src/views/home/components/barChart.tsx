import { Card } from 'antd';
import * as echarts from 'echarts/core';

import BaseCharts from '@/components/BaseChart';

const colorList = ['#FFD076', '#45F4F5', '#07A6FF', '#FFFFFF', '#00C2FF', '#46FFE9', '#A3F9FE', '#0084FF', '#0578B9'];
// 颜色值配置一个空，用于显示间距
const colorList1 = [
  '#ffd076',
  '',
  '#45F4F5',
  '',
  '#07A6FF',
  '',
  '#FFFFFF',
  '',
  '#00C2FF',
  '',
  '#46FFE9',
  '',
  '#A3F9FE',
  '',
  '#0084FF',
  '',
  '#0578B9',
  '',
];
const colorList2 = [
  'rgba(255, 208, 118, 0.4)',
  '',
  'rgba(69, 244, 245, 0.4)',
  '',
  'rgba(7, 166, 255, 0.4)',
  '',
  'rgba(255, 255, 255, 0.4)',
  '',
  'rgba(0, 194, 255, 0.4)',
  '',
  'rgba(163, 249, 254, 0.4)',
  '',
  'rgba(0, 132, 255, 0.4)',
  '',
  'rgba(5, 120, 185, 0.4)',
  '',
];
const data = [
  {
    name: '公共设施',
    value: '3.47',
    percent: '1.16',
  },
  {
    name: '其他',
    value: '32.58',
    percent: '10.89',
  },
  {
    name: '出借',
    value: '6.67',
    percent: '2.23',
  },
  {
    name: '出租',
    value: '23.33',
    percent: '7.8',
  },
  {
    name: '办公',
    value: '185.60',
    percent: '62.05',
  },
  {
    name: '宿舍',
    value: '19.68',
    percent: '6.58',
  },
  {
    name: '闲置',
    value: '27.78',
    percent: '9.29',
  },
];
let sum = 0;
const optionData = [];
data.forEach((item) => {
  sum += Number(item.value);
});
data.forEach((item) => {
  optionData.push({ value: item.value, name: item.name });
  // 配置一个空值
  optionData.push({ name: '', value: sum / 100, itemStyle: { color: 'transparent' } });
});

const option = {
  backgroundColor: '#243c54',
  tooltip: {
    trigger: 'item',
  },
  title: {
    text: sum,
    left: '24%',
    top: '45%',
    itemGap: 10,
    textStyle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 500,
    },
    textAlign: 'center',
    subtext: '数据类型',
    subtextStyle: {
      color: 'rgba(255,255,255,0.5)',
      fontSize: 14,
      fontWeight: 600,
    },
  },

  legend: {
    icon: 'none',
    orient: 'vertical',
    top: 'middle',
    left: 400,
    itemWidth: 12,
    itemHeight: 12,
    // itemStyle: {
    //     color: '#00f'
    // },
    formatter: (name) => {
      const obj = data.find((item) => item.name === name);
      const arr = [`{iconName|}{name|${name}}{value|${obj.value}}{percent|${obj.percent}}{unit|%}`];
      return arr.join('');
    },
    textStyle: {
      color: '#FFF',
      fontSize: 20,
      rich: {
        name: {
          color: '#FFF',
          fontSize: 20,
          width: 100,
          padding: [0, 0, 0, 10],
        },
        value: {
          color: '#2BDFD4',
          fontFamily: 'PangMenZhengDao',
          fontSize: 20,
          width: 100,
          textAlign: 'right',
          padding: [0, 0, 0, 10],
        },
        percent: {
          color: '#2BDFD4',
          fontFamily: 'PangMenZhengDao',
          fontSize: 20,
          padding: [0, 0, 0, 30],
        },
        unit: {
          color: '#ACDCE4',
          fontSize: 18,
          padding: [0, 0, 0, 5],
        },
      },
    },
    data: data.map((dItem, dIndex) => {
      return {
        ...dItem,
        textStyle: {
          rich: {
            iconName: {
              width: 16,
              height: 16,
              borderRadius: 2,
              backgroundColor: colorList[dIndex],
            },
            percent: {
              color: colorList[dIndex],
            },
          },
        },
      };
    }),
  },

  series: [
    {
      // 饼图圈
      type: 'pie',
      zlevel: 3,
      radius: ['25%', '35%'],
      center: ['25%', '50%'],
      itemStyle: {
        normal: {
          //  borderColor: '#0A1934',
          // borderWidth:5,
          color(params) {
            return colorList2[params.dataIndex];
          },
        },
      },
      label: {
        show: false,
      },
      data: optionData,
    },
    {
      // 最外圆圈
      type: 'pie',
      zlevel: 1,
      silent: true, // 取消高亮
      radius: ['38%', '40%'],
      center: ['25%', '50%'],
      itemStyle: {
        normal: {
          //  borderColor: '#0A1934',
          // borderWidth:5,
          color(params) {
            return colorList1[params.dataIndex];
          },
        },
      },
      label: {
        show: false,
      },
      data: optionData,
    },
    {
      type: 'pie',
      radius: ['44%', '44.2%'],
      center: ['25%', '50%'],
      // radius: '90%',
      hoverAnimation: false,
      clockWise: false,

      itemStyle: {
        normal: {
          shadowBlur: 1,
          shadowColor: 'rgba(15, 79, 150,0.61)',
          color: 'rgba(23,138,173,1)',
        },
      },
      label: {
        show: false,
      },
      data: [0],
    },
    {
      type: 'pie',
      radius: ['44%', '44.6%'],
      center: ['25%', '50%'],
      // radius: '90%',
      hoverAnimation: false,
      clockWise: false,
      color: ['#55c2e200', 'rgba(23,138,173,1)', '#ff5a6100', 'ff5a6100'],
      label: {
        show: false,
      },
      data: [140, 60, 240, 130],
      // data: [30,30,30,30,30,30],
    },
  ],
};

const BarChart = () => {
  return (
    <Card title={'消耗物料分布'}>
      <BaseCharts option={option} />
    </Card>
  );
};
export default BarChart;
