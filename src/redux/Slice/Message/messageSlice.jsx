import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showMsg: false,
  text: null,
  type: null,
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    OPEN_MESSAGE(state, action) {
      state.showMsg = true
      state.text = action.payload.text
      state.type = action.payload.type
      window.scroll({
        top: 0,
        behavior: 'smooth',
      })
    },
    CLOSE_MESSAGE(state, action) {
      state.showMsg = false
    },
  },
})

export const { OPEN_MESSAGE, CLOSE_MESSAGE } = messageSlice.actions

export default messageSlice.reducer
