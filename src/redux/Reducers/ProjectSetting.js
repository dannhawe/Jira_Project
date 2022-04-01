const stateDefault = {
  arrProject: [],
  arrUserSeach:[],
  arrSeachMember:[],
}

export const UserLoginProjectSetting = (state = stateDefault, action) => {
  switch (action.type) {
    case 'CALL_CATERGORY': {
    state.arrProject = action.arr
      return { ...state}
    }
    case 'USER_SEACH':
      return {...state,arrUserSeach:action.arrUserSeach}

      case 'GET_USER_BY_PROJECTID':
        return {...state,arrSeachMember:action.arrSeachMember}
    default:
      return { ...state }
  }
}
