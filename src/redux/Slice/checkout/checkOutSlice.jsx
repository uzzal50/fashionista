import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  customerDetails: {},
  isCustomerDetailsFilled: false,
  isPaymentSuccess: false,
}

const checkOutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    SAVE_CUSTOMER_DETAILS(state, action) {
      state.customerDetails = action.payload
      state.isCustomerDetailsFilled = true
    },
    PAYMENT_SUCCESS(state, action) {
      state.isPaymentSuccess = true
    },
  },
})

export const { SAVE_CUSTOMER_DETAILS, PAYMENT_SUCCESS } = checkOutSlice.actions
export default checkOutSlice.reducer
