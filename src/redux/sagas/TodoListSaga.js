// eslint-disable-next-line require-yield
import axios from 'axios'
import { call, delay, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { todoListService } from '../../services/TodoListService'
import { STATUS_CODE } from '../../Util/Constants/settingSystem'
import { DISPLAY_LOADING, DISPLAY_OFF_LOADING } from '../Constants/LoadingConsts'
import {
  ADD_TASK_API,
  CHECK_TASK_API,
  DELETE_TASK_API,
  GET_TASKLIST_API,
  GET_TASK_IPA,
  REJECT_TASK_API,
} from '../Constants/toDoListConstants'

function* getTaskApi(action) {
  yield put({
    type: DISPLAY_LOADING,
  })

  try {
    let { status, data } = yield call(todoListService.getTaskApi)
    yield delay(200)
    if ((status = STATUS_CODE.SUCCESS)) {
      yield put({
        type: GET_TASK_IPA,
        taskList: data,
      })
    } else {
      console.log()
    }
  } catch (err) {
    console.log('err')
  }
  yield put({
    type: DISPLAY_OFF_LOADING,
  })
}

export function* theoDoiActionGetTaskList() {
  yield takeLatest(GET_TASKLIST_API, getTaskApi)
}

function* addTask(action) {
  try {
    const { data, status } = yield call(() => {
      return todoListService.addTaskApi(action.taskName)
    })
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      })
    }
  } catch (err) {
    console.log(err)
  }
}
export function* theoDoiActionGetAddTask() {
  yield takeLatest(ADD_TASK_API, addTask)
}

function* deleteTask(action) {
  try {
    const { data, status } = yield call(() => {
      return todoListService.deleteTaskApi(action.taskName)
    })
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      })
    }
  } catch (err) {
    console.log(err)
  }
}
export function* theoDoiActionGetDeleteTask() {
  yield takeLatest(DELETE_TASK_API, deleteTask)
}

function* checkTask(action) {
  console.log(action)
  try {
    const { data, status } = yield call(() => {
      return todoListService.checkTaskApi(action.taskName)
    })
    console.log(status)
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      })
    }
  } catch (err) {
    console.log(err)
  }
}
export function* theoDoiActionGetcheckTask() {
  yield takeLatest(CHECK_TASK_API, checkTask)
}

function* rejectTask(action) {
  console.log(action)
  try {
    const { data, status } = yield call(() => {
      return todoListService.rejeckTaskApi(action.taskName)
    })
    console.log(status)
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      })
    }
  } catch (err) {
    console.log(err)
  }
}
export function* theoDoiActionGetRejectTask() {
  yield takeLatest(REJECT_TASK_API, rejectTask)
}

