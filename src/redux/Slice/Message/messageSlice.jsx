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
      console.log(action.payload)
      state.showMsg = true
      state.text = action.payload.text
      state.type = action.payload.type
    },
    CLOSE_MESSAGE(state, action) {
      state.showMsg = false
      state.text = null
      state.type = null
    },
  },
})

export const { OPEN_MESSAGE, CLOSE_MESSAGE } = messageSlice.actions

export default messageSlice.reducer
