import React, { useState, useEffect } from 'react'
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import './index.less'
import Mask from './component/Mask'

const { Search } = Input

const data1 = [
  {
    key: 1,
    role: `管理员`,
    principal: `胡萌宇`,
    rights: '查看所有数据'
  },
  {
    key: 2,
    role: `管理员`,
    principal: `单梦琪`,
    rights: '查看所有数据'
  },
  {
    key: 3,
    role: `管理员`,
    principal: `罗成伟`,
    rights: '查看所有数据'
  },
  {
    key: 4,
    role: `管理员`,
    principal: `秦伟`,
    rights: '查看所有数据'
  }
]

// 创建表格的单元格
const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

// 创建表格组件
const EditableTable = props => {
  const { setClickAdd, data, setData } = props
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('')
  const [result, setResult] = useState()
  const [isSearch, setIsSearch] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const isEditing = record => record.key === editingKey

  const edit = record => {
    form.setFieldsValue({
      title: '',
      url: '',
      status: '',
      ...record
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async key => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex(item => key === item.key)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }


  const doDelete = record => {
    let res = data.filter((item) => ( item.key !== record.key ))
    setData(res)
  }

  // 列的配置
  const columns = [
    {
      title: '角色',
      dataIndex: 'role',
      align: 'center',
      width: '15%'
    },
    {
      title: '负责人',
      dataIndex: 'principal',
      width: '15%',
      align: 'center',
      editable: true
    },
    {
      title: '权限',
      dataIndex: 'rights',
      align: 'center',
      width: '25%'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: '39%',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8
              }}
            >
              保存
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>删除</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button
              type="primary"
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{
                marginRight: 15,
                width: 70
              }}
            >
              Edit
            </Button>

            <Button
              type="primary"
              danger
              style={{
                width: 70
              }}
              onClick={() => doDelete(record)}
            >
              delete
            </Button>
          </span>
        )
      }
    }
  ]

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'readCount' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })

  // 处理搜索获得内容
  const onSearch = value => {
    const newResult = data.filter(item => (item.rights.includes(value) || item.role.includes(value) || item.principal.includes(value)))
    setResult(newResult)
    setIsSearch(true)
  }

  // 处理点击添加
  const addHandler = () => {
    setClickAdd(true)
  }

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 处理删除
  const deleteHandler = record => {
    let res = data.filter((item) => ( !record.includes(item.key) ))
    setData(res)
  }
  return (
    <Form form={form} component={false}>
      <div className="tableTop">
        <div className="actionBtn">
          <Button className="deleteBtn" type="primary" danger icon={<DeleteOutlined />} onClick={() => deleteHandler(selectedRowKeys)}>
            删除
          </Button>
          <Button className="addBtn" icon={<PlusOutlined />} style={{ background: '#65CFB9', borderColor: '#65CFB9', color: 'white' }} onClick={addHandler}>
            添加
          </Button>
        </div>

        <div>
          <Search placeholder="请输入关键词" onSearch={onSearch} enterButton className="searchInput" />
          <Button
            type="primary"
            className="showAllBtn"
            onClick={() => {
              onSearch('')
            }}
          >
            刷新
          </Button>
        </div>
      </div>
      <Table
        components={{
          body: {
            cell: EditableCell
          }
        }}
        bordered
        dataSource={isSearch ? result : data}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowSelection={rowSelection}
      />
    </Form>
  )
}

export default function RoleManage() {
  const [clickAdd, setClickAdd] = useState(false)
  const [data, setData] = useState(data1)

  // 处理添加一行数据到表格
  const onFinish = values => {
    console.log("values", values);
    let newData = {
      key: data.length,
      role: values.role,
      principal: values.principal,
      rights: values.rights.join('、')
    }
    setData([newData, ...data])
    setClickAdd(false)
  }

  return (
    <div>
      <EditableTable 
        setClickAdd={setClickAdd}
        data={data} 
        setData={setData} 
      />
      <Mask
        clickAdd={clickAdd}
        setClickAdd={setClickAdd}
        onFinish={onFinish}
      />
    </div>
  )
}
