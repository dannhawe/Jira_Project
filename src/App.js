import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch } from 'react-router-dom'
import { Router, useHistory } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Loading from './Components/Loading/Loading'
import LoginCyberBug from './Pages/LoginCyberBugs/LoginCyberBug'
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate'
import { CyberTemplate } from './templates/HomeTemplate/CyberTemplate/CyberTemplate'
import IndexCyberbus from '././Pages/CyberBoards/IndexCyberbus'
import ProjectSetting from './Pages/ProjectSetting/ProjectSetting'
import ProjectManager from './Pages/ProjectManager/ProjectManager'
import ModelCYberBugs from './HOC/CyberBus/ModelCYberBugs'

function App() {
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'ADD_HISTORY',
      history: history,
    })
  }, [])
  return (
    <>
      <Loading></Loading>
      <ModelCYberBugs></ModelCYberBugs>
      <UserLoginTemplate exact path="/login" Component={LoginCyberBug}></UserLoginTemplate>
      <CyberTemplate exact path="/IndexCyberbugs" Component={IndexCyberbus}></CyberTemplate>
      <CyberTemplate exact path="/ProjectSetting" Component={ProjectSetting}></CyberTemplate>
      <CyberTemplate exact path="/ProjectManager" Component={ProjectManager}></CyberTemplate>
      <CyberTemplate exact path="/CyberBugsDetail/:id" Component={IndexCyberbus}></CyberTemplate>
      <UserLoginTemplate exact path="/" Component={LoginCyberBug}></UserLoginTemplate>
    </>
  )
}

export default App
