import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  data: [],
  saleData: [],
  success: false,
}

const PopularSlice = createSlice({
  name: 'Popular',
  initialState,
  reducers: {
    LOAD_POPULAR(state, action) {
      state.data = action.payload
    },
    LOAD_SALE(state, action) {
      state.saleData = action.payload
    },
  },
})

export const { LOAD_POPULAR, LOAD_SALE } = PopularSlice.actions

export default PopularSlice.reducer
