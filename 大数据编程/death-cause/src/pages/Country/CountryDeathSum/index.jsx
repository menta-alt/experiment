import React from 'react'
import ItemDeathSum from '@/components/ItemDeathSum'
import AsiaDeathData from '@/data/AsiaDeathData'
import AfricaDeathData from '@/data/AfricaDeathData.js'
import NorthAmericaDeathData from '@/data/NorthAmericaDeathData.js'
import SouthAmericaDeathData from '@/data/SouthAmericaDeathData.js'
import EuropeDeathData from '@/data/EuropeDeathData.js'
import OceanicDeathData from '@/data/OceanicDeathData.js'
import { BackTop, Button } from 'antd'
import './index.less'

export default function CountryDeathSum() {
  const btnHandler = (i) => {
    window.scrollTo({
      top: 670 * i,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <div className="jumpTo">
        <Button type="primary" className="btn">
          亚洲
        </Button>
        <Button type="primary" className="btn" onClick={() => btnHandler(2)}>
          北美洲
        </Button>
        <Button type="primary" className="btn" onClick={() => btnHandler(1)}>
          非洲
        </Button>
        <Button type="primary" className="btn" onClick={() => btnHandler(3)}>
          南美洲
        </Button>
        <Button type="primary" className="btn" onClick={() => btnHandler(4)}>
          欧洲
        </Button>
        <Button type="primary" className="btn" onClick={() => btnHandler(5)}>
          大洋洲
        </Button>
      </div>
      <ItemDeathSum id="AsiaContainer" continent="亚洲" data={AsiaDeathData} />
      <ItemDeathSum id="AfricaContainer" continent="非洲" data={AfricaDeathData} />
      <ItemDeathSum id="NorthAmericasContainer" continent="北美洲" data={NorthAmericaDeathData} />
      <ItemDeathSum id="SouthAmericasContainer" continent="南美洲" data={SouthAmericaDeathData} />
      <ItemDeathSum id="EuropeContainer" continent="欧洲" data={EuropeDeathData} />
      <ItemDeathSum id="OceaniaContainer" continent="大洋洲" data={OceanicDeathData} />
      <BackTop style={{ right: 25 }} />
    </>
  )
}
