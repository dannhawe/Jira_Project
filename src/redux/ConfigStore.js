import { applyMiddleware, combineReducers, createStore } from 'redux'
import toDoListReducer from './Reducers/toDoListReducer'
import reduxThunk from 'redux-thunk'
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './sagas/rootSaga'
import LoadingReducer from './LoadingReducer'
import History from './Reducers/History'
import { UserLoginCyberBugsReducer } from './Reducers/UserLoginCyberBugs'
import { UserLoginProjectSetting } from './Reducers/ProjectSetting'
import { ProjectCyberBugs } from './Reducers/ProjectCyberBugs'
import { ModalCyberBugs } from './Reducers/ModalCyberBugs'
import { FormEditReducer } from './Reducers/FormEditReducer'

const middleWareSaga = createMiddleWareSaga()

const rootReducer = combineReducers({
  toDoListReducer,
  LoadingReducer,
  History,
  UserLoginCyberBugsReducer,
  UserLoginProjectSetting,
  ProjectCyberBugs,
  ModalCyberBugs,
  FormEditReducer,
})
const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga))

middleWareSaga.run(rootSaga)
export default store
