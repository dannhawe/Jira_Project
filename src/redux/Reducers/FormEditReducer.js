const initialState = {
  projectEdit: {
    id: 0,
    projectName: 'string',
    creator: 0,
    description: 'string',
    categoryId: '2',
  },
}

export const FormEditReducer = (state = initialState, action) => {
  switch (action.type) {
      case "EDIT_PROJECT":{
          return{...state,projectEdit:action.projectEdit}
      }
        
    default:
      return state
  }
}
