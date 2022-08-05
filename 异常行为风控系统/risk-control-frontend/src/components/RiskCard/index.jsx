import React, { useState, useEffect } from 'react'
import { Table, Select } from 'antd'
import { httpGet } from '@/utils/api/axios'
import { Line } from '@ant-design/charts'
import { Pie, G2 } from '@ant-design/plots'
import './index.less'

const { Option } = Select

const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '异常委托编号',
    dataIndex: 'entrustId',
    key: 'entrustId'
  },

  {
    title: '异常场景',
    dataIndex: 'scenes',
    key: 'scenes'
  },
  {
    title: '异常账号ID',
    key: 'accountId',
    dataIndex: 'accountId'
  },
  {
    title: '市场版块ID',
    key: 'blockId',
    dataIndex: 'blockId'
  },
  {
    title: '证券ID',
    key: 'securitiesId',
    dataIndex: 'securitiesId'
  },
  {
    title: '是否处理解决',
    key: 'isDeal',
    dataIndex: 'isDeal'
  },
  {
    title: '异常行为具体数据',
    key: 'details',
    dataIndex: 'details'
  }
]

export default function RiskCard() {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState(null)

  // 饼图
  const G = G2.getEngine('canvas')
  const pie1Data = [
    {
      type: '委托限额风险',
      value: 111
    },
    {
      type: '撤单申报比风险',
      value: 14
    },
    {
      type: '日内回转交易',
      value: 15
    },
    {
      type: '虚假申报',
      value: 153
    },
    {
      type: '频繁申报',
      value: 21
    }
  ]
  const pie1Config = {
    appendPadding: 10,
    data: pie1Data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    legend: false,
    label: {
      type: 'spider',
      labelHeight: 40,
      formatter: (data, mappingData) => {
        const group = new G.Group({})
        group.addShape({
          type: 'circle',
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color
          }
        })
        group.addShape({
          type: 'text',
          attrs: {
            x: 10,
            y: 8,
            text: `${data.type}`,
            fill: mappingData.color
          }
        })
        group.addShape({
          type: 'text',
          attrs: {
            x: 0,
            y: 25,
            text: `${data.value}次 ${(data.percent * 100).toFixed(2)}%`,
            fill: 'rgba(0, 0, 0, 0.65)',
            fontWeight: 700
          }
        })
        return group
      }
    },
    interactions: [
      {
        type: 'element-selected'
      },
      {
        type: 'element-active'
      }
    ]
  }

  const pie2Data = [
    {
      type: '沪A',
      value: 81
    },
    {
      type: '沪B',
      value: 70
    },
    {
      type: '深A',
      value: 101
    },
    {
      type: '深B',
      value: 62
    }
  ]
  const pie2Config = {
    appendPadding: 10,
    data: pie2Data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    legend: false,
    label: {
      type: 'spider',
      labelHeight: 40,
      formatter: (data, mappingData) => {
        const group = new G.Group({})
        group.addShape({
          type: 'circle',
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color
          }
        })
        group.addShape({
          type: 'text',
          attrs: {
            x: 10,
            y: 8,
            text: `${data.type}`,
            fill: mappingData.color
          }
        })
        group.addShape({
          type: 'text',
          attrs: {
            x: 0,
            y: 25,
            text: `${data.value}万 ${(data.percent * 100).toFixed(2)}%`,
            fill: 'rgba(0, 0, 0, 0.65)',
            fontWeight: 700
          }
        })
        return group
      }
    },
    interactions: [
      {
        type: 'element-selected'
      },
      {
        type: 'element-active'
      }
    ]
  }

  // 折线图
  const lineData = [
    {
      date: '2022-08-01',
      value: 1041.74,
      category: '沪A'
    },
    {
      date: '2022-08-01',
      value: 952.72,
      category: '沪B'
    },
    {
      date: '2022-08-01',
      value: 1113.73,
      category: '深A'
    },
    {
      date: '2022-08-01',
      value: 999.47,
      category: '深B'
    },
    {
      date: '2022-08-02',
      value: 707.5,
      category: '沪A'
    },
    {
      date: '2022-08-02',
      value: 724.82,
      category: '沪B'
    },
    {
      date: '2022-08-02',
      value: 754.54,
      category: '深A'
    },
    {
      date: '2022-08-02',
      value: 707.35,
      category: '深B'
    },
    {
      date: '2022-08-03',
      value: 4608.1,
      category: '沪A'
    },
    {
      date: '2022-08-03',
      value: 2217.8,
      category: '沪B'
    },
    {
      date: '2022-08-03',
      value: 3685.68,
      category: '深A'
    },
    {
      date: '2022-08-03',
      value: 3170.41,
      category: '深B'
    }
  ]
  const lineConfig = {
    data: lineData,
    xField: 'date',
    yField: 'value',
    seriesField: 'category'
  }

  const scenesChangeHandler = value => {
    if (value === '全部') {
      setFilterData(null)
    } else {
      let newData = data.filter(item => item.scenes.includes(value))
      setFilterData(newData)
    }
  }

  const isDoneChangeHandler = value => {
    if (value === '全部') {
      setFilterData(null)
    } else {
      let newData = data.filter(item => item.isDeal === value)
      setFilterData(newData)
    }
  }

  // 处理请求的数据为要展示的内容 data为array
  const formatData = data => {
    let riskData = []

    data.forEach((item, index) => {
      riskData.push({
        key: index,
        entrustId: item.entrustId,
        time: item.dealTime,
        scenes: item.scenes,
        accountId: item.accountId,
        blockId: item.marketSegmentId,
        securitiesId: item.securitiesId,
        isDeal: item.isDeal === 'NO'|| item.isDeal === 'No' ? '否' : '是',
        details: item.preciseData
      })
    })

    return riskData
  }

  useEffect(() => {
    httpGet('/riskResultInfo').then(res => {
      setData(formatData(res))
    })
  }, [])

  return (
    <div>
      <div className="riskCardCharts">
        <div className="pies">
          <div className="pie">
            <h4>8.1-8.3 异常场景次数占比</h4>
            <Pie {...pie1Config} style={{ width: 450, height: 200 }} />
          </div>

          <div className="pie">
            <h4>各板块异常交易次数</h4>
            <Pie {...pie2Config} style={{ width: 450, height: 200 }} />
          </div>
        </div>

        <div className="line">
          <h4>8.1-8.3 异常账户排名</h4>
          <Line {...lineConfig} style={{ width: 700, height: 400 }} />
        </div>
      </div>
      <div className="selector">
        <span style={{ marginLeft: 10 }}>异常场景：</span>
        <Select
          defaultValue="全部"
          style={{
            width: 140,
            marginRight: 30
          }}
          onChange={scenesChangeHandler}
        >
          <Option value="全部">全部</Option>
          <Option value="委托限额风险">委托限额风险</Option>
          <Option value="撤单申报比风险">撤单申报比异常</Option>
          <Option value="日内回转交易">日内回转交易</Option>
          <Option value="虚假申报">虚假申报</Option>
          <Option value="频繁申报">频繁申报</Option>
        </Select>

        <span>是否处理解决：</span>
        <Select
          defaultValue="全部"
          style={{
            width: 140
          }}
          onChange={isDoneChangeHandler}
        >
          <Option value="全部">全部</Option>
          <Option value="是">是</Option>
          <Option value="否">否</Option>
        </Select>
      </div>

      <div className="sum">昨日异常交易行为共：{data.length}件</div>
      <Table
        columns={columns}
        dataSource={filterData === null ? data : filterData}
        showHeader
        scroll={{
          x: 1200
        }}
      />
    </div>
  )
}
