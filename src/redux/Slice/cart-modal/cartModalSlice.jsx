import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isModalOpen: false,
  quickView: false,
  data: {},
  searchModal: false,
}

const cartModalSlice = createSlice({
  name: 'cart-modal',
  initialState,
  reducers: {
    OPEN_CART_MODAL(state, action) {
      state.isModalOpen = true
    },
    CLOSE_CART_MODAL(state, action) {
      state.isModalOpen = false
    },
    OPEN_QUICK_VIEW(state, action) {
      state.quickView = true
    },
    CLOSE_QUICK_VIEW(state, action) {
      state.quickView = false
      state.data = {}
    },
    ADD_QUICK_MODAL_DOCUMENT(state, action) {
      state.data = action.payload
    },

    OPEN_SEARCH_MODAL(state, action) {
      state.searchModal = open
    },
    CLOSE_SEARCH_MODAL(state, action) {
      state.searchModal = false
    },
  },
})

export const {
  OPEN_CART_MODAL,
  CLOSE_CART_MODAL,
  OPEN_QUICK_VIEW,
  ADD_QUICK_MODAL_DOCUMENT,
  CLOSE_QUICK_VIEW,
  OPEN_SEARCH_MODAL,
  CLOSE_SEARCH_MODAL,
} = cartModalSlice.actions

export default cartModalSlice.reducer
