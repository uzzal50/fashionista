import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id
      )
      if (productIndex >= 0) {
        state.cartItems[productIndex].quantity = action.payload.quantity
      } else {
        const tempProduct = { ...action.payload }
        state.cartItems.push(tempProduct)
      }

      //add to local Storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    TOGGLE_QTY(state, action) {
      if (action.payload.value === 'inc') {
        const tempProduct = state.cartItems.findIndex(
          item => item.id === action.payload.id
        )

        if (tempProduct >= 0) {
          if (
            state.cartItems[tempProduct].quantity <
            state.cartItems[tempProduct].inStock
          ) {
            state.cartItems[tempProduct].quantity += 1
          }

          //Due to this code i was getting error like adding in cart 45 when there is 9 items in cart
          // else {
          //   state.cartItems[tempProduct].quantity =
          //     state.cartItems[tempProduct].inStock
          // }
        }
      }

      if (action.payload.value === 'dec') {
        const tempProduct = state.cartItems.findIndex(
          item => item.id === action.payload.id
        )
        if (tempProduct >= 0) {
          let res = (state.cartItems[tempProduct].quantity -= 1)
          if (res === 0) {
            state.cartItems[tempProduct].quantity = 1
          }
        }
      }
    },

    REMOVE_CART_ITEM(state, action) {
      console.log(action)
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      )
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    CALCULATE_TOTAL(state, action) {
      if (state.cartItems.length >= 1) {
        let { totalAmount, totalQuantity } = state.cartItems.reduce(
          (total, acc) => {
            total.totalAmount += acc.price * acc.quantity
            total.totalQuantity += parseInt(acc.quantity)

            return total
          },
          {
            totalAmount: 0,
            totalQuantity: 0,
          }
        )
        state.cartTotalAmount = totalAmount
        state.cartTotalQuantity = totalQuantity
      } else {
        state.cartTotalAmount = 0
        state.cartTotalQuantity = 0
      }
    },

    CLEAR_CART(state, action) {
      state.cartItems = []
      //to remove from local storage
      localStorage.removeItem('cartItems')
    },
  },
})

export const {
  ADD_TO_CART,
  TOGGLE_QTY,
  REMOVE_CART_ITEM,
  CALCULATE_TOTAL,
  CLEAR_CART,
} = cartSlice.actions

export default cartSlice.reducer
