import React, {useEffect, useState} from 'react'
import { Form, Input, Button, Row, Col, Select } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './index.less'

const { Option } = Select

export default function AddMask(props) {
  const { clickAdd, setClickAdd, onFinish } = props

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const maskHandler = () => {
    setClickAdd(false)
  }

  const onChange = value => {

  }

  return (
    <div className={clickAdd ? 'addMask' : 'nomask'}>
      <div className="addCard">
        <div className="top">
          <h3>添加角色</h3>
          <CloseOutlined className="closeBtn" onClick={maskHandler} />
        </div>

        <div className="formWrap">
          <Form 
            className="form" 
            name="addmask" 
            onFinish={onFinish} 
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="role" className="formitem" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="请选择角色"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              >
                <Option value="管理员">管理员</Option>
                <Option value="访客">访客</Option>
              </Select>
            </Form.Item>

            <Form.Item name="principal" className="formitem" rules={[{ required: true }]}>
              <Input placeholder="请填写负责人姓名" />
            </Form.Item>

            <Form.Item 
              name="rights" 
              className="formitem" 
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                size="middle"
                placeholder="请选择该角色的权限"
                style={{
                  width: '100%'
                }}
              >
                <Option value="查看所有数据">查看所有数据</Option>
                <Option value="修改数据">修改数据</Option>
                <Option value="仅可查看数据">仅可查看数据</Option>
                <Option value="仅可查看首页数据">仅可查看首页数据</Option>
              </Select>
            </Form.Item>

            <Row>
              <Col
                span={24}
                style={{
                  textAlign: 'right'
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginRight: '10px'
                  }}
                >
                  添加
                </Button>
                <Button onClick={maskHandler}>取消</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  )
}
