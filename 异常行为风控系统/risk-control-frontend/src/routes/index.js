import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Home = lazy(() => import('@/pages/Home'))
const DataBoard = lazy(() => import('@/pages/DataBoard'))
const RoleManage = lazy(() => import('@/pages/RoleManage'))


const routes = [
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/databoard',
    element: <DataBoard/>
  },
  {
    path: '/role',
    element: <RoleManage/>
  },
  {
    path: '/',
    element: <Navigate to="/home"/> 
  }
]

export default routes
