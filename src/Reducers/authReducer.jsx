export const authReducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOADING': {
      return { ...state, loading: true }
    }
    case 'LOGIN': {
      return {
        ...state,
        user: action.payload,

        loading: false,
      }
    }
    case 'LOGOUT': {
      return { ...state, user: null, loading: false }
    }
    case 'AUTH_IS_READY': {
      return { user: action.payload, authIsReady: true, loading: false }
    }
    default:
      return state
  }
}
