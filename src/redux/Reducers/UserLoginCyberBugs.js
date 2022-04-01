import { act } from 'react-dom/test-utils'
import { USER_LOGIN } from '../../Util/Constants/settingSystem'
import { USLOGIN } from '../Constants/CyberBug/CyberBug'

let uslogin = {}
if (localStorage.getItem(USER_LOGIN)) {
  uslogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userlogin: uslogin
}

export const UserLoginCyberBugsReducer = (state = stateDefault ,action)=>{
    switch(action.type){
        case USLOGIN:{
            console.log(action.userLogin)
            return{...state,userlogin:action.userLogin}
        }
        default: return {...state}
    }
}
