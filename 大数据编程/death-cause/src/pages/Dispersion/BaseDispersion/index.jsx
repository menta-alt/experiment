import React, { useEffect } from 'react'
import { Card } from 'antd';
import * as echarts from 'echarts/lib/echarts.js'
import 'echarts/lib/chart/bar'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, DataZoomComponent, ToolboxComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import './index.less'

// 注册必须的组件
echarts.use([TitleComponent, TooltipComponent, GridComponent, CanvasRenderer, LegendComponent, DataZoomComponent, ToolboxComponent])

export default function BaseDispersion() {
  const colors = ['#490022','#630038','#7E214F','9D507C','A55281','#903962','#9A3C67','#9D3E6A','#B94D7E','C15D89','C15D89','D37099','D37099','D37099','D37099','D3749B','D3749B','DE79A2','DE79A2','#E57CA7','#E57CA7','#F08BB4','#F08BB4','F793BC','F793BC','#FFA6D0','#FFA6D0','FCAFD6','FCAFD6','#FFC2EC','#FFC2EC','FCD1F0','FCD1F0']


  const options = {
    title: {
      text: '死亡原因地域性的离散系数'
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
          '艾滋病',
          '疟疾',
          '环境冷热暴露',
          '蛋白质能量营养不良',
          '营养不良',
          '处决人数(大赦国际)',
          '脑膜炎',
          '腹泻疾病',
          '酒精滥用',
          '急性肝炎',
          '药物滥用(吸毒)',
          '肺结核',
          '孕产妇疾病',
          '人际暴力',
          '新生儿障碍',
          '中毒',
          '糖尿病',
          '火,热和热物质',
          '阿尔茨海默氏病和其他痴呆症',
          '自残',
          '下呼吸道感染',
          '溺水',
          '帕金森病',
          '肿瘤',
          '心血管疾病',
          '慢性呼吸系统疾病',
          '道路交通伤害',
          '肝硬化和其他慢性肝病',
          '慢性肾脏疾病',
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
      name: '离散系数',
      type: 'bar',
      data: [
        6.575, 6.397, 3.453, 2.718, 2.383, 2.198, 2.009, 1.943, 1.742, 1.712, 1.658, 1.633, 1.596, 1.566, 1.556, 1.438, 1.281, 1.108, 1.085, 0.919, 0.906, 0.87, 0.833, 0.803, 0.789, 0.745, 0.71, 0.702, 0.605, 0.593, 0.56, 0.549, 0.427],
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
    <div className='base'>
      <div id="container" style={{ width: 1000, height: 570 }}></div>
      <Card className='card'>
        <p>死亡原因地域性的离散系数：用于描述一个死亡原因是在全世界广泛分布，还是集中在某一地区</p>
      </Card>
    </div>

  )
}
