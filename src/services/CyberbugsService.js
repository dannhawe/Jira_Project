import axios, { Axios } from 'axios'
import { DOMAIN_CYBERBUG, TOKEN } from '../Util/Constants/settingSystem'

export const CyberBugService = {
  SigninCyberBugs: (userlognin) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Users/signin`,
      method: 'POST',
      data: userlognin,
    })
  },

  getAllProjectServices: () => {
    return axios({
      url: `${DOMAIN_CYBERBUG}ProjectCategory`,
      method: 'GET',
    })
  },

  submitForm: (newProject) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Project/createProject`,
      method: 'POST',
      data: newProject,
    })
  },
  submitFormAuthorization: (newProject) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Project/createProjectAuthorize`,
      method: 'POST',
      data: newProject,
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
    })
  },

  getAPICyberBugs: (newProject) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Project/getAllProject`,
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
    })
  },

  updateAPICYberbugs: (newProject) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Project/updateProject?projectId=${newProject.id}`,
      method: 'PUT',
      data: newProject,
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
    })
  },

  DeleteApi: (id) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Project/deleteProject?projectId=${id}`,
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
    })
  },

  SeachMember: (key) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Users/getUser?keyword=${key}`,
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
    })
  },

  AddUser: (UserAdd) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Project/assignUserProject`,
      method: 'POST',
      data: UserAdd,
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
    })
  },

  RemoveUser: (USerRemove) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Project/removeUserFromProject`,
      method: 'POST',
      data: USerRemove,
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
    })
  },

  GetProjectDetail: (id) => {
    console.log(id)
    return axios({
      url: `${DOMAIN_CYBERBUG}Project/getProjectDetail?id=${id}`,
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
    })
  },
  GetAllProjectAPI: () => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Project/getAllProject`,
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
    })
  },
  GetAllTaskTypeAPI: () => {
    return axios({
      url: `${DOMAIN_CYBERBUG}TaskType/getAll`,
      method: 'GET',
    })
  },
  GetPriorityAPI: () => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Priority/getAll`,
      method: 'GET',
    })
  },

  GetAllStatusAPI: () => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Status/getAll`,
      method: 'GET',
    })
  },
  GetUserByProjectId: (UserId) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Users/getUserByProjectId?idProject=${UserId}`,
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
    })
  },
  PostCreateTaskAPI: (UserPost) => {
    console.log(UserPost)
    return axios({
      url: `${DOMAIN_CYBERBUG}Project/createTask`,
      method: 'POST',
      data: UserPost,
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
    })
  },
  GetTaskDetail: (taskId) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Project/getTaskDetail?taskId=${taskId}`,
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
    })
  },
  UpddateTask: (taskDetail) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}Project/updateTask`,
      method: 'POST',
      data:taskDetail,
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
    })
  },
}
