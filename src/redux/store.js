import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import cartReducer from './Slice/cart/cartSlice'
import cartModalReducer from './Slice/cart-modal/cartModalSlice'
import checkOutReducer from './Slice/checkout/checkOutSlice'
import popularReducer from './Slice/popular/PopularSlice'
import orderReducer from './Slice/Order/orderSlice'
import messageReducer from './Slice/Message/messageSlice'

const rootReducer = combineReducers({
  cart: cartReducer,
  popular: popularReducer,
  cartModal: cartModalReducer,
  checkout: checkOutReducer,
  order: orderReducer,
  message: messageReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
