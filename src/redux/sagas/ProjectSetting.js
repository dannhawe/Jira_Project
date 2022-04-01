/* eslint-disable no-unreachable */
import { CyberBugService } from '../../services/CyberbugsService'
import { call, delay, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { STATUS_CODE } from '../../Util/Constants/settingSystem'
import { DISPLAY_LOADING, DISPLAY_OFF_LOADING } from '../Constants/LoadingConsts'
import { History } from '../../Util/Constants/history'
import { NotifiFunction } from '../../Components/Notification/Notifi'
import { attributesToProps } from 'html-react-parser'
import { useSelector } from 'react-redux'

function* ProjectSetting(action) {
  try {
    const { data, status } = yield call(() => CyberBugService.getAllProjectServices())
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'CALL_CATERGORY',
        arr: data.content,
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export function* theoDoiProjectSetting() {
  yield takeLatest('CALL_API_CATERGORY', ProjectSetting)
}

function* submidProjectSetting(action) {
  yield put({
    type: DISPLAY_LOADING,
  })
  yield delay(50)

  try {
    const { data, status } = yield call(() =>
      CyberBugService.submitFormAuthorization(action.newProject)
    )
    if (status === STATUS_CODE.SUCCESS) {
      History.push('/ProjectManager')
    }
  } catch (err) {
    console.log(err)
  }
  yield put({
    type: DISPLAY_OFF_LOADING,
  })
}

export function* theoDoiSubmitProjectSetting() {
  yield takeLatest('SUBMIT_PROJECT_SETTING', submidProjectSetting)
}

// saga use get AIP
function* getAPICyberBugs(action) {
  yield put({
    type: DISPLAY_LOADING,
  })
  yield delay(50)
  try {
    const { data, status } = yield call(() => CyberBugService.getAPICyberBugs())
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'GET_API_CYBERBUGS',
        listProject: data.content,
      })
    }
  } catch (err) {
    console.log(err)
  }
  yield put({
    type: DISPLAY_OFF_LOADING,
  })
}

export function* theoDoiGetAPI() {
  yield takeLatest('getAPICyberBugs', getAPICyberBugs)
}

// saga use get AIP
function* UpdateAPI(action) {
  yield put({
    type: DISPLAY_LOADING,
  })
  yield delay(50)
  try {
    const { data, status } = yield call(() => CyberBugService.updateAPICYberbugs(action.newProject))
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'getAPICyberBugs',
      })

      yield put({
        type: 'CLOSE_MODAL',
      })
    }
  } catch (err) {
    console.log(err)
  }
  yield put({
    type: DISPLAY_OFF_LOADING,
  })
}

export function* theoDoiUpdateAPI() {
  yield takeLatest('UPDATE_API', UpdateAPI)
}

function* DeleteAPI(action) {
  yield put({
    type: DISPLAY_LOADING,
  })
  yield delay(50)
  try {
    const { data, status } = yield call(() => CyberBugService.DeleteApi(action.id))
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'getAPICyberBugs',
      })
      NotifiFunction(
        'success',
        'delete is success',
        'xóa thành công rồi !!!!!!!!!!!!!!!!!!!!!!!!!!!'
      )
    }
  } catch (err) {
    NotifiFunction('error', 'delete is not success', 'xóa có được đâu !!!!!!!!!!!!!!!!!!!!!!!!!!!')
  }
  yield put({
    type: DISPLAY_OFF_LOADING,
  })
}

export function* theoDoiDeleteAPI() {
  yield takeLatest('DELETE_API', DeleteAPI)
}

function* SeachMember(action) {
  try {
    const { data, status } = yield call(() => CyberBugService.SeachMember(action.key))
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'USER_SEACH',
        arrUserSeach: data.content,
      })
    }
  } catch (err) {
    NotifiFunction('error', 'delete is not success', 'tìm có ra đâu !!!!!!!!!!!!!!!!!!!!!!!!!!!')
  }
}

export function* theoDoiSeachMember() {
  yield takeLatest('SEACH_MEMBER', SeachMember)
}

function* AddUser(action) {
  try {
    const { data, status } = yield call(() => CyberBugService.AddUser(action.UserAdd))
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'getAPICyberBugs',
      })
    }
  } catch (err) {
    NotifiFunction('error', 'addUser is not success', 'tìm có ra đâu !!!!!!!!!!!!!!!!!!!!!!!!!!!')
  }
}

export function* theoDoiAddUser() {
  yield takeLatest('ADD_USER', AddUser)
}

function* RemoveUser(action) {
  try {
    const { data, status } = yield call(() => CyberBugService.RemoveUser(action.USerRemove))
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'getAPICyberBugs',
      })
    }
  } catch (err) {
    NotifiFunction('error', 'Remove is not success', 'tìm có ra đâu !!!!!!!!!!!!!!!!!!!!!!!!!!!')
  }
}

export function* theoDoiRemoveUser() {
  yield takeLatest('REMOVE_USER_FOR_PROJECT', RemoveUser)
}

function* GetProjectDetail(action) {
  try {
    const { data, status } = yield call(() => CyberBugService.GetProjectDetail(action.id))
    console.log(data)
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'GET_PROJECT_DETAIL',
        lstTask: data.content,
      })
    }
  } catch (err) {
    console.log(err)
    History.push('/ProjectManager')
    
  }
}

export function* theoDoiGetProjectDetail() {
  yield takeLatest('GET_PROJECT_DETAIL_API', GetProjectDetail)
}

function* GetAllProject(action) {
  try {
    const { data, status } = yield call(() => CyberBugService.GetAllProjectAPI())
    console.log(data)
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'GET_ALL_PROJECT',
        listProject: data.content,
      })
      yield put({
        type: 'GET_USER_BY_PROJECTID_API',
        UserId: data.content[0].id,
      })
    }
  } catch (err) {
    if (err.response?.data.statusCode === 400) {
      yield put({
        type: 'GET_USER_BY_PROJECTID_API',
        arrSeachMember: [],
      })
    }
    NotifiFunction(
      'error',
      'Get Project is not success',
      'tìm có ra đâu !!!!!!!!!!!!!!!!!!!!!!!!!!!'
    )
  }
}
export function* theoDoiGetAllProject() {
  yield takeLatest('GET_ALL_PROJECT_API', GetAllProject)
}

function* GetAllTaskType(action) {
  try {
    const { data, status } = yield call(() => CyberBugService.GetAllTaskTypeAPI())
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'GET_ALL_TASK_TYPE',
        ListTaskType: data.content,
      })
    }
  } catch (err) {
    NotifiFunction(
      'error',
      'Get Project is not success',
      'tìm có ra đâu !!!!!!!!!!!!!!!!!!!!!!!!!!!'
    )
  }
}

export function* theoDoiGetAllTaskType() {
  yield takeLatest('GET_ALL_STATUS_API', GetAllTaskType)
}

function* GetPiority(action) {
  try {
    const { data, status } = yield call(() => CyberBugService.GetPriorityAPI())
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'GET_PRIORITY',
        listPriority: data.content,
      })
    }
  } catch (err) {
    NotifiFunction(
      'error',
      'Get Project is not success',
      'tìm có ra đâu !!!!!!!!!!!!!!!!!!!!!!!!!!!'
    )
  }
}

export function* theoDoiGetPriority() {
  yield takeLatest('GET_ALL_PRIORITY_API', GetPiority)
}

function* GetAllStatus(action) {
  try {
    const { data, status } = yield call(() => CyberBugService.GetAllStatusAPI())
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'GET_ALL_STATUS',
        listStatus: data.content,
      })
    }
  } catch (err) {
    NotifiFunction('error', 'not success', 'tìm có ra đâu !!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(err)
  }
}

export function* theoDoiGetAllStatus() {
  yield takeLatest('GET_ALL_STATUS_API', GetAllStatus)
}

function* GetUserByProjectId(action) {
  try {
    const { data, status } = yield call(() => CyberBugService.GetUserByProjectId(action.UserId))
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'GET_USER_BY_PROJECTID',
        arrSeachMember: data.content,
      })
    }
  } catch (err) {
    if (err.response?.data.statusCode === 400) {
      yield put({
        type: 'GET_USER_BY_PROJECTID',
        arrSeachMember: [],
      })
    }
  }
}

export function* theoDoiGetUserByProjectId() {
  yield takeLatest('GET_USER_BY_PROJECTID_API', GetUserByProjectId)
}

function* PostCreateTask(action) {
  console.log(action.UserPost)
  try {
    const { data, status } = yield call(() => CyberBugService.PostCreateTaskAPI(action.UserPost))
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'CLOSE_MODAL',
      })
      NotifiFunction('success', 'Post Project is success')
    }
  } catch (err) {
    NotifiFunction('error', ' is not success', 'tìm có ra đâu !!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(err)
  }
}

export function* theoDoiPostCreateTask() {
  yield takeLatest('POST_CREATE_TASK', PostCreateTask)
}

function* GetTaskDetail(action) {
  try {
    const { data, status } = yield call(() => CyberBugService.GetTaskDetail(action.taskId))
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'GET_TASK_DETAIL',
        taskId: data.content,
      })
    }
  } catch (err) {
    NotifiFunction('error', 'is not success')
    console.log(err)
  }
}

export function* theoDoiGetTaskDetail() {
  yield takeLatest('GET_TASK_DETAIL_API', GetTaskDetail)
}

function* UpdateTask(action) {
  const { name, value } = action

  // eslint-disable-next-line default-case
  switch (action.taskType) {
    // eslint-disable-next-line no-lone-blocks
    case 'UPDATE_TASK':
      {
        yield put({
          type: 'UPDATE_TASK',
          name,
          value,
        })
      }
      break
  }
  let { taskDetail } = yield select((state) => state.ProjectCyberBugs)
  let listUserAsign = taskDetail.assigness?.map((item, index) => {
    return item.id
  })

  taskDetail = { ...taskDetail, listUserAsign }
  try {
    const { data, status } = yield call(() => CyberBugService.UpddateTask(taskDetail))
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'GET_TASK_DETAIL',
        taskId: taskDetail,
      })
      yield put({
        type: 'GET_PROJECT_DETAIL_API',
        id: taskDetail.projectId,
      })
    }
  } catch (err) {
    NotifiFunction('error', 'is not success')
    console.log(err)
  }
}

export function* theoDoiUpdateTask() {
  yield takeLatest('UPDATE_FULL_TASK', UpdateTask)
}
