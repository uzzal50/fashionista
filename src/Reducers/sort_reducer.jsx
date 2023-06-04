export const sortReducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOADING': {
      return { ...state, loading: true }
    }
    case 'LOAD_DATA': {
      return {
        ...state,
        sorted_products: action.payload,
        all_products: action.payload,
        success: true,
        loading: false,
      }
    }
    case 'UPDATE_SORT': {
      return {
        ...state,
        sort: action.payload,
      }
    }

    case 'SEARCH_TERM': {
      console.log(action.payload)
      let temp = state.all_products.filter(item => {
        return item.name.toLowerCase().includes(action.payload.toLowerCase())
      })
      console.log(temp)
      return {
        ...state,
        sorted_products: temp,
      }
    }
    case 'SORT_PRODUCTS': {
      if (state.all_products) {
        let tempProducts = state.sorted_products
        if (state.sort === 'high-price') {
          tempProducts = tempProducts.sort((a, b) => b.price - a.price)

          return { ...state, sorted_products: tempProducts }
        }
        if (state.sort === 'low-price') {
          tempProducts = tempProducts.sort((a, b) => a.price - b.price)
          return { ...state, sorted_products: tempProducts }
        }
        if (state.sort === 'latest') {
          tempProducts = tempProducts.sort(
            (a, b) => b.createdAt.seconds - a.createdAt.seconds
          )
          return { ...state, sorted_products: tempProducts }
        }

        if (state.sort === 'ratings') {
        }
      }

      return state
    }

    default:
      return state
  }
}
