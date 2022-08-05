import { configureStore } from '@reduxjs/toolkit'
import navPathReducer from './features/navPath/navPathSlice'

export const store = configureStore({
  reducer: {
    navPath: navPathReducer
  },
})