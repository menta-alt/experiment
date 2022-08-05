import React, { useEffect, useState } from 'react'
import { DualAxes } from '@ant-design/plots';
import { Table, Select } from 'antd'
import { httpGet } from '@/utils/api/axios'
import './index.less'

const { Option } = Select

// 表的列表设置
const columns = [
  {
    title: '创建日期',
    dataIndex: 'createDate',
    key: 'createDate'
  },
  {
    title: '账户ID',
    key: 'accountId',
    dataIndex: 'accountId'
  },
  {
    title: '证券ID',
    key: 'securitiesId',
    dataIndex: 'securitiesId'
  },
  {
    title: '市场板块',
    dataIndex: 'block',
    key: 'block'
  },
  {
    title: '业务行为',
    key: 'action',
    dataIndex: 'action'
  },
  {
    title: '交易总数量',
    key: 'count',
    dataIndex: 'count',
    sorter: (a, b) => a.count - b.count
  },
  {
    title: '交易总金额',
    key: 'allPrice',
    dataIndex: 'allPrice',
    sorter: (a, b) => a.allPrice - b.allPrice
  },
]

export default function DaySummary() {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState(null)

  // 买入金额
  const inData = [
    {
      date: '2022-08-01',
      type: '沪A',
      value: 452.81
    },
    {
      date: '2022-08-01',
      type: '沪B',
      value: 539.20
    },
    {
      date: '2022-08-01',
      type: '深A',
      value: 666.84
    },
    {
      date: '2022-08-01',
      type: '深B',
      value: 545.80
    },
    {
      date: '2022-08-02',
      type: '沪A',
      value: 356034.07
    },
    {
      date: '2022-08-02',
      type: '沪B',
      value: 384469.80
    },
    {
      date: '2022-08-02',
      type: '深A',
      value: 389054.75
    },
    {
      date: '2022-08-02',
      type: '深B',
      value: 361074.93
    },
    {
      date: '2022-08-03',
      type: '沪A',
      value: 2693.94
    },
    {
      date: '2022-08-03',
      type: '沪B',
      value: 1383.87
    },
    {
      date: '2022-08-03',
      type: '深A',
      value: 2218.92
    },
    {
      date: '2022-08-03',
      type: '深B',
      value: 1876.24
    }
  ]
  // 买入数量
  const inCntData = [
    {
      date: '2022-08-01',
      count: 42300,
      name: '沪A',
    },
    {
      date: '2022-08-01',
      count: 42600,
      name: '沪B',
    },
    {
      date: '2022-08-01',
      count: 53100,
      name: '深A',
    },
    {
      date: '2022-08-01',
      count: 47600,
      name: '深B',
    },
    {
      date: '2022-08-02',
      count: 30371300,
      name: '沪A',
    },
    {
      date: '2022-08-02',
      count: 34014500,
      name: '沪B',
    },
    {
      date: '2022-08-02',
      count: 31768100,
      name: '深A',
    },
    {
      date: '2022-08-02',
      count: 31752100,
      name: '深B',
    },
    {
      date: '2022-08-03',
      count: 47342800,
      name: '沪A',
    },
    {
      date: '2022-08-03',
      count: 30403000,
      name: '沪B',
    },
    {
      date: '2022-08-03',
      count: 42576600,
      name: '深A',
    },
    {
      date: '2022-08-03',
      count: 35410100,
      name: '深B',
    },
  ]

  // 卖出
  const outData = [
    {
      date: '2022-08-01',
      type: '沪A',
      value: 588.92
    },
    {
      date: '2022-08-01',
      type: '沪B',
      value: 413.52
    },
    {
      date: '2022-08-01',
      type: '深A',
      value: 446.89
    },
    {
      date: '2022-08-01',
      type: '深B',
      value: 453.67
    },
    {
      date: '2022-08-02',
      type: '沪A',
      value: 351465.86
    },
    {
      date: '2022-08-02',
      type: '沪B',
      value: 340350.55
    },
    {
      date: '2022-08-02',
      type: '深A',
      value: 365481.48
    },
    {
      date: '2022-08-02',
      type: '深B',
      value: 346276.23
    },
    {
      date: '2022-08-03',
      type: '沪A',
      value: 1914.15
    },
    {
      date: '2022-08-03',
      type: '沪B',
      value: 833.92
    },
    {
      date: '2022-08-03',
      type: '深A',
      value: 1466.75
    },
    {
      date: '2022-08-03',
      type: '深B',
      value: 1294.17
    }
  ]

  // 卖出数量
  const outCntData = [
    {
      date: '2022-08-01',
      count: 47400,
      name: '沪A',
    },
    {
      date: '2022-08-01',
      count: 39000,
      name: '沪B',
    },
    {
      date: '2022-08-01',
      count: 38700,
      name: '深A',
    },
    {
      date: '2022-08-01',
      count: 38300,
      name: '深B',
    },
    {
      date: '2022-08-02',
      count: 34544400,
      name: '沪A',
    },
    {
      date: '2022-08-02',
      count: 30142000,
      name: '沪B',
    },
    {
      date: '2022-08-02',
      count: 33281600,
      name: '深A',
    },
    {
      date: '2022-08-02',
      count: 38638600,
      name: '深B',
    },
    {
      date: '2022-08-03',
      count: 41976500,
      name: '沪A',
    },
    {
      date: '2022-08-03',
      count: 19908100,
      name: '沪B',
    },
    {
      date: '2022-08-03',
      count: 28770600,
      name: '深A',
    },
    {
      date: '2022-08-03',
      count: 30120600,
      name: '深B',
    },
  ]

  //买入配置
  const config = {
    data: [inData, inCntData],
    xField: 'date',
    yField: ['value','count'],
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'type',
        columnWidthRatio: 0.4,
      },
      {
        geometry: 'line',
        seriesField: 'name',
        lineStyle: ({ name }) => {
          if (name === 'a') {
            return {
              lineDash: [1, 4],
              opacity: 1,
            };
          }

          return {
            opacity: 0.5,
          };
        },
      },
    ],
    legend: {
      position: 'right-top',
      offsetX: 8,
      offsetY: 5,
      title: {
        text: '各个版块买入情况',
        spacing: 8
      },
    }
  }

  const outConfig = {
    data: [outData, outCntData],
    xField: 'date',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'type',
        columnWidthRatio: 0.4,
      },
      {
        geometry: 'line',
        seriesField: 'name',
        lineStyle: ({ name }) => {
          if (name === 'a') {
            return {
              lineDash: [1, 4],
              opacity: 1,
            };
          }

          return {
            opacity: 0.5,
          };
        },
      },
    ],
    legend: {
      position: 'left-top',
      offsetX: -8,
      offsetY: 5,
      title: {
        text: '各个版块卖出情况',
        spacing: 8
      },
    }
  }

  const actionChangeHandler = (value) => {
    if (value === '全部') {
      setFilterData(null)
    } else {
      let newData = data.filter(item => item.action === value)
      setFilterData(newData)
    }
  }

   // 处理请求的数据为要展示的内容 data为array
   const formatData = data => {
    let daySummaryData = []
    data.forEach((item, index) => {
      daySummaryData.push({
        key: index,
        createDate: item.createDay.split('-').reverse().join('-'),
        accountId: item.accountId,
        securitiesId: item.securitiesId,
        block: item.msegmentName,
        action: item.action,
        count: item.cnt,
        allPrice: item.price
      })
    })

    return daySummaryData
  }

  useEffect(() => {
    httpGet('/daySummaryInfo').then(res => {
      setData(formatData(res))
    })
  }, [])

  return (
    <div className="DayContainer">
      <div className="dayCharts">
        <h4>各个版块买入情况</h4>
        <DualAxes {...config} style={{ width: 800, height: 400, margin: '0 auto' }} />
        <h4>各个版块卖出情况</h4>
        <DualAxes {...outConfig} style={{ width: 800, height: 400, margin: '0 auto'}} />
      </div>

      <div className="selector">
        <span style={{ marginLeft: 10, marginRight: 10 }}>业务行为：</span>
        <Select
          defaultValue="全部"
          style={{
            width: 120
          }}
          onChange={actionChangeHandler}
        >
          <Option value="全部">全部</Option>
          <Option value="买入">买入</Option>
          <Option value="卖出">卖出</Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={filterData === null ? data : filterData}
        showHeader
        scroll={{
          x: 800
        }}
      />

    </div>
  )
}
