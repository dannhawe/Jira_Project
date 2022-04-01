import { DISPLAY_LOADING, DISPLAY_OFF_LOADING } from "./Constants/LoadingConsts"

const initialState = {
  isLoading: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
      state.isLoading = true
      return { ...state }
    }

    // eslint-disable-next-line no-duplicate-case
    case DISPLAY_OFF_LOADING:{
        state.isLoading = false
      return { ...state }
    }
    default:
      return state
  }
}
