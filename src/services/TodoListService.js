import axios from 'axios'
import { DOMAIN } from '../Util/Constants/settingSystem'

export class TodoListService {
  constructor() {}

  getTaskApi = () => {
    return axios({
      url: `${DOMAIN}ToDoList/GetAllTask`,
      method: 'GET',
    })
  }
  addTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}ToDoList/AddTask`,
      method: 'post',
      data: {
        taskName: taskName,
      },
    })
  }

  deleteTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}ToDoList/deleteTask?taskName=${taskName}`,
      method: 'delete',
    })
  }

  checkTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}ToDoList/doneTask?taskName=${taskName}`,
      method: 'put',
    })
  }

  rejeckTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}ToDoList/rejectTask?taskName=${taskName}`,
      method: 'put',
    })
  }
}
export const todoListService = new TodoListService()
