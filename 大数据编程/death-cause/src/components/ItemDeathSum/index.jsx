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

export default function ItemDeathSum({id, continent, data}) {
  const [isFirst, setIsFirst] = useState(true)

  const seriesConfig = []
  for(let i = 1; i < data.length; i++) {
    seriesConfig.push (
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: {
          focus: 'series'
        }
      }
    )
  }

  seriesConfig.push(      
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
  )

  const options = {
    title: {
      text: `1990-2019年${continent}部分国家年死亡率`
    },
    grid: {
      top: '45%',
      bottom: 20,
      left: 100
    },
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value) => value.toFixed(2) + '%'
    },
    dataset: {
      source: data
    },
    xAxis: {
      name: '年份',
      type: 'category'
    },
    yAxis: {
      max: 1.8,
      min: 0.2,
      name: '死亡率',
      gridIndex: 0,
      axisLabel: {
        fontWeight:700,
        formatter: function (n) {
          return n + '%';
        }
      }
    },
    series: seriesConfig
  }

  useEffect(() => {
    let myChart = echarts.init(document.getElementById(id))

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

  return (
    <div id={id} style={{ width: 1000, height: 570 }}></div>
  )
}
