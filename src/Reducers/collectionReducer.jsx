export const collectionReducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOADING': {
      return { ...state, loading: true }
    }
    case 'LOAD_DATA': {
      return {
        ...state,
        loading: false,
        documents: action.payload,
        success: true,
      }
    }

    default:
      return state
  }
}
