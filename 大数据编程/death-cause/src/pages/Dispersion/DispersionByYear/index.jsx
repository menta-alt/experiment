import React, { useEffect } from 'react'
import { Card } from 'antd'
import * as echarts from 'echarts/lib/echarts.js'
import 'echarts/lib/chart/bar'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, DataZoomComponent, ToolboxComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import './index.less'

// 注册必须的组件
echarts.use([TitleComponent, TooltipComponent, GridComponent, CanvasRenderer, LegendComponent, DataZoomComponent, ToolboxComponent])

export default function DispersionByYear() {
  const colors = ['#002627', '#003939', '#004B4B', '#005858','#005F5F','#006767', '#006A6A', '#006F6F', '#008685','#008E8E', '#009393', '#009393', '#009898','#009898','#00A5A5','#00A5A5','#00A5A5','#00B7B7','#00B7B7','#52BCBA','#52BCBA','#5DCBC9','#5DCBC9','#87E2E4','#87E2E4','#8BE8EA','#8BE8EA','#8CF4F2','#8CF4F2','#A2FCFA','#A2FCFA','#BCFCFC','#BCFCFC']

  const options = {
    title: {
      text: '死亡原因稳定性的离散系数（按年统计）'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true
        }
      }
    },
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: true
        },
        restore: {
          show: true
        }
      }
    },
    calculable: true,
    grid: {
      top: '12%',
      left: 20,
      right: 10,
      containLabel: true
    },
    xAxis: [
      {
        name: '死因',
        type: 'category',
        data: [
          '自然灾害',
          '冲突和恐怖主义',
          '恐怖主义(死亡)',
          '疟疾',
          '被处决的人数(大赦国际)',
          '艾滋病',
          '腹泻疾病',
          '蛋白质能量营养不良',
          '急性肝炎',
          '营养不足',
          '脑膜炎',
          '新生儿疾病',
          '孕产妇疾病',
          '中毒',
          '肺结核',
          '药物滥用(吸毒)',
          '环境热和冷暴露',
          '人际暴力',
          '溺水',
          '火,热和热物质',
          '下呼吸道感染',
          '慢性肾病',
          '阿尔茨海默氏病和其他痴呆症',
          '道路伤害',
          '酒精滥用',
          '帕金森病',
          '糖尿病',
          '慢性呼吸系统疾病',
          '自残',
          '肝硬化及其他慢性肝病',
          '心血管疾病',
          '肿瘤',
          '消化系统疾病'
        ],
        axisTick: {
          length: 1
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '离散系数'
      }
    ],
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 50
      },
      {
        type: 'inside',
        start: 0,
        end: 50
      }
    ],
    series: {
      name: '离散系数(按年统计)',
      type: 'bar',
      data: [
        2.872, 2.513, 1.655, 0.863, 0.821, 0.516, 0.497, 0.496, 0.495, 0.431, 0.426, 0.405, 0.376, 0.356, 0.352, 0.278, 0.275, 0.26, 0.257, 0.241, 0.232, 0.202, 0.195, 0.185, 0.175, 0.17, 0.164,
        0.136, 0.128, 0.122, 0.113, 0.11, 0.106
      ],
      itemStyle: {
        color: function (param) {
          return colors[param.dataIndex]
        }
      },
    }
  }

  // 初始化
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('container'))
    //绘制折线图
    myChart.setOption(options)
  })
  return (
    <div className="byyear">
      <div id="container" style={{ width: 1000, height: 570 }}></div>
      <Card className="card">
        <p>死亡原因稳定性的离散系数：用于描述一个死亡原因在某个地区的死亡率是否稳定，比如战争带来的死亡就是不稳定的，同一个地区，可能这几年有，接着几年又没有，因此离散系数就大</p>
      </Card>
    </div>
  )
}
