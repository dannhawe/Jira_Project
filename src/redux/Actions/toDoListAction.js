import axios from 'axios'
import { delay } from 'redux-saga/effects'
import { GET_TASK_IPA } from '../Constants/toDoListConstants'

export const getTaskListApi = () => {
  return async (dispatch) => {
    try {
      let { data, status, ...res } = await axios({
        url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
        method: 'GET',
      })

      dispatch({
        type:"DISPLAY_LOADING"
      })

      if (status === 200) {
        dispatch({
          type: GET_TASK_IPA,
          taskList: data,
        })
      }
      delay(10001)
      dispatch({
        type:"DISPLAY_OFF_LOADING"
      })
    } catch (err) {
      console.log(err.response.data)
    }
    // promise.then((result) => {
    //   dispatch({
    //     type: GET_TASK_IPA,
    //     taskList: result.data,
    //   })
    // })

    // promise.catch((err) => {
    //   console.log('thất bại')
    // })
  }
}

export const addTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
      method: 'POST',
      data: { taskName: taskName },
    })

    //Xử lý thành công
    promise.then((result) => {
      // alert(result.data);
      dispatch(getTaskListApi())
    })

    //Xử lý thất bại
    promise.catch((errors) => {
      alert(errors.response.data)
    })
  }
}

export const deleteTaskApi = (taskName) => {
  return async (dispatch) => {
    try {
      let { data, status, ...res } = await axios({
        url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
        method: 'DELETE',
      })
      if (status === 200) {
        dispatch(getTaskListApi())
      }
    } catch (err) {
      console.log(err.response.data)
    }
  }
}

export const checkTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: 'PUT',
    })

    promise.then((res) => {
      dispatch(getTaskListApi())
    })

    promise.catch((err) => {
      alert(err.response.data)
    })
  }
}

export const rejectTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: 'PUT',
    })

    promise.then((res) => {
      dispatch(getTaskListApi())
    })

    promise.catch((err) => {
      alert(err.response.data)
    })
  }
}
