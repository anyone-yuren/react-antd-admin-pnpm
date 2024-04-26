import { Card } from 'antd';
import * as echarts from 'echarts/core';

import BaseCharts from '@/components/BaseChart';

export const option = {
  // backgroundColor: '#0c2d55',
  tooltip: {
    trigger: 'axis', // 触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'cross', // 默认为直线，可选为：'line' | 'shadow' | 'cross' , shadow表示阴影，cross为十字准星
    },
    // formatter: function (params) {
    //     //params[0].marker,marker参数为提示语前面的小圆点
    //     return params[0].name +
    //         "<br>" + params[0].marker + "货量" + params[0].value + '吨' +
    //         "<br>" + params[4].marker + "进港装载率" + params[4].value + '%' +
    //         "<br>" + params[5].marker + "出港装载率" + params[5].value + '%'
    // }
  },
  grid: {
    top: '25%',
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
    data: ['矿1', '矿2', '矿3'],
    right: 'center', // 组件离容器左侧的距离，可以是left,center,right，也可以是像素px和百分比10%
    top: '5px',
  },
  animation: true,

  xAxis: [
    {
      type: 'category',
      data: ['2021年1月', '2021年2月', '2021年3月', '2021年4月', '2021年5月', '2021年6月'],
      axisLine: {
        show: true,
        onZero: true,
        symbol: 'none',
        lineStyle: {
          color: '#264981',
        },
      },
      boundaryGap: true,
      axisLabel: {
        textStyle: {
          color: 'rgba(0, 0, 0, 1)',
          fontWeight: 500,
          fontSize: '16',
        },
      },
      axisTick: {
        show: false,
      },
    },
    {
      type: 'category',
      data: ['2021年1月', '2021年2月', '2021年3月', '2021年4月', '2021年5月', '2021年6月'],
      axisLine: {
        show: false,
        onZero: true,
        symbol: 'none',
        lineStyle: {
          color: 'rgb(21,93,174)',
        },
      },
      boundaryGap: false,
      axisLabel: {
        show: false,
        textStyle: {
          color: 'rgba(233, 240, 255, 1)',
          fontWeight: 500,
          fontSize: '16',
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      name: '总量',
      nameTextStyle: {
        color: 'rgb(0, 0, 0)',
        fontSize: 22,
        padding: 10,
      },
      min: 0, // 最小
      max: 350, // 最大
      interval: 50, // 相差
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: 'rgb(21,93,174)',
        },
      },
      axisTick: {
        show: false,
        inside: true,
        length: 7,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgb(21,93,174)',
        },
      },
      // 坐标值标注
      axisLabel: {
        show: true,
        textStyle: {
          color: 'rgba(0,0,0, 1)',
          fontSize: 18,
        },
      },
    },
    {
      name: '单量',
      nameTextStyle: {
        color: 'rgb(0,0,0)',
        fontSize: 22,
        padding: 10,
      },
      min: 0, // 最小
      max: 35, // 最大
      interval: 5, // 相差
      type: 'value',
      splitLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgb(21,93,174)',
        },
      },
      // 坐标值标注
      axisLabel: {
        show: true,
        textStyle: {
          color: 'rgba(0,0,0, 1)',
          fontSize: 18,
        },
        formatter: '{value} ',
      },
    },
  ],
  series: [
    {
      name: '矿1',
      type: 'line',
      showAllSymbol: true, // 显示所有图形。
      yAxisIndex: 1,
      xAxisIndex: 1,
      symbol: 'none', // 标记的图形为实心圆
      symbolSize: 6, // 标记的大小
      z: 150,
      zlevel: 25,
      itemStyle: {
        color: 'rgba(0, 0, 0, 1)',
        borderWidth: '2',
        borderColor: 'rgba(142, 76, 184, 1)',
      },
      lineStyle: {
        color: '#287CE8',
      },
      smooth: true,
      areaStyle: {
        // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              // color: 'rgba(65, 197, 95, 0.4)',
              color: 'rgba(142, 76, 184, 0.4)',
            },
            {
              offset: 0.6,
              // color: 'rgba(65, 197, 95, 0.4)',
              color: 'rgba(142, 76, 184, 0.2)',
            },
            {
              offset: 1,
              // color: 'rgba(255,255,255, 0)',
              color: 'rgba(142, 76, 184, 0)',
            },
          ],
          false,
        ),
      },
      data: [21, 24, 8, 22, 16, 19],
    },
    {
      name: '矿2',
      type: 'line',
      showAllSymbol: true, // 显示所有图形。
      yAxisIndex: 1,
      xAxisIndex: 1,
      symbol: 'none', // 标记的图形为实心圆
      symbolSize: 6, // 标记的大小
      z: 150,
      zlevel: 25,
      itemStyle: {
        color: '#333', // 拐点颜色
        // borderColor: '#fff600',//拐点边框颜色
        // color: 'rgba(0, 0, 0, 1)',
        borderWidth: 2,
        borderColor: 'rgba(27,204,102)',
      },
      lineStyle: {
        color: '#F2C347',
      },
      smooth: true,
      areaStyle: {
        // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: 'rgba(27,204,102,0.4)',
              // color: 'rgba(137,32,200, 0.4)',
            },
            {
              offset: 0.6,
              color: 'rgba(27,204,102,0.2)',
              // color: 'rgba(137,32,200, 0.4)',
            },
            {
              offset: 1,
              // color: 'rgba(137,32,200, 0)',
              color: 'rgba(27,204,102,0)',
            },
          ],
          false,
        ),
      },
      data: [23, 20, 18, 12, 16, 17],
    },
    {
      name: '矿3',
      type: 'line',
      showAllSymbol: true, // 显示所有图形。
      yAxisIndex: 1,
      xAxisIndex: 1,
      symbol: 'none', // 标记的图形为实心圆
      symbolSize: 6, // 标记的大小
      z: 150,
      zlevel: 25,
      itemStyle: {
        color: '#333', // 拐点颜色
        // borderColor: '#fff600',//拐点边框颜色
        // color: 'rgba(0, 0, 0, 1)',
        borderWidth: 2,
        borderColor: 'rgba(127,24,10)',
      },
      lineStyle: {
        color: '#C2A111',
      },
      smooth: true,
      areaStyle: {
        // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: 'rgba(27,204,102,0.4)',
              // color: 'rgba(137,32,200, 0.4)',
            },
            {
              offset: 0.6,
              color: 'rgba(27,204,102,0.2)',
              // color: 'rgba(137,32,200, 0.4)',
            },
            {
              offset: 1,
              // color: 'rgba(137,32,200, 0)',
              color: 'rgba(27,204,102,0)',
            },
          ],
          false,
        ),
      },
      data: [23, 20, 32, 12, 26, 12],
    },
  ],
};

const LineChart = () => {
  return (
    <Card title={'各矿消耗占比'}>
      <BaseCharts option={option} />
    </Card>
  );
};
export default LineChart;
