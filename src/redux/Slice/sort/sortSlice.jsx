import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allDocuments: [],
  clonedDocuments: [],
  sort: 'low-price',
}

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    SAVE_ALL_DOUMENTS(state, action) {
      state.allDocuments = action.payload
      state.clonedDocuments = action.payload
      state.clonedDocuments = state.allDocuments.sort(
        (a, b) => a.price - b.price
      )
    },
    SORT_DOCUMENTS(state, action) {
      console.log(action.payload)

      if (action.payload === 'high-price') {
        state.clonedDocuments = state.allDocuments.sort(
          (a, b) => b.price - a.price
        )
        state.sort = action.payload
        return
      } else if (action.payload === 'low-price') {
        state.clonedDocuments = state.allDocuments.sort(
          (a, b) => a.price - b.price
        )
        state.sort = action.payload
        return
      } else if (action.payload === 'latest') {
        state.clonedDocuments = state.allDocuments.sort(
          (a, b) => b.createdAt.seconds - a.createdAt.seconds
        )
        state.sort = action.payload
        return
      }

      // if (action.payload === 'ratings') {
      //   console.log('ratings')
      //   return
      // }
      else {
        state.clonedDocuments = state.allDocuments.filter(item =>
          item.name.toLowerCase().includes(action.payload.toLowerCase())
        )
      }
    },
  },
})

export const { SAVE_ALL_DOUMENTS, SORT_DOCUMENTS } = sortSlice.actions

export default sortSlice.reducer
