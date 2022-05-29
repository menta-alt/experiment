import React, { Suspense } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import routes from '@/routes/'

import { Layout, Menu } from 'antd'
import { HomeFilled, TwitterCircleFilled, PieChartFilled, AreaChartOutlined, DotChartOutlined } from '@ant-design/icons'
import ErrorBoundary from '@/components/ErrorBoundary'
import './App.less'

const { Content, Sider } = Layout
const { SubMenu } = Menu

function App() {
  const element = useRoutes(routes)
  const navigate = useNavigate()

  // 跳转路由
  const switchRoutes = key => {
    switch (key) {
      case '静态图表':
        navigate('/world/static')
        break

      case '动态图表':
        navigate('/world/dynamic')
        break

      case '各大洲死亡率':
        navigate('/zhou/deathsum')
        break

      case '各大洲死亡原因top5':
        navigate('/zhou/top')
        break

      case '各国死亡率':
        navigate('/country/deathsum')
        break

      case '各国死亡原因top5':
        navigate('/country/top')
        break

      case '死亡原因地域性离散系数':
        navigate('/dispersion/base')
        break

      case '死亡原因稳定性离散系数':
        navigate('/dispersion/byyear')
        break

      case 'GDP与国家死亡率的关系':
        navigate('/gdp/deathrate')
        break

      case 'GDP与死亡率(体现总人数)':
        navigate('/gdp/addpeople')
        break

      case 'GDP与自然灾害':
        navigate('/gdp/nature')
        break

      case 'GDP与冲突和恐怖主义':
        navigate('/gdp/conflict')
        break

      case 'GDP与疟疾':
        navigate('/gdp/nueji')
        break

      case 'GDP与HIV':
        navigate('/gdp/hiv')
        break
        
      default:
        break
    }
  }

  // 处理路由跳转
  const handleRoutes = item => {
    switchRoutes(item.key)
  }

  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }} className="container">
        <Sider trigger={null}>
          <Menu
            defaultSelectedKeys={['世界']}
            mode="inline"
            // selectedKeys={[store.getState().nav]}
            onClick={handleRoutes}
          >
            <SubMenu key="世界" icon={<HomeFilled />} title="世界">
              <Menu.Item key="静态图表">静态图表</Menu.Item>
              <Menu.Item key="动态图表">动态图表</Menu.Item>
            </SubMenu>
            <SubMenu key="各大洲" icon={<PieChartFilled />} title="各大洲">
              <Menu.Item key="各大洲死亡率">各大洲死亡率</Menu.Item>
              <Menu.Item key="各大洲死亡原因top5">各大洲死亡原因top5</Menu.Item>
            </SubMenu>
            <SubMenu key="各个国家" icon={<TwitterCircleFilled />} title="各个国家">
              <Menu.Item key="各国死亡率">各国死亡率</Menu.Item>
              <Menu.Item key="各国死亡原因top5">各国死亡原因top5</Menu.Item>
            </SubMenu>
            <SubMenu key="离散系数" icon={<AreaChartOutlined />} title="离散系数">
              <Menu.Item key="死亡原因地域性离散系数">死亡原因地域性离散系数</Menu.Item>
              <Menu.Item key="死亡原因稳定性离散系数">死亡原因稳定性离散系数</Menu.Item>
            </SubMenu>
            <SubMenu key="GDP" icon={<DotChartOutlined />} title="GDP">
              <Menu.Item key="GDP与国家死亡率的关系">GDP与国家死亡率的关系</Menu.Item>
              <Menu.Item key="GDP与死亡率(体现总人数)">GDP与死亡率(体现总人数)</Menu.Item>
              <Menu.Item key="GDP与自然灾害">GDP与自然灾害</Menu.Item>
              <Menu.Item key="GDP与冲突和恐怖主义">GDP与冲突和恐怖主义</Menu.Item>
              <Menu.Item key="GDP与疟疾">GDP与疟疾</Menu.Item>
              <Menu.Item key="GDP与HIV">GDP与HIV</Menu.Item>
            </SubMenu>
          </Menu>
          <div className="footer"></div>
        </Sider>

        <Layout className="right-layout">
          <Content className="mainContent">
            <div>
              <ErrorBoundary>
                <Suspense fallback={<></>}>
                  {/* 注册路由 */}
                  {element}
                </Suspense>
              </ErrorBoundary>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
