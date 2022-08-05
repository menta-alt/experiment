import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  active_path: sessionStorage.getItem("activePath") || ['首页'],
  nav_path: (sessionStorage.getItem("nav") && JSON.parse(sessionStorage.getItem("nav"))) || []
}

export const navPathSlice = createSlice({
  name: 'navPath',
  initialState,
  reducers: {
    change_active_nav: (state, action) => {
      state.active_path = action.payload
    },
    set_nav_path: (state,action) => {
      state.nav_path = action.payload
    }
  }
})

export const {change_active_nav, set_nav_path} = navPathSlice.actions

export default navPathSlice.reducer