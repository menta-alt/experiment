import React, { useEffect, useState } from 'react'
// 引入 ECharts 主模块
import * as echarts from 'echarts/lib/echarts.js'
// 引入折线图
import 'echarts/lib/chart/scatter'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, TimelineComponent, VisualMapComponent, MarkLineComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import dataset from '@/data/GDPCountryData.js'

// 注册必须的组件
echarts.use([TitleComponent, TooltipComponent, GridComponent, CanvasRenderer, LegendComponent, TimelineComponent, VisualMapComponent, MarkLineComponent])

export default function AddPeopleNumber() {
  const [isFirst, setIsFirst] = useState(true)

  const countries = [
    '阿尔巴尼亚',
    '安道尔',
    '阿拉伯联合酋长国',
    '阿根廷',
    '亚美尼亚',
    '安提瓜和巴布亚',
    '澳大利亚',
    '奥地利',
    '布隆迪',
    '比利时',
    '贝宁',
    '布基纳法索',
    '孟加拉国',
    '保加利亚',
    '巴哈马',
    '波斯尼亚',
    '伯利兹',
    '玻利维亚',
    '巴西',
    '巴巴多斯',
    '文莱',
    '不丹',
    '博茨瓦纳',
    '中非共和国',
    '加拿大',
    '瑞士',
    '智利',
    '中国',
    '喀麦隆',
    '刚果1',
    '刚果2',
    '哥伦比亚',
    '科摩罗',
    '佛得角',
    '哥斯达黎加',
    '古巴',
    '塞浦路斯',
    '捷克共和国',
    '德国',
    '吉布提',
    '多米尼加',
    '丹麦',
    '多米尼加共和国',
    '阿尔及利亚',
    '埃及',
    '西班牙',
    '埃塞俄比亚',
    '芬兰',
    '斐济',
    '法国',
    '英国',
    '加纳',
    '几内亚',
    '冈比亚',
    '几内亚比绍',
    '赤道几内亚',
    '希腊',
    '格林纳达',
    '危地马拉',
    '圭亚那',
    '洪都拉斯',
    '海地',
    '匈牙利',
    '印度尼西亚',
    '印度',
    '爱尔兰',
    '伊拉克',
    '冰岛',
    '意大利',
    '牙买加',
    '约旦',
    '日本',
    '哈萨克斯坦',
    '肯尼亚',
    '吉尔吉斯共和国',
    '柬埔寨',
    '基里巴斯',
    '圣基茨和尼维斯',
    '韩国',
    '科威特',
    '老挝',
    '黎巴嫩',
    '利比亚',
    '圣卢西亚',
    '斯里兰卡',
    '莱索托',
    '卢森堡',
    '摩洛哥',
    '摩纳哥',
    '马达加斯加',
    '马尔代夫',
    '墨西哥',
    '马绍尔群岛',
    '北马其顿',
    '马里',
    '马耳他',
    '缅甸',
    '蒙古',
    '莫桑比克',
    '毛里塔尼亚',
    '毛里求斯',
    '马拉维',
    '马来西亚',
    '纳米比亚',
    '尼日尔',
    '尼日利亚',
    '尼加拉瓜',
    '荷兰',
    '挪威',
    '尼泊尔',
    '新西兰',
    '阿曼',
    '巴基斯坦',
    '巴拿马',
    '秘鲁',
    '菲律宾',
    '巴布亚新几内亚',
    '波兰',
    '波多黎各',
    '葡萄牙',
    '巴拉圭',
    '卡塔尔',
    '罗马尼亚',
    '俄罗斯',
    '卢旺达',
    '沙特阿拉伯',
    '苏丹',
    '塞内加尔',
    '新加坡',
    '所罗门群岛',
    '塞拉利昂',
    '萨尔瓦多',
    '苏里南',
    '斯洛伐克共和国',
    '瑞典',
    '斯威士兰',
    '塞舌尔',
    '阿拉伯叙利亚共和国',
    '乍得',
    '多哥',
    '泰国',
    '塔吉克斯坦',
    '汤加',
    '特立尼达',
    '突尼斯',
    '土耳其',
    '图瓦卢',
    '坦桑尼亚',
    '乌干达',
    '乌拉圭',
    '美国',
    '乌兹别克斯坦',
    '圣文森特和格林纳丁斯',
    '越南',
    '瓦努阿图',
    '萨摩亚',
    '也门',
    '南非',
    '赞比亚',
    '津巴布韦'
  ]

  const years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]

  let sizeFunction = function (x) {
    let y = Math.sqrt(x / 5e8) + 0.1
    return y * 80
  }

  let schema = [
    {
      name: '人均GDP',
      index: 0,
      text: '人均GDP',
      unit: '美元'
    },
    {
      name: 'DeathRate',
      index: 1,
      text: '年死亡率',
      unit: '%'
    },
    {
      name: 'Population',
      index: 2,
      text: '总人口',
      unit: ''
    },
    {
      name: 'Country',
      index: 3,
      text: '国家',
      unit: ''
    }
  ]

  let option = {
    baseOption: {
      timeline: {
        //不能改
        axisType: 'category',
        orient: 'vertical',
        autoPlay: true,
        inverse: true,
        playInterval: 1000,
        left: null,
        right: 0,
        top: 20,
        bottom: 20,
        width: 55,
        height: null,
        symbol: 'none',
        checkpointStyle: {
          borderWidth: 2
        },
        controlStyle: {
          showNextBtn: false,
          showPrevBtn: false
        },
        data: []
      },
      title: [
        {
          text: years[0],
          textAlign: 'center',
          right: 10,
          bottom: 60,
          textStyle: {
            fontSize: 100
          }
        },
        {
          text: '各国年死亡率与GDP的关系(圆点大小体现国家总人数多少)',
          left: 'center',
          top: 10,
          textStyle: {
            fontWeight: 600,
            fontSize: 20
          }
        }
      ],
      tooltip: {
        padding: 5,
        borderWidth: 1,
        formatter: function (obj) {
          var value = obj.value

          return (
            schema[3].text +
            ': ' +
            value[3] +
            '<br>' +
            schema[1].text +
            ': ' +
            value[1] +
            schema[1].unit +
            '<br>' +
            schema[0].text +
            ': ' +
            value[0] +
            schema[0].unit +
            '<br>' +
            schema[2].text +
            ': ' +
            value[2] +
            '<br>'
          )
        }
      },
      grid: {
        top: 80,
        bottom: 30,
        containLabel: true,
        left: 30,
        right: '110'
      },
      xAxis: {
        type: 'log',
        name: '人均GDP',
        max: 200000,
        min: 100,
        nameGap: 25,
        nameLocation: 'middle',
        nameTextStyle: {
          fontSize: 18
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value} $'
        }
      },
      yAxis: {
        type: 'value',
        name: '死亡率',
        max: 2.1,
        nameTextStyle: {
          fontSize: 18
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value}%'
        }
      },
      visualMap: [
        {
          show: false,
          dimension: 3,
          categories: countries,
          inRange: {
            color: (function () {
              const colors = [
                '#5B8FF9',
                '#61DDAA',
                '#65789B',
                '#F6BD16',
                '#7262fd',
                '#78D3F8',
                '#9661BC',
                '#F6903D',
                '#008685',
                '#FFE0ED',
                '#51689b',
                '#ce5c5c',
                '#fbc357',
                '#8fbf8f',
                '#659d84',
                '#fb8e6a',
                '#c77288',
                '#786090',
                '#91c4c5',
                '#6890ba',
                '#FF6B3B',
                '#626681',
                '#FFC100',
                '#9FB40F',
                '#76523B',
                '#DAD5B5',
                '#DAD5B5',
                '#F4664A',
                '#0E8E89',
                '#E19348',
                '#F383A2',
                '#F383A2',
                '#247FEA',
                '#791DC9',
                '#8CDAE5',
                '#B1ABF4',
                '#2BCB95',
                '#00318A',
                '#0047A5',
                '#085EC0',
                '#3D76DD',
                '#5B8FF9',
                '#7DAAFF',
                '#9AC5FF',
                '#B8E1FF',
                '#003E19',
                '#00562F',
                '#006F45',
                '#008A5D',
                '#19A576',
                '#42C090',
                '#61DDAA',
                '#9DF5CA',
                '#1B324F',
                '#334867',
                '#4C6080',
                '#65789B',
                '#7E92B5',
                '#99ADD1',
                '#B4C8ED',
                '#D0E4FF',
                '#907BFF',
                '#AE95FF',
                '#CCB0FF',
                '#EBCCFF',
                '#003958',
                '#005170',
                '#00698A',
                '#0A82A4',
                '#3A9DBF',
                '#5AB8DB',
                '#78D3F8',
                '#003B3D',
                '#005354',
                '#006C6C',
                '#008685',
                '#31A09F',
                '#52BCBA',
                '#6FD8D6',
                '#B65680',
                '#D37099',
                '#FF8362'
              ]
              return colors.concat(colors)
            })()
          }
        }
      ],
      series: [
        {
          type: 'scatter',
          itemStyle: {
            opacity: 0.8
          },
          data: dataset[0],
          symbolSize: function (val) {
            return sizeFunction(val[2]);
          },
          markLine: {
            symbol: ['none', 'none'],//去掉箭头
            lineStyle: {
              normal: {
                color: "orange",
                type: "solid",
              },
            },
            data: [
              {
                name: '死亡率1%',
                yAxis: 1,
              },
            ],
            label: {
              formatter: '1%'
            },
          }
        }
      ],
      animationDurationUpdate: 1000,
      animationEasingUpdate: 'quinticInOut'
    },
    options: []
  }

  // 初始化
  useEffect(() => {
    let myChart = echarts.init(document.getElementById('container'))

    if (isFirst) {
      myChart.setOption(option)
      setIsFirst(false)
    } else {
      for (var n = 0; n < years.length; n++) {
        option.baseOption.timeline.data.push(years[n])
        option.options.push({
          title: {
            show: true,
            text: years[n] + ''
          },
          series: {
            name: years[n],
            type: 'scatter',
            itemStyle: {
              opacity: 0.8
            },
            data: dataset[n],
            symbolSize: function (val) {
              return sizeFunction(val[2]);
            }
          }
        })
      }

      myChart.setOption(option)
    }
  }, [isFirst])

  return <div id="container" style={{ width: 1000, height: 570 }}></div>
}
