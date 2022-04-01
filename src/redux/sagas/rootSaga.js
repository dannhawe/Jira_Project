import { all } from 'redux-saga/effects'
import * as todoListSaga from './TodoListSaga'
import * as CyberBugs from './CyberBug/UseVyberBug'
import * as ProjectSetting from './ProjectSetting'
export function* rootSaga() {
  yield all([
    //theo doi cac action todolist
    todoListSaga.theoDoiActionGetTaskList(),
    todoListSaga.theoDoiActionGetAddTask(),
    todoListSaga.theoDoiActionGetDeleteTask(),
    todoListSaga.theoDoiActionGetcheckTask(),
    todoListSaga.theoDoiActionGetRejectTask(),

    //theo doi cac action todolist
    CyberBugs.theoDoiSignin(),
    //theo doi cac action ProjectSetting
    ProjectSetting.theoDoiProjectSetting(),
    ProjectSetting.theoDoiSubmitProjectSetting(),
    ProjectSetting.theoDoiGetAPI(),
    ProjectSetting.theoDoiUpdateAPI(),
    ProjectSetting.theoDoiDeleteAPI(),
    ProjectSetting.theoDoiSeachMember(),
    ProjectSetting.theoDoiAddUser(),
    ProjectSetting.theoDoiRemoveUser(),
    ProjectSetting.theoDoiGetProjectDetail(),
    ProjectSetting.theoDoiGetAllProject(),
    ProjectSetting.theoDoiGetAllTaskType(),
    ProjectSetting.theoDoiGetPriority(),
    ProjectSetting.theoDoiPostCreateTask(),
    ProjectSetting.theoDoiGetAllStatus(),
    ProjectSetting.theoDoiGetUserByProjectId(),
    ProjectSetting.theoDoiGetTaskDetail(),
    ProjectSetting.theoDoiUpdateTask(),
  ])
}
