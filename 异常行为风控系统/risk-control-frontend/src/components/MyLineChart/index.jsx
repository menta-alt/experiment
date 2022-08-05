// 该组件用于生成折线图
import React, { useEffect, useState, useRef } from 'react'
// 引入 ECharts 主模块
import * as echarts from 'echarts/lib/echarts.js'
// 引入折线图
import 'echarts/lib/chart/line'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent,LegendComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import { DatePicker } from 'antd';
import './index.less'
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const { RangePicker } = DatePicker;

// 注册必须的组件
echarts.use([TitleComponent, TooltipComponent, GridComponent, CanvasRenderer, LegendComponent])

export default function MyLineChart() {
  const dateFormat = 'YYYY-MM-DD';
  const [dates, setDates] = useState([]); //记录当前的日期区间信息
  const [hackValue, setHackValue] = useState();
  const [value, setValue] = useState();
  const chartRef = useRef(null)
  let myChart = null;

  // 生成选择的日期范围
  const createDateRange = (endDate) => {
    const range = []
    for(let i=6; i>=0; i--) {
      range.push(moment(endDate).subtract(i, 'days').format(dateFormat))
    }
    return range
  }
  const [dateRange, setDateRange] = useState(createDateRange(moment()))


  // 图表的配置项
  const options = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['未处理', '处理中'],
      bottom: 10
    },
    xAxis: {
      name: '日期',
      data: dateRange,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      name: '数量',
      nameGap: 20,
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: [
      {
        name: '未处理',
        type: 'line',
        data: [0, 18, 2, 1, 4, 7, 6],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#F4516C'
        },
        itemStyle: {
          color: '#F4516C'
        }
      },
      {
        name: '已处理',
        type: 'line',
        data: [2, 7, 12, 13, 2, 1, 4],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#5AD8A6'
        },
        itemStyle: {
          color: '#5AD8A6'
        }
      }
    ]
  }

  // 初始化
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    const chart = echarts.getInstanceByDom(chartRef.current)
    if(chart) {
      myChart = chart;
    } else {
      myChart = echarts.init(chartRef.current)
    }

    //绘制折线图
    myChart.setOption(options)

    // 清除实例
    return () => {
      myChart && myChart.dispose();
    }
  })

  // 设置日期区间
  const disabledDate = current => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 6;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 6;
    return tooEarly || tooLate;
  };

  const onOpenChange = open => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };

  const onChange = val => { //val是新的选择的moment数组
    setValue(val)
    setDateRange(createDateRange(val[1]))
  }

  return (
    <>
      <span style={{marginLeft: 80}}>选择展示的日期：</span>
      <RangePicker
        value={hackValue || value}
        defaultValue={ 
          [moment(moment().subtract(6, 'days').format(dateFormat)), moment(moment().format(dateFormat))] 
        }
        disabledDate={disabledDate}  //禁止选择的日期
        onCalendarChange={val => setDates(val)} //待选日期发生变化的回调
        onChange={onChange} //日期范围发生变化的回调
        onOpenChange={onOpenChange} //弹出日历和关闭日历的回调
        locale={locale}  //解决控件英文问题
        className='timePicker'
      />
      <div ref={chartRef} style={{ width: 1000, height: 450 }}></div>
    </>
  )
}
