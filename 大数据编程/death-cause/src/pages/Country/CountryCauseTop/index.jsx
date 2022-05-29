import React from 'react'
import { Table, BackTop, Button } from 'antd'

import './index.less'

export default function CountryCauseTop() {
  const Columns = [
    {
      title: '死因',
      dataIndex: 'cause',
      key: 'cause',
      width: '36%'
    },
    {
      title: '进入top5次数',
      dataIndex: 'count',
      align: 'center',
      key: 'count',
      width: '32%'
    },
    {
      title: '为top1的次数',
      dataIndex: 'topCount',
      align: 'center',
      key: 'topCount',
      width: '32%'
    }
  ]

  // 亚洲
  const AsiaData = [
    {
      country: '中国',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '慢性呼吸道疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '消化系统疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '5',
          cause: '道路交通伤害',
          count: 15,
          topCount: 0
        },
        {
          key: '6',
          cause: '下呼吸道感染',
          count: 11,
          topCount: 0
        },
        {
          key: '7',
          cause: '阿尔茨海默氏症和其他痴呆症',
          count: 4,
          topCount: 0
        }
      ]
    },
    {
      country: '日本',
      infos: [
        {
          key: '1',
          cause: '肿瘤',
          count: 30,
          topCount: 24
        },
        {
          key: '2',
          cause: '心血管疾病',
          count: 30,
          topCount: 6
        },
        {
          key: '3',
          cause: '下呼吸道感染',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '消化系统疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '5',
          cause: '阿尔茨海默氏症和其他痴呆症',
          count: 28,
          topCount: 0
        },
        {
          key: '6',
          cause: '慢性呼吸道疾病',
          count: 2,
          topCount: 0
        }
      ]
    },
    {
      country: '韩国',
      infos: [
        {
          key: '1',
          cause: '肿瘤',
          count: 30,
          topCount: 19
        },
        {
          key: '2',
          cause: '心血管疾病',
          count: 30,
          topCount: 11
        },
        {
          key: '3',
          cause: '消化系统疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '自残',
          count: 12,
          topCount: 0
        },
        {
          key: '5',
          cause: '肝硬化等慢性肝病',
          count: 12,
          topCount: 0
        },
        {
          key: '6',
          cause: '阿尔茨海默氏症和其他痴呆症',
          count: 9,
          topCount: 0
        },
        {
          key: '7',
          cause: '糖尿病',
          count: 9,
          topCount: 0
        },
        {
          key: '8',
          cause: '道路交通伤害',
          count: 9,
          topCount: 0
        },
        {
          key: '9',
          cause: '慢性呼吸道疾病',
          count: 6,
          topCount: 0
        },
        {
          key: '10',
          cause: '下呼吸道感染',
          count: 3,
          topCount: 0
        }
      ]
    },
    {
      country: '印度',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '腹泻病',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '新生儿疾病',
          count: 29,
          topCount: 0
        },
        {
          key: '4',
          cause: '慢性呼吸道疾病',
          count: 27,
          topCount: 0
        },
        {
          key: '5',
          cause: '肿瘤',
          count: 15,
          topCount: 0
        },
        {
          key: '6',
          cause: '肺结核',
          count: 6,
          topCount: 0
        },
        {
          key: '7',
          cause: '消化系统疾病',
          count: 1,
          topCount: 0
        }
      ]
    },
    {
      country: '叙利亚',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 25
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '慢性呼吸道疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '新生儿疾病',
          count: 21,
          topCount: 0
        },
        {
          key: '5',
          cause: '下呼吸道感染',
          count: 15,
          topCount: 0
        },
        {
          key: '6',
          cause: '慢性肾脏疾病',
          count: 10,
          topCount: 0
        },
        {
          key: '7',
          cause: '冲突和恐怖主义',
          count: 9,
          topCount: 5
        },
        {
          key: '8',
          cause: '冲突和恐怖主义',
          count: 9,
          topCount: 0
        },
        {
          key: '9',
          cause: '恐怖主义(死亡)',
          count: 3,
          topCount: 0
        },
        {
          key: '10',
          cause: '道路交通伤害',
          count: 2,
          topCount: 0
        }
      ]
    }
  ]

  // 非洲
  const AfricaData = [
    {
      country: '埃及',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '消化系统疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '肝硬化等慢性肝病',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '肿瘤',
          count: 26,
          topCount: 0
        },
        {
          key: '5',
          cause: '下呼吸道感染',
          count: 19,
          topCount: 0
        },
        {
          key: '6',
          cause: '道路交通损伤',
          count: 11,
          topCount: 0
        },
        {
          key: '7',
          cause: '腹泻病',
          count: 4,
          topCount: 0
        }
      ]
    },
    {
      country: '利比亚',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '道路交通损伤',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '新生儿疾病',
          count: 18,
          topCount: 0
        },
        {
          key: '5',
          cause: '消化系统疾病',
          count: 16,
          topCount: 0
        },
        {
          key: '6',
          cause: '慢性肾脏疾病',
          count: 11,
          topCount: 0
        },
        {
          key: '7',
          cause: '冲突和恐怖主义',
          count: 4,
          topCount: 0
        },
        {
          key: '8',
          cause: '下呼吸道感染',
          count: 5,
          topCount: 0
        },
        {
          key: '9',
          cause: '慢性呼吸道疾病',
          count: 3,
          topCount: 0
        },
        {
          key: '10',
          cause: '人际暴力',
          count: 2,
          topCount: 0
        }
      ]
    },
    {
      country: '埃塞俄比亚',
      infos: [
        {
          key: '1',
          cause: '新生儿疾病',
          count: 30,
          topCount: 17
        },
        {
          key: '2',
          cause: '腹泻疾病',
          count: 30,
          topCount: 11
        },
        {
          key: '3',
          cause: '下呼吸道感染',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '心血管疾病',
          count: 21,
          topCount: 0
        },
        {
          key: '5',
          cause: '艾滋病',
          count: 20,
          topCount: 2
        },
        {
          key: '6',
          cause: '肺结核',
          count: 14,
          topCount: '6(1990-1995)'
        },
        {
          key: '7',
          cause: '肿瘤',
          count: 5,
          topCount: 0
        }
      ]
    }
  ]

  // 北美洲
  const NorthData = [
    {
      country: '美国',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '慢性呼吸道疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '阿尔茨海默氏症和其他痴呆症',
          count: 30,
          topCount: 0
        },
        {
          key: '5',
          cause: '消化系统疾病',
          count: 15,
          topCount: 0
        }
      ]
    },
    {
      country: '加拿大',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 16
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 14
        },
        {
          key: '3',
          cause: '慢性呼吸道疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '消化系统疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '5',
          cause: '阿尔茨海默氏症和其他痴呆症',
          count: 22,
          topCount: 0
        },
        {
          key: '6',
          cause: '下呼吸道感染',
          count: 8,
          topCount: 0
        }
      ]
    },
    {
      country: '墨西哥',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '消化系统疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '糖尿病',
          count: 28,
          topCount: 0
        },
        {
          key: '5',
          cause: '慢性肾脏疾病',
          count: 19,
          topCount: 0
        },
        {
          key: '6',
          cause: '新生儿疾病',
          count: 9,
          topCount: 0
        },
        {
          key: '7',
          cause: '肝硬化等慢性肝病',
          count: 2,
          topCount: 0
        },
        {
          key: '8',
          cause: '下呼吸道感染',
          count: 2,
          topCount: 0
        }
      ]
    },
    {
      country: '牙买加',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '糖尿病',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '慢性肾脏疾病',
          count: 25,
          topCount: 0
        },
        {
          key: '5',
          cause: '新生儿疾病',
          count: 13,
          topCount: 0
        },
        {
          key: '6',
          cause: '阿尔茨海默氏症和其他痴呆症',
          count: 12,
          topCount: 0
        },
        {
          key: '7',
          cause: '人际暴力',
          count: 4,
          topCount: 0
        },
        {
          key: '8',
          cause: '艾滋病',
          count: 3,
          topCount: 0
        },
        {
          key: '9',
          cause: '下呼吸道感染',
          count: 3,
          topCount: 0
        }
      ]
    },
  ]

  // 南美洲
  const SouthData = [
    {
      country: '巴西',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '下呼吸道感染',
          count: 23,
          topCount: 0
        },
        {
          key: '4',
          cause: '人际暴力',
          count: 21,
          topCount: 0
        },
        {
          key: '5',
          cause: '消化系统疾病',
          count: 18,
          topCount: 0
        },
        {
          key: '6',
          cause: '新生儿疾病',
          count: 15,
          topCount: 0
        },
        {
          key: '7',
          cause: '慢性呼吸道疾病',
          count: 12,
          topCount: 0
        },
        {
          key: '8',
          cause: '道路交通伤害',
          count: 1,
          topCount: 0
        }
      ]
    },
    {
      country: '智利',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 21
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 9
        },
        {
          key: '3',
          cause: '消化系统疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '肝硬化等慢性肝病',
          count: 30,
          topCount: 0
        },
        {
          key: '5',
          cause: '慢性呼吸道疾病',
          count: 17,
          topCount: 0
        },
        {
          key: '6',
          cause: '下呼吸道感染',
          count: 13,
          topCount: 0
        }
      ]
    },
    {
      country: '阿根廷',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '慢性呼吸道疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '消化系统疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '5',
          cause: '下呼吸道感染',
          count: 28,
          topCount: 0
        },
        {
          key: '6',
          cause: '新生儿疾病',
          count: 2,
          topCount: 0
        }
      ]
    },
  ]

  // 欧洲
  const EuropeData = [
    {
      country: '俄罗斯',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '消化系统疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '自残',
          count: 26,
          topCount: 0
        },
        {
          key: '5',
          cause: '肝硬化等慢性肝病',
          count: 15,
          topCount: 0
        },
        {
          key: '6',
          cause: '慢性呼吸道疾病',
          count: 12,
          topCount: 0
        },
        {
          key: '7',
          cause: '阿尔茨海默氏症和其他痴呆症',
          count: 4,
          topCount: 0
        },
        {
          key: '8',
          cause: '阿尔茨海默氏症和其他痴呆症',
          count: 2,
          topCount: 0
        },
        {
          key: '9',
          cause: '滥用酒精',
          count: 1,
          topCount: 0
        }
      ]
    },
    {
      country: '德国',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '阿尔茨海默氏症和其他痴呆症',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '消化系统疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '5',
          cause: '慢性呼吸道疾病',
          count: 30,
          topCount: 0
        }
      ]
    },
    {
      country: '瑞士',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '阿尔茨海默氏症和其他痴呆症',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '慢性呼吸道疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '5',
          cause: '消化系统疾病',
          count: 24,
          topCount: 0
        },
        {
          key: '6',
          cause: '下呼吸道感染',
          count: 6,
          topCount: 0
        }
      ]
    },
    {
      country: '英国',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 24
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 6
        },
        {
          key: '3',
          cause: '慢性呼吸道疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '下呼吸道感染',
          count: 30,
          topCount: 0
        },
        {
          key: '5',
          cause: '消化系统疾病',
          count: 30,
          topCount: 0
        }
      ]
    },
    {
      country: '法国',
      infos: [
        {
          key: '1',
          cause: '肿瘤',
          count: 30,
          topCount: 19
        },
        {
          key: '2',
          cause: '心血管疾病',
          count: 30,
          topCount: 11
        },
        {
          key: '3',
          cause: '阿尔茨海默氏症和其他痴呆症',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '消化系统疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '5',
          cause: '慢性呼吸道疾病',
          count: 26,
          topCount: 0
        },
        {
          key: '6',
          cause: '下呼吸道感染',
          count: 4,
          topCount: 0
        }
      ]
    },
  ]

  // 大洋洲
  const OceanicData = [
    {
      country: '澳大利亚',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 22
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 8
        },
        {
          key: '3',
          cause: '阿尔茨海默氏症和其他痴呆症',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '慢性呼吸道疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '5',
          cause: '消化系统疾病',
          count: 30,
          topCount: 0
        }
      ]
    },
    {
      country: '新西兰',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '肿瘤',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '慢性呼吸道疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '阿尔茨海默氏症和其他痴呆症',
          count: 29,
          topCount: 0
        },
        {
          key: '5',
          cause: '消化系统疾病',
          count: 23,
          topCount: 0
        },
        {
          key: '6',
          cause: '下呼吸道感染',
          count: 7,
          topCount: 0
        }
        ,
        {
          key: '7',
          cause: '道路交通伤害',
          count: 1,
          topCount: 0
        }
      ]
    },
    {
      country: '斐济',
      infos: [
        {
          key: '1',
          cause: '心血管疾病',
          count: 30,
          topCount: 30
        },
        {
          key: '2',
          cause: '糖尿病',
          count: 30,
          topCount: 0
        },
        {
          key: '3',
          cause: '肿瘤',
          count: 30,
          topCount: 0
        },
        {
          key: '4',
          cause: '慢性呼吸道疾病',
          count: 30,
          topCount: 0
        },
        {
          key: '5',
          cause: '慢性肝脏疾病',
          count: 15,
          topCount: 0
        },
        {
          key: '6',
          cause: '下呼吸道感染',
          count: 14,
          topCount: 0
        },
        {
          key: '7',
          cause: '新生儿疾病',
          count: 1,
          topCount: 0
        }
      ]
    },
  ]

  const africaBtn = () => {
    window.scrollTo({
      top: 1800,
      behavior: 'smooth'
    })
  }
  const northBtn = () => {
    window.scrollTo({
      top: 2920,
      behavior: 'smooth'
    })
  }
  const southBtn = () => {
    window.scrollTo({
      top: 4000,
      behavior: 'smooth'
    })
  }
  const EuropeBtn = () => {
    window.scrollTo({
      top: 5000,
      behavior: 'smooth'
    })
  }
  const oneaciaBtn = () => {
    window.scrollTo({
      top: 6560,
      behavior: 'smooth'
    })
  }

  return (
    <div className="content">
      <div className="tip">
        <Button type="primary" className="btn">
          亚洲
        </Button>
        <Button type="primary" className="btn" onClick={africaBtn}>
          非洲
        </Button>
        <Button type="primary" className="btn" onClick={northBtn}>
          北美洲
        </Button>
        <Button type="primary" className="btn" onClick={southBtn}>
          南美洲
        </Button>
        <Button type="primary" className="btn" onClick={EuropeBtn}>
          欧洲
        </Button>
        <Button type="primary" className="btn" onClick={oneaciaBtn}>
          大洋洲
        </Button>
      </div>

      <h1 className="title">亚洲</h1>
      <div className="countryContainer" >
        {
          AsiaData.map((item, index) => (
            <div className="card" key={index}>
              <h1>{item.country}</h1>
              <Table className="table" size="small" columns={Columns} dataSource={item.infos} pagination={false} bordered />
            </div>
          ))
        }
      </div>

      <h1 className="title">非洲</h1>
      <div className="countryContainer" >
        {
          AfricaData.map((item, index) => (
            <div className="card" key={index}>
              <h1>{item.country}</h1>
              <Table className="table" size="small" columns={Columns} dataSource={item.infos} pagination={false} bordered />
            </div>
          ))
        }
      </div>

      <h1 className="title">北美洲</h1>
      <div className="countryContainer" >
        {
          NorthData.map((item, index) => (
            <div className="card" key={index}>
              <h1>{item.country}</h1>
              <Table className="table" size="small" columns={Columns} dataSource={item.infos} pagination={false} bordered />
            </div>
          ))
        }
      </div>

      <h1 className="title">南美洲</h1>
      <div className="countryContainer" >
        {
          SouthData.map((item, index) => (
            <div className="card" key={index}>
              <h1>{item.country}</h1>
              <Table className="table" size="small" columns={Columns} dataSource={item.infos} pagination={false} bordered />
            </div>
          ))
        }
      </div>

      <h1 className="title">欧洲</h1>
      <div className="countryContainer" >
        {
          EuropeData.map((item, index) => (
            <div className="card" key={index}>
              <h1>{item.country}</h1>
              <Table className="table" size="small" columns={Columns} dataSource={item.infos} pagination={false} bordered />
            </div>
          ))
        }
      </div>

      <h1 className="title">大洋洲</h1>
      <div className="countryContainer" >
        {
          OceanicData.map((item, index) => (
            <div className="card" key={index}>
              <h1>{item.country}</h1>
              <Table className="table" size="small" columns={Columns} dataSource={item.infos} pagination={false} bordered />
            </div>
          ))
        }
      </div>
      <BackTop style={{ right: 25 }} />
    </div>
  )
}
