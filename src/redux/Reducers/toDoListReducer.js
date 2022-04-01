import { GET_TASK_IPA } from '../Constants/toDoListConstants'

const initialState = {
  taskList: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_IPA: {
      return { ...state, taskList:action.taskList }
    }

    default:
      return state
  }
}
// let { status, data } = yield call(TodoListService.getTaskApi)
    
// yield put({
//   type: GET_TASK_IPA,
//   taskList: data,
// })
// console.log(action)