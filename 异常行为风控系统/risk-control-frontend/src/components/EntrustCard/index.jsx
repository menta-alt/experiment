import React, { useEffect, useState } from 'react'
import { Table, Select } from 'antd'
import { httpGet } from '@/utils/api/axios'
import { Line } from '@ant-design/charts'
import { Pie, G2 } from '@ant-design/plots'
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
    title: '市场板块',
    dataIndex: 'block',
    key: 'block'
  },
  {
    title: '市场板块ID',
    dataIndex: 'blockId',
    key: 'blockId'
  },
  {
    title: '证券ID',
    key: 'securitiesId',
    dataIndex: 'securitiesId'
  },
  {
    title: '账户ID',
    key: 'accountId',
    dataIndex: 'accountId'
  },
  {
    title: '业务行为',
    key: 'action',
    dataIndex: 'action'
  },
  {
    title: '委托状态',
    key: 'isCancel',
    dataIndex: 'isCancel'
  },
  {
    title: '委托数量',
    key: 'entrustCount',
    dataIndex: 'entrustCount',
    sorter: (a, b) => a.entrustCount - b.entrustCount
  },
  {
    title: '委托价格',
    key: 'entrustPrice',
    dataIndex: 'entrustPrice',
    sorter: (a, b) => a.entrustPrice - b.entrustPrice
  },
  {
    title: '委托金额',
    key: 'entrustMoney',
    dataIndex: 'entrustMoney',
    sorter: (a, b) => a.entrustMoney - b.entrustMoney
  }
]

export default function EntrustCard() {
  const [data, setData] = useState()
  const [filterData, setFilterData] = useState(null)

  // 饼图
  const G = G2.getEngine('canvas')
  const pieData = [
    {
      type: '沪A',
      value: 4608.10
    },
    {
      type: '沪B',
      value: 2217.80
    },
    {
      type: '深A',
      value: 3685.68
    },
    {
      type: '深B',
      value: 3170.42
    }
  ]
  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    legend: false,
    label: {
      type: 'spider',
      labelHeight: 40,
      formatter: (data, mappingData) => {
        const group = new G.Group({});
        group.addShape({
          type: 'circle',
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 10,
            y: 8,
            text: `${data.type}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 0,
            y: 25,
            text: `${data.value}万 ${(data.percent * 100).toFixed(2)}%`,
            fill: 'rgba(0, 0, 0, 0.65)',
            fontWeight: 700,
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  }

  // 折线图
  const lineData = [
    {
      "date": "2022-08-01",
      "value": 1041.74,
      "category": "沪A"
    },
    {
      "date": "2022-08-01",
      "value": 952.72,
      "category": "沪B"
    },
    {
      "date": "2022-08-01",
      "value": 1113.73,
      "category": "深A"
    },
    {
      "date": "2022-08-01",
      "value": 999.47,
      "category": "深B"
    },
    {
      "date": "2022-08-02",
      "value": 707499.93,
      "category": "沪A"
    },
    {
      "date": "2022-08-02",
      "value": 724820.35,
      "category": "沪B"
    },
    {
      "date": "2022-08-02",
      "value": 754536.23,
      "category": "深A"
    },
    {
      "date": "2022-08-02",
      "value": 707351.17,
      "category": "深B"
    },
    {
      "date": "2022-08-03",
      "value": 4608.10,
      "category": "沪A"
    },
    {
      "date": "2022-08-03",
      "value": 2217.80,
      "category": "沪B"
    },
    {
      "date": "2022-08-03",
      "value": 3685.68,
      "category": "深A"
    },
    {
      "date": "2022-08-03",
      "value": 3170.41,
      "category": "深B"
    }
  ]
  const lineConfig = {
    data: lineData,
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
  };
  const blockChangeHandler = value => {
    if (value === '全部') {
      setFilterData(null)
    } else {
      let newData = data.filter(item => item.block === value)
      setFilterData(newData)
    }
  }

  // 处理请求的数据为要展示的内容 data为array
  const formatData = data => {
    let entrustData = []
    data.forEach(item => {
      entrustData.push({
        key: item.entrustId,
        createDate: item.createTime,
        block: item.msegmentName,
        blockId: item.msegmentId,
        securitiesId: item.securitiesId,
        accountId: item.accountId,
        action: item.action,
        isCancel: item.isCancel === 'true' ? '正常' : '撤单',
        entrustCount: item.entrustCnt,
        entrustPrice: item.entrustPrice,
        entrustMoney: item.entrustPriceCnt
      })
    })

    return entrustData
  }

  useEffect(() => {
    httpGet('/entrustInfo').then(res => {
      setData(formatData(res))
    })
  }, [])

  return (
    <div>
      <div className="charts">
        <div className="pie">
          <h4>各板块昨日交易金额</h4>
          <Pie {...pieConfig} style={{width: 420, height: 200}}/>
        </div>
        
        <div className="line">
          <h4>8.1-8.3 各板块交易金额</h4>
          <Line {...lineConfig} style={{width: 500, height: 300}}/>
        </div>

      </div>
      <div className="selector">
        <span style={{ marginLeft: 10, marginRight: 10 }}>市场板块：</span>
        <Select
          defaultValue="全部"
          style={{
            width: 120
          }}
          onChange={blockChangeHandler}
        >
          <Option value="全部">全部</Option>
          <Option value="沪A">沪A</Option>
          <Option value="沪B">沪B</Option>
          <Option value="深A">深A</Option>
          <Option value="深B">深B</Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={filterData === null ? data : filterData}
        showHeader
        scroll={{
          x: 1100
        }}
      />
    </div>
  )
}
