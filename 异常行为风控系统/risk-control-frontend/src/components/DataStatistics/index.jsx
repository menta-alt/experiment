//该文件是用于生成数据统计卡片的组件
import React from 'react'
import './index.less'

export default function DataStatistics(props) {
  const {icon, color, title, count} = props
  return (
    <>
      <li className="dataItem">
        { React.createElement(icon, {twoToneColor: color, className: 'data-icon'}) }
        <div className="data">
          <p className="title">{title}</p>
          <p className="count">{count}</p>
        </div>
      </li>
    </>
  )
}
