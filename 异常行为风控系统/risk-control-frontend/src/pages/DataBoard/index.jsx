import React from 'react'
import { Tabs } from 'antd'
import EntrustCard from '../../components/EntrustCard'
import RiskCard from '../../components/RiskCard'
import DaySummary from '../../components/DaySummary'
import './index.less'

const { TabPane } = Tabs

export default function DataBoard() {

  return (
    <div className='dataBoardContainer'>
      <Tabs type="card">
        <TabPane tab="委托数据" key="1">
          <EntrustCard />
        </TabPane>
        <TabPane tab="风险结果数据" key="2">
          <RiskCard/>
        </TabPane>
        <TabPane tab="日内回转记录" key="3">
          <DaySummary/>
        </TabPane>
      </Tabs>
    </div>
  )
}
