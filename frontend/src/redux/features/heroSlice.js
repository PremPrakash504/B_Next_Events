import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchHero = createAsyncThunk('hero/fetch', async () => {
  const res = await axios.get('http://localhost:5000/api/herosection/getHeroSection')
  return res.data
})

const heroSlice = createSlice({
  name: 'hero',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHero.pending, (state) => { state.loading = true })
      .addCase(fetchHero.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchHero.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default heroSlice.reducer
