import React from 'react'
import DataStatistics from '@/components/DataStatistics'
import BaseData from '@/data/BaseData.js'
import MyLineChart from '@/components/MyLineChart'
import './index.less'

export default function Home() {
  return (
    <div>
      {/* 基础数据展示 */}
      <ul className='datashow'>
        {
          BaseData.map((item,index) => (
            <DataStatistics
              key={index}
              icon={item.icon}
              color={item.color}
              title={item.title}
              count={item.count}
            />
          ))
        }
      </ul>
      
      {/* 折线图动态展示 */}
      <div className='lineChart'>
        <MyLineChart/>
      </div>
    </div>
  )
}
