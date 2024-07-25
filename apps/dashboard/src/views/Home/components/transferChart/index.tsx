import { map } from 'lodash-es';
import { useEffect, useState } from 'react';

import BaseCharts from '@/components/baseCharts';

// import { transferConfig } from './data';

const TransferChart = (props) => {
  const { data } = props;
  const [transferConfig, setTransferConfig] = useState({});
  useEffect(() => {
    if (!data?.length) return;
    const serviceData = {};
    serviceData.areas = map(data, 'orgName');
    serviceData.jdData = map(data, (item) => {
      return map(item.items, 'materialName');
    });
    serviceData.data = map(data, (item) => {
      return map(item.items, 'cost');
    });

    setTransferConfig(serviceData);
  }, [data]);

  const option = {
    baseOption: {
      backgroundColor: '#012248', // 背景颜色
      timeline: {
        data: transferConfig?.areas,
        axisType: 'category',
        autoPlay: true,
        playInterval: 5500, // 播放速度

        left: '2%',
        right: '2%',
        bottom: '0%',
        width: '96%',
        //  height: null,
        label: {
          normal: {
            textStyle: {
              color: 'red',
            },
          },
          emphasis: {
            textStyle: {
              color: 'red',
            },
          },
        },
        symbolSize: 10,
        lineStyle: {
          color: '#red',
        },
        checkpointStyle: {
          borderColor: '#red',
          borderWidth: 2,
        },
        controlStyle: {
          showNextBtn: true,
          showPrevBtn: true,
          normal: {
            color: '#ff8800',
            borderColor: '#ff8800',
          },
          emphasis: {
            color: 'red',
            borderColor: 'red',
          },
        },
      },
      title: {
        text: '',
        left: '2%',
        bottom: '8%',
        textStyle: {
          fontSize: 30,
          color: 'black', // 标题字体颜色
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      calculable: true,
      grid: {
        left: '15%',
        right: '8%',
        bottom: '12%',
        top: '10%',
        containLabel: true,
      },
      label: {
        normal: {
          textStyle: {
            color: 'red',
          },
        },
      },
      yAxis: [
        {
          nameGap: 50,
          offset: '37',
          type: 'category',
          interval: 50,
          // inverse: ture,//图表倒叙或者正序排版
          data: '',
          nameTextStyle: {
            color: 'red',
          },

          axisLabel: {
            // rotate:45,
            show: false,
            textStyle: {
              fontSize: 32,

              color(params, Index) {
                // 标签国家字体颜色

                // color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);//随机生成颜色

                const colorarrays = [
                  '#6bc0fb',
                  '#7fec9d',
                  '#fedd8b',
                  '#ffa597',
                  '#84e4dd',
                  '#749f83',
                  '#ca8622',
                  '#bda29a',
                  '#a8d8ea',
                  '#aa96da',
                  '#fcbad3',
                  '#ffffd2',
                  '#f38181',
                  '#fce38a',
                  '#eaffd0',
                  '#95e1d3',
                  '#e3fdfd',
                  '#749f83',
                  '#ca8622',
                ];

                // console.log("111", Index, colorarrays[Index],params); //打印序列

                return colorarrays[transferConfig?.jdData[0]?.indexOf(params)];
              },
            }, // rotate:45,
            interval: 50,
          },
          axisLine: {
            lineStyle: {
              color: 'balck', // Y轴颜色
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: 'balck',
            },
          },
        },
      ],
      xAxis: [
        {
          type: 'value',
          name: '',

          splitNumber: 4, // 轴线个数
          nameTextStyle: {
            color: 'balck',
          },
          axisLine: {
            lineStyle: {
              color: '#ffa597', // X轴颜色
            },
          },
          axisLabel: {
            formatter: '{value} ',
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#fedd8b',
            },
          },
        },
      ],
      series: [
        {
          name: '',
          type: 'bar',
          markLine: {
            label: {
              normal: {
                show: false,
              },
            },
            lineStyle: {
              normal: {
                color: 'red',
                width: 3,
              },
            },
          },
          label: {
            normal: {
              show: true,
              position: 'right', // 数值显示在右侧
              formatter: '{c}',
            },
          },
          itemStyle: {
            normal: {
              color(params) {
                // build a color map as your need.
                // color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);//随机生成颜色
                const colorList = [
                  '#6bc0fb',
                  '#7fec9d',
                  '#fedd8b',
                  '#ffa597',
                  '#84e4dd',
                  '#749f83',
                  '#ca8622',
                  '#bda29a',
                  '#a8d8ea',
                  '#aa96da',
                  '#fcbad3',
                  '#ffffd2',
                  '#f38181',
                  '#fce38a',
                  '#eaffd0',
                  '#95e1d3',
                  '#e3fdfd',
                  '#749f83',
                  '#ca8622',
                ];
                return colorList[params.dataIndex];

                // return colorList[transferConfig?.jdData[0]?.indexOf(params.name)];
              },
            },
          },
        },

        {
          name: '',
          type: 'bar',
          markLine: {
            label: {
              normal: {
                show: false,
              },
            },
            lineStyle: {
              normal: {
                color: 'red',
                width: 3,
              },
            },
          },
          barWidth: '50%',
          barGap: '-100%',
          label: {
            normal: {
              show: true,
              fontSize: 14, // 标签国家字体大小
              position: 'left', // 数值显示在右侧
              formatter(p) {
                return p.name;
              },
            },
          },
          itemStyle: {
            normal: {
              color(params) {
                // build a color map as your need.
                // color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);//随机生成颜色
                const colorList = [
                  '#6bc0fb',
                  '#7fec9d',
                  '#fedd8b',
                  '#ffa597',
                  '#84e4dd',
                  '#749f83',
                  '#ca8622',
                  '#bda29a',
                  '#a8d8ea',
                  '#aa96da',
                  '#fcbad3',
                  '#ffffd2',
                  '#f38181',
                  '#fce38a',
                  '#eaffd0',
                  '#95e1d3',
                  '#e3fdfd',
                  '#749f83',
                  '#ca8622',
                ];
                return colorList[params.dataIndex];

                // console.log("111", params.name); //打印序列
                // return colorList[transferConfig?.jdData[0]?.indexOf(params.name)];
              },
            },
          },
        },
      ],

      animationEasingUpdate: 'quinticInOut',
      animationDurationUpdate: 1500, // 动画效果
    },

    options: [] as any,
  };
  // eslint-disable-next-line no-plusplus
  for (let n = 0; n < transferConfig?.areas?.length; n++) {
    const res = [];
    // alert(jdData.length);
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < transferConfig?.data[n]?.length; j++) {
      res.push({
        name: transferConfig?.jdData[n][j],
        value: transferConfig?.data[n][j],
      });
    }

    res
      .sort(function (a, b) {
        return b.value - a.value;
      })
      .slice(0, 6);

    res.sort(function (a, b) {
      return a.value - b.value;
    });

    const res1 = [];
    const res2 = [];
    // console.log(res);
    for (let t = 0; t < res.length; t++) {
      res1[t] = res[t].name;
      res2[t] = res[t].value;
    }

    option.options.push({
      title: {
        text: `${transferConfig?.areas[n]}`,
        top: '2%',
        textStyle: {
          color: '#66FFFF',
        },
      },
      yAxis: {
        data: res1,
      },
      series: [
        {
          data: res2,
        },
        {
          data: res2,
        },
      ],
    });
  }

  console.log(option);

  return <BaseCharts option={option} {...props} />;
};

export default TransferChart;
