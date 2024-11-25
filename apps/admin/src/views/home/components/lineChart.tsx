import { Card } from 'antd';
import * as echarts from 'echarts/core';
import React, { useEffect } from 'react';

import BaseCharts from '@/components/BaseChart';

interface IParams {
  legendAry: any[];
  xAxisAry: any[];
  seriesAry: any[];
  selectedHashMap: Record<string, any>;
}
const convertToWan = (yuan: number) => {
  const num = Number(yuan);
  if (num === 0) return 0;
  if (num < 10000) return num;

  return (num / 10000).toFixed(2);
};
export const getOption = (params: IParams) => {
  const { legendAry, xAxisAry, seriesAry, selectedHashMap } = params;
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      top: '15%',
      left: '2%',
      right: '2%',
      bottom: '12%', // 网格图（柱状图、折线图、气泡图等）离底部的距离，也可以用像素比如10px
      containLabel: true, // grid 区域是否包含坐标轴的刻度标签。false可能溢出，默认为false
    },
    legend: {
      // type: 'scroll',
      icon: 'roundRect',
      selected: selectedHashMap,
      textStyle: {
        // color: '#000',
        fontSize: 12,
        lineHeight: 20,
        rich: {
          a: {
            verticalAlign: 'bottom',
          },
        },
      },
      // itemGap: 20,
      itemWidth: 20,
      // itemHeight: 1,
      // data: legendAry,
      // right: 'left', // 组件离容器左侧的距离，可以是left,center,right，也可以是像素px和百分比10%
      // top: '5px',
    },
    animation: true,

    dataZoom: [
      {
        type: 'slider',
        show: true,
        height: 30,
        xAxisIndex: [0],
        bottom: 10,
        start: 50,
        end: 100,
        handleIcon:
          'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle: {
          color: '#d3dee5',
          pointer: 'cursor',
        },
        textStyle: {
          color: '#fff',
        },
        borderColor: '#90979c',
        brushSelect: false,
      },
      {
        type: 'inside',
        show: true,
        height: 15,
        start: 1,
        end: 35,
      },
    ],
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: xAxisAry,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: seriesAry || [],
  };
};
export const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    top: '2%',
    left: '2%',
    right: '2%',
    bottom: '12%', // 网格图（柱状图、折线图、气泡图等）离底部的距离，也可以用像素比如10px
    containLabel: true, // grid 区域是否包含坐标轴的刻度标签。false可能溢出，默认为false
  },
  legend: {
    textStyle: {
      color: '#000',
      fontSize: 16,
    },
    itemGap: 40,
    itemWidth: 18,
    itemHeight: 5,
    data: ['矿1', '矿2', '矿3', '矿3', '矿3'],
    right: 'center', // 组件离容器左侧的距离，可以是left,center,right，也可以是像素px和百分比10%
    top: '5px',
  },
  animation: true,

  dataZoom: [
    {
      type: 'slider',
      show: true,
      height: 30,
      xAxisIndex: [0],
      bottom: 10,
      start: 10,
      end: 80,
      handleIcon:
        'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      handleSize: '110%',
      handleStyle: {
        color: '#d3dee5',
        pointer: 'cursor',
      },
      textStyle: {
        color: '#fff',
      },
      borderColor: '#90979c',
      brushSelect: false,
    },
    {
      type: 'inside',
      show: true,
      height: 15,
      start: 1,
      end: 35,
    },
  ],
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top',
      },
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

const LineChart = (props: any) => {
  const { sumOption } = props;
  useEffect(() => {
    console.log('[lineChart]: sumOption => ', sumOption);
  }, [sumOption]);

  const echartsOption = React.useMemo(() => {
    const legendAry: any = [];
    const xAxisAry: any = [];
    let seriesAry: any = [];
    const monthHashMap = {};
    const selectedHashMap = {};
    const totalCountAry: any = [];
    sumOption?.orgs?.forEach((item: any) => {
      // eslint-disable-next-line
      item.orgName.indexOf('\r\n') > -1 && (item.orgName = item.orgName.replace('\r\n', ''));
      selectedHashMap[item.orgName] = false;
      let count = 0;
      seriesAry.push({
        name: item.orgName,
        type: 'bar',
        stack: 'Total',
        areaStyle: {},
        barWidth: 40,
        emphasis: {
          focus: 'series',
        },
        smooth: true,
        data: item.items.map((it: any) => {
          !monthHashMap[it.month] ? (monthHashMap[it.month] = it.value) : (monthHashMap[it.month] += it.value);
          count += it.value;
          return convertToWan(it.value);
        }),
      });
      totalCountAry.push({ name: item.orgName, count });
    });
    sumOption?.orgs?.[0]?.items.forEach((item: any) => {
      xAxisAry.push(item.month);
    });
    totalCountAry
      .sort((per: any, next: any) => {
        return next.count - per.count;
      })
      .slice(0, 5)
      .forEach((selectObj: any) => {
        selectedHashMap[selectObj.name] = true;
      });

    if (seriesAry.length) {
      seriesAry = [
        ...seriesAry,
        ...[
          {
            name: '折线图汇总',
            type: 'line',
            data: Object.values(monthHashMap).map((item: any) => convertToWan(item)),
          },
          {
            name: '柱状图汇总',
            type: 'bar',
            barWidth: 40,
            data: Object.values(monthHashMap).map((item: any) => convertToWan(item)),
          },
        ],
      ];
    }

    return { legendAry, xAxisAry, seriesAry, selectedHashMap };
  }, [sumOption]);

  return (
    <Card title={'各矿消耗占比（万）'}>
      <BaseCharts option={getOption(echartsOption)} height={620} />
    </Card>
  );
};
export default LineChart;
