import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const StaticTop = lazy(() => import('@/pages/World/StaticTop/'))
const DynamicTop = lazy(() => import('@/pages/World/DynamicTop/'))
const ZhouCauseTop = lazy(() => import('@/pages/Zhou/ZhouCauseTop/'))
const ZhouDeathSum = lazy(() => import('@/pages/Zhou/ZhouDeathSum/'))
const CountryCauseTop = lazy(() => import('@/pages/Country/CountryCauseTop/'))
const CountryDeathSum = lazy(() => import('@/pages/Country/CountryDeathSum/'))
const GDPDeathRate = lazy(() => import('@/pages/GDP/DeathRate/'))
const AddPeopleNumber = lazy(() => import('@/pages/GDP/AddPeopleNumber/'))
const NueJi = lazy(() => import('@/pages/GDP/NueJi/'))
const HIV = lazy(() => import('@/pages/GDP/HIV/'))
const Conflict = lazy(() => import('@/pages/GDP/Conflict/'))
const Nature = lazy(() => import('@/pages/GDP/Nature/'))
const BaseDispersion = lazy(() => import('@/pages/Dispersion/BaseDispersion/'))
const DispersionByear = lazy(() => import('@/pages/Dispersion/DispersionByYear/'))

const routes = [
  {
    path: '/world/static',
    element: <StaticTop/>
  },
  {
    path: '/world/dynamic',
    element: <DynamicTop/>
  },
  {
    path: '/zhou/top',
    element: <ZhouCauseTop/>
  },
  {
    path: '/zhou/deathsum',
    element: <ZhouDeathSum/>
  },
  {
    path: '/country/top',
    element: <CountryCauseTop/>
  },
  {
    path: '/country/deathsum',
    element: <CountryDeathSum/>
  },
  {
    path: '/dispersion/base',
    element: <BaseDispersion/>
  },
  {
    path: '/dispersion/byyear',
    element: <DispersionByear/>
  },
  {
    path: '/gdp/deathrate',
    element: <GDPDeathRate/>
  },
  {
    path: '/gdp/addpeople',
    element: <AddPeopleNumber/>
  },
  {
    path: '/gdp/nueji',
    element: <NueJi/>
  },
  {
    path: '/gdp/hiv',
    element: <HIV/>
  },
  {
    path: '/gdp/conflict',
    element: <Conflict/>
  },
  {
    path: '/gdp/nature',
    element: <Nature/>
  },
  {
    path: '/',
    element: <Navigate to="/world/static"/> 
  }
]

export default routes