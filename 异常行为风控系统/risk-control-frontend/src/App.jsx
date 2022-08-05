import React, { useState, Suspense, useEffect } from 'react'
import { Link, useRoutes, useNavigate } from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useSelector, useDispatch } from 'react-redux'
import { change_active_nav, set_nav_path } from './redux/features/navPath/navPathSlice'
import routes from '@/routes/'

import { Layout, Menu, Breadcrumb } from 'antd'
import { HomeFilled, MenuUnfoldOutlined, SettingFilled, FundFilled, TeamOutlined } from '@ant-design/icons'
import './App.less'
import '@/style/base.css'

const { Header, Content, Footer, Sider } = Layout

function App() {
  const dispatch = useDispatch()
  const navPath = useSelector(state => state.navPath.nav_path)
  const activePath = useSelector(state => state.navPath.active_path)

  const element = useRoutes(routes)
  const navigate = useNavigate()
  const [breadcrumb, setBreadcrumb] = useState(navPath)
  const [activeNavPath, setActiveNavPath] = useState(activePath)

  // 处理浏览器首次加载和刷新后高亮的问题!!!
  useEffect(() => {
    console.log("navPath",navPath[0]);

    switchRoutes(activePath)
  }, [])

  // 跳转路由
  const switchRoutes = key => {
    switch (key) {
      case '首页':
        navigate('/home')
        break

      case '数据看板':
        navigate('/databoard')
        break

      case '角色管理':
        navigate('/role')
        break

      default:
        break
    }
  }

  // 处理路由跳转
  const handleRoutes = item => {
    console.log('item', item)
    switchRoutes(item.key)

    setActiveNavPath(item.keyPath)

    dispatch(change_active_nav(item.key))
    sessionStorage.setItem('activePath', item.key)

    if (item.key !== '首页') {
      dispatch(set_nav_path(item.keyPath))
      setBreadcrumb(item.keyPath)
      console.log("key",item.keyPath);
      sessionStorage.setItem('nav', JSON.stringify(item.keyPath))
    } else {
      dispatch(set_nav_path([]))
      setBreadcrumb([])
      sessionStorage.setItem('nav', [])
    }
  }

  const menuItems = [
    {
      label: '首页',
      key: '首页',
      icon: <HomeFilled />
    },
    {
      label: '数据看板',
      key: '数据看板',
      icon: <FundFilled />
    },
    {
      label: '系统管理',
      key: '系统管理',
      icon: <SettingFilled />,
      children: [{ label: '角色管理', key: '角色管理', icon: <TeamOutlined /> }]
    },
  ]

  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }} className="container">
        <Sider trigger={null} collapsible>
          <Link to="/home" className="sidetop" onClick={() => dispatch(change_active_nav('/home'))}>
            <span className="sidetitle">异常交易行为风控系统</span>
          </Link>
          <Menu items={menuItems} theme="dark" defaultSelectedKeys={['首页']} mode="inline" selectedKeys={activeNavPath} onClick={handleRoutes} />
          <div className="footer"></div>
        </Sider>

        <Layout className="right-layout">
          <Header className="header">
            {React.createElement(MenuUnfoldOutlined, {
              className: 'trigger'
            })}

            {/* 面包板导航  */}
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>{breadcrumb[breadcrumb.length - 1]}</Breadcrumb.Item>
              <Breadcrumb.Item>{breadcrumb.length === 1 ? '' : breadcrumb[0]}</Breadcrumb.Item>
            </Breadcrumb>
          </Header>

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

          <Footer style={{ textAlign: 'center' }}>Designed By ELvira@2022</Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
