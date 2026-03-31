import { configureStore } from '@reduxjs/toolkit'
import heroReducer from './features/heroSlice'

export const store = configureStore({
  reducer: {
    hero: heroReducer,
  },
})
