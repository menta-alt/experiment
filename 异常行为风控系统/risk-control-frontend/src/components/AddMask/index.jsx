import React from 'react'
import { Form, Input, Button, Row, Col } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './index.less'

const { TextArea } = Input

export default function AddMask(props) {
  const { clickAdd, setClickAdd, title, info, onFinish } = props

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const maskHandler = () => {
    setClickAdd(false)
  }

  return (
    <div className={clickAdd ? 'addMask' : 'nomask'}>
      <div className="addCard">
        <div className="top">
          <h3>{title}</h3>
          <CloseOutlined className="closeBtn" onClick={maskHandler} />
        </div>

        <Form
          name="addmask"
          labelCol={{
            span: 5
          }}
          wrapperCol={{
            span: 17
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {info.map((item, index) => (
            <Form.Item
              className='formItem'
              key={index}
              label={item.label}
              rules={[
                {
                  required: true
                }
              ]}
              shouldUpdate
            >
              {() => {
                if (title === '添加日志') {
                  // 必须外包一个Form.item
                  return (
                    <Form.Item name={item.name}>  
                      <TextArea rows={5} placeholder="请输入日志详情描述" />
                    </Form.Item>
                  )
                } else {
                  return (
                    <Form.Item name={item.name}>
                      <Input />
                    </Form.Item>
                  )
                }
              }}
            </Form.Item>
          ))}

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
  )
}
