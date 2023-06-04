import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderDetails: [],
  copiedOrderDetails: [],
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    SAVE_ORDERS(state, action) {
      state.orderDetails = action.payload
      state.copiedOrderDetails = action.payload
    },

    SORT_ORDERS(state, action) {
      if (action.payload === 'all-orders') {
        state.copiedOrderDetails = state.orderDetails
      }

      if (action.payload === 'delivered') {
        state.copiedOrderDetails = state.orderDetails.filter(
          item => item.orderStatus === action.payload
        )
      }

      if (action.payload === 'placed-order') {
        state.copiedOrderDetails = state.orderDetails.filter(
          item => item.orderStatus === action.payload
        )
      }

      if (action.payload === 'processing') {
        state.copiedOrderDetails = state.orderDetails.filter(
          item => item.orderStatus === action.payload
        )
      }
    },
  },
})

export const { SAVE_ORDERS, SORT_ORDERS } = orderSlice.actions

export default orderSlice.reducer
