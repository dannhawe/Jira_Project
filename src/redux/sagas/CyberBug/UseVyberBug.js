// eslint-disable-next-line require-yield
import axios from 'axios'
import { call, delay, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { CyberBugService } from '../../../services/CyberbugsService'
import { TOKEN, USER_LOGIN } from '../../../Util/Constants/settingSystem'
import { UESR_SIGNIN_API, USLOGIN } from '../../Constants/CyberBug/CyberBug'
import { DISPLAY_LOADING, DISPLAY_OFF_LOADING } from '../../Constants/LoadingConsts'
import { History } from '../../../Util/Constants/history'
function* signin(action) {
  yield put({
    type: DISPLAY_LOADING,
  })
  yield delay(500)
  try {
    const { data, status } = yield call(() => CyberBugService.SigninCyberBugs(action.userLognin))
    console.log(data)
    localStorage.setItem(TOKEN, data.content.accessToken)
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))
    console.log(data.content)
    yield put({
      type: USLOGIN,
      userLogin: data.content,
    })
    // let history = yield select((state) => state.History.history)
    // history.push('/home')
    History.push('/ProjectManager')
  } catch (err) {
    console.log(err.response.data)
  }
  yield put({
    type: DISPLAY_OFF_LOADING,
  })
}

export function* theoDoiSignin() {
  yield takeLatest(UESR_SIGNIN_API, signin)
}
