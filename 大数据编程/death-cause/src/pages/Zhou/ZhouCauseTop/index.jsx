import React from 'react'
import { Table } from 'antd';
import './index.less'

export default function ZhouCauseTop() {
  // 非洲
  const AfricaColumns = [
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
  ];
  const AfricaData = [
    {
      key: '1',
      cause: '心血管疾病',
      count: 30,
      topCount: '15(2008-2019)',
    },
    {
      key: '2',
      cause: '新生儿疾病',
      count: 30,
      topCount: 0,
    },
    {
      key: '3',
      cause: '下呼吸道感染',
      count: 30,
      topCount: 0,
    },
    {
      key: '4',
      cause: '肿瘤',
      count: <span style={{ color: 'red'}}>2</span>,
      topCount: 0,
    },
    {
      key: '5',
      cause: <span style={{ color: 'red'}}>艾滋病</span>,
      count: 25,
      topCount: '9(1999-2007)',
    },
    {
      key: '6',
      cause: <span style={{ color: 'red'}}>腹泻病</span>,
      count: 28,
      topCount: '6(1990-1995)',
    },
    {
      key: '7',
      cause: <span style={{ color: 'red'}}>疟疾</span>,
      count: 5,
      topCount: 0,
    }
  ];

  // 亚洲
  const AsiaColumns = [
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
  ];
  const AsiaData = [
    {
      key: '1',
      cause: '心血管疾病',
      count: 30,
      topCount: 30,
    },
    {
      key: '2',
      cause: '肿瘤',
      count: 30,
      topCount: 0,
    },
    {
      key: '3',
      cause: '慢性呼吸道疾病',
      count: 30,
      topCount: 0,
    },
    {
      key: '4',
      cause: '下呼吸道感染',
      count: 29,
      topCount: 0,
    },
    {
      key: '5',
      cause: '新生儿疾病',
      count: 25,
      topCount: 0,
    },
    {
      key: '6',
      cause: '消化系统疾病',
      count: 6,
      topCount: 0,
    }
  ];

  // 欧洲
  const EuropeColumns = [
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
  ];
  const EuropeData = [
    {
      key: '1',
      cause: '心血管疾病',
      count: 30,
      topCount: 30,
    },
    {
      key: '2',
      cause: '肿瘤',
      count: 30,
      topCount: 0,
    },
    {
      key: '3',
      cause: '消化系统疾病',
      count: 30,
      topCount: 0,
    },
    {
      key: '4',
      cause: '慢性呼吸道疾病',
      count: 30,
      topCount: 0,
    },
    {
      key: '5',
      cause: <span style={{ color: '#ffa940'}}>阿尔茨海默氏症和其他痴呆症</span>,
      count: 25,
      topCount: 0,
    },
    {
      key: '6',
      cause: '下呼吸道感染',
      count: 5,
      topCount: 0,
    }
  ];

  // 美洲
  const AmericasColumns = [
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
  ];
  const AmericasData = [
    {
      key: '1',
      cause: '心血管疾病',
      count: 30,
      topCount: 30,
    },
    {
      key: '2',
      cause: '肿瘤',
      count: 30,
      topCount: 0,
    },
    {
      key: '3',
      cause: '慢性呼吸道疾病',
      count: 30,
      topCount: 0,
    },
    {
      key: '4',
      cause: '消化系统疾病',
      count: 30,
      topCount: 0,
    },
    {
      key: '5',
      cause: '下呼吸道感染',
      count: 17,
      topCount: 0,
    },
    {
      key: '6',
      cause: <span style={{ color: '#ffa940'}}>阿尔茨海默氏症和其他痴呆症</span>,
      count: 13,
      topCount: 0,
    }
  ];

  // 大洋洲
  const OceaniaColumns = [
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
  ];
  const OceaniaData = [
    {
      key: '1',
      cause: '心血管疾病',
      count: 30,
      topCount: 30,
    },
    {
      key: '2',
      cause: '肿瘤',
      count: 30,
      topCount: 0,
    },
    {
      key: '3',
      cause: '慢性呼吸道疾病',
      count: 30,
      topCount: 0,
    },
    {
      key: '4',
      cause: '下呼吸道感染',
      count: 30,
      topCount: 0,
    },
    {
      key: '5',
      cause: <span style={{ color: 'red'}}>糖尿病</span>,
      count: 15,
      topCount: 0,
    },
    {
      key: '6',
      cause: <span style={{ color: '#ffa940'}}>阿尔茨海默氏症和其他痴呆症</span>,
      count: 11,
      topCount: 0,
    },
    {
      key: '7',
      cause: '消化系统疾病',
      count: 4,
      topCount: 0,
    }
  ];

  return (
    <div className='zhouContainer'>
      <div className='card'>
        <h1>非洲</h1>
        <Table 
          className='table'
          size='small' 
          columns={AfricaColumns} 
          dataSource={AfricaData}
          pagination={false} 
          bordered />
      </div>
      
      <div className='card'>
        <h1>亚洲</h1>
        <Table 
          className='table'
          size='small' 
          columns={AsiaColumns} 
          dataSource={AsiaData}
          pagination={false} 
          bordered />
      </div>

      <div className='card'>
        <h1>欧洲</h1>
        <Table 
          className='table'
          size='small' 
          columns={EuropeColumns} 
          dataSource={EuropeData}
          pagination={false} 
          bordered />
      </div>

      <div className='card'>
        <h1>美洲</h1>
        <Table 
          className='table'
          size='small' 
          columns={AmericasColumns} 
          dataSource={AmericasData}
          pagination={false} 
          bordered />
      </div>

      <div className='card'>
        <h1>大洋洲</h1>
        <Table 
          className='table'
          size='small' 
          columns={OceaniaColumns} 
          dataSource={OceaniaData}
          pagination={false} 
          bordered />
      </div>
    </div>
  )
}
