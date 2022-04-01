const initialState = {
  listProject: [
    { categoryId: 1, categoryName: 'Dự án phần mềm', description: '<p>ch&agrave;o bạn</p>' },
  ],
  lstTask: [],
  listGetAllProject: [],
  listGetAlTaskType: [],
  listPriority: [],
  listStatus: [],
  taskDetail: {
  },
}

export const ProjectCyberBugs = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_API_CYBERBUGS': {
      state.listProject = action.listProject
      return { ...state }
    }
    case 'GET_PROJECT_DETAIL':
      return { ...state, lstTask: action.lstTask }

    case 'GET_ALL_PROJECT':
      return { ...state, listGetAllProject: action.listProject }

    case 'GET_ALL_TASK_TYPE':
      return { ...state, listGetAlTaskType: action.ListTaskType }

    case 'GET_PRIORITY':
      return { ...state, listPriority: action.listPriority }

    case 'GET_ALL_STATUS':
      return { ...state, listStatus: action.listStatus }

    case 'GET_TASK_DETAIL':
      state.taskDetail = action.taskId
      return { ...state }

    case 'UPDATE_TASK':
      const { name, value } = action
      return { ...state,taskDetail:{...state.taskDetail,[name]:value} }

    default:
      return { ...state }
  }
}
