const historyState = {
  history: {},
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = historyState, action) => {
  switch (action.type) {
    case 'ADD_HISTORY': {
        console.log(action.history)
      state.history = action.history
      return { ...state }
    }

    default:
      return { ...state }
  }
}
