import React, { useState, useEffect } from 'react'
// 引入 ECharts 主模块
import * as echarts from 'echarts/lib/echarts.js'
// 引入折线图
import 'echarts/lib/chart/line'
// 引入pie
import { PieChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([TitleComponent, TooltipComponent, GridComponent, CanvasRenderer, LegendComponent, PieChart])

export default function ZhouDeathSum() {
  const [isFirst, setIsFirst] = useState(true)

  const options = {
    title: {
      text: '1990-2019年各大洲死亡率统计'
    },
    grid: {
      top: '45%',
      bottom: 20,
      left: 100
    },
    legend: {},
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value) => value.toFixed(2) + '%'
    },
    dataset: {
      source: [
        [
          'product',
          '1990',
          '1991',
          '1992',
          '1993',
          '1994',
          '1995',
          '1996',
          '1997',
          '1998',
          '1999',
          '2000',
          '2001',
          '2002',
          '2003',
          '2004',
          '2005',
          '2006',
          '2007',
          '2008',
          '2009',
          '2010',
          '2011',
          '2012',
          '2013',
          '2014',
          '2015',
          '2016',
          '2017',
          '2018',
          '2019'
        ],
        [
          '非洲',
          700.34 / 630.34,
          713.17 / 647.34,
          727.82 / 664.51,
          745.28 / 681.87,
          817.4 / 699.44,
          784.62 / 717.27,
          808.22 / 735.36,
          829.92 / 753.74,
          849.08 / 772.43,
          867.47 / 791.5,
          880.33 / 810.98,
          886.94 / 830.9,
          898.38 / 851.29,
          908.57 / 872.24,
          910.38 / 893.84,
          906.48 / 916.15,
          904.37 / 939.21,
          895.71 / 963.02,
          885.82 / 987.62,
          878.79 / 1013.04,
          869.91 / 1039.3,
          859.32 / 1066.4,
          848.99 / 1094.34,
          843.47 / 1123.04,
          841.59 / 1152.43,
          839.62 / 1182.43,
          836.32 / 1213.04,
          832.53 / 1244.22,
          825.85 / 1275.92,
          824.51 / 1308.06
        ],
        [
          '美洲',
          649.39 / 722.91,
          698.94 / 733.49,
          705.5 / 744.35,
          723.25 / 755.25,
          731.9 / 766.27,
          741.82 / 777.46,
          743.25 / 788.85,
          742.63 / 800.39,
          753.12 / 811.93,
          763.61 / 823.27,
          765.29 / 834.53,
          773.59 / 845.1,
          782.79 / 855.3,
          787.75 / 865.25,
          785.13 / 875.13,
          792.64 / 885.07,
          795.52 / 895.1,
          800.15 / 905.16,
          811.62 / 915.21,
          821.63 / 925.15,
          850.86 / 934.94,
          842.17 / 944.54,
          854.04 / 953.99,
          870.59 / 963.27,
          885.41 / 972.36,
          905.19 / 981.27,
          926.61 / 989.97,
          939.53 / 998.48,
          962.73 / 1006.5,
          986.99 / 1014.71
        ],
        [
          '亚洲',
          2394.43 / 3225.33,
          2422.06 / 3282.16,
          2425.09 / 3336.71,
          2428.63 / 3389.42,
          2427.54 / 3441.07,
          2451.53 / 3441.07,
          2455.38 / 3542.97,
          2482.63 / 3593.14,
          2500.03 / 3642.75,
          2513.55 / 3691.81,
          2536.51 / 3740.32,
          2556.11 / 3788.32,
          2576.41 / 3835.9,
          2578.31 / 3883.14,
          2609.3 / 3930.13,
          2624.03 / 3976.95,
          2628.02 / 4023.63,
          2645.01 / 4070.15,
          2704.93 / 4116.49,
          2694.51 / 4162.61,
          2727.57 / 4208.48,
          2763.42 / 4254.06,
          2783.1 / 4299.32,
          2812.86 / 4344.18,
          2837.66 / 4388.54,
          2863.86 / 4432.31,
          2902.09 / 4475.43,
          2941.68 / 4517.86,
          2993.37 / 4559.47,
          3048.09 / 4600.17
        ],
        [
          '欧洲',
          739.27 / 721.62,
          749.5 / 723.55,
          765.77 / 725.19,
          803.86 / 726.47,
          826.26 / 727.36,
          826.52 / 727.84,
          810.6 / 727.89,
          796.17 / 727.56,
          788.95 / 727.05,
          808.13 / 726.63,
          812.09 / 726.5,
          813.32 / 726.73,
          823.88 / 727.29,
          829.28 / 728.13,
          817.23 / 729.16,
          827.94 / 730.31,
          806.27 / 731.59,
          800.59 / 733.0,
          802.94 / 734.5,
          789.21 / 736.02,
          788.71 / 737.52,
          775.25 / 738.97,
          776.59 / 740.36,
          773.99 / 741.68,
          776.35 / 742.97,
          796.64 / 744.22,
          793.78 / 745.44,
          791.64 / 746.59,
          803.69 / 747.6,
          814.56 / 748.38
        ],
        [
          '大洋洲',
          17.95 / 27.29,
          18.09 / 27.72,
          18.41 / 28.14,
          18.62 / 28.56,
          18.96 / 28.97,
          19.17 / 29.38,
          19.46 / 29.79,
          19.59 / 30.2,
          19.91 / 30.6,
          19.94 / 31.01,
          20.17 / 31.42,
          20.44 / 31.83,
          20.82 / 32.25,
          21.01 / 32.69,
          21.2 / 33.16,
          21.42 / 33.69,
          21.81 / 34.27,
          22.34 / 34.9,
          22.74 / 35.56,
          22.95 / 36.22,
          23.14 / 36.87,
          23.58 / 37.49,
          23.81 / 38.1,
          24.1 / 38.69,
          24.68 / 39.27,
          25.23 / 39.85,
          25.59 / 40.43,
          26.2 / 41.0,
          27.1 / 41.57,
          27.78 / 42.12
        ]
      ]
    },
    xAxis: {
      name: '年份',
      type: 'category'
    },
    yAxis: {
      min: 0.5,
      name: '死亡率',
      gridIndex: 0,
      axisLabel: {
        fontWeight:700,
        formatter: function (n) {
          return n + '%';
        }
      }
    },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: {
          focus: 'series'
        }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: {
          focus: 'series'
        }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: {
          focus: 'series'
        }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: {
          focus: 'series'
        }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: {
          focus: 'series'
        }
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@1990} ({d}%)'
        },
        encode: {
          itemName: 'product',
          value: '1990',
          tooltip: '1990'
        }
      }
    ]
  }

  useEffect(() => {
    let myChart = echarts.init(document.getElementById('container'))

    if (isFirst) {
      myChart.setOption(options)
      setIsFirst(false)
    } else {
      myChart.on('updateAxisPointer', function (event) {
        const xAxisInfo = event.axesInfo[0]
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1
          myChart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          })
        }
      })

      myChart.setOption(options)
    }
  }, [isFirst])

  return <div id="container" style={{ width: 1000, height: 570 }}></div>
}
