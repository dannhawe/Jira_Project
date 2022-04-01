import React from 'react'

const initialState = {
  visible: false,
  componentCyBerBugs: <p>áasasasa</p>,
  onsubmit: () => {
    alert('xin chao')
  },
}

export const ModalCyberBugs = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, visible: true }

    case 'CLOSE_MODAL':
      return { ...state, visible: false }

    case 'OPEN_MODAL_EDIT':
      return { ...state, visible: true, componentCyBerBugs: action.component }
    case 'FORM_EDIT':
      state.onsubmit = action.submit
      return { ...state }
    case 'CREATE_TASK': {
      state.visible = true
      state.componentCyBerBugs = action.projectCreate
      return{...state}
    }
    case 'SUBMIT_FORM_CREATE_TASK': {
      state.onsubmit = action.handleSubmit
      return{...state}
    }

    default:
      return state
  }
}
