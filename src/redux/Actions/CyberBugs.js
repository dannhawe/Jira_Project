
import { UESR_SIGNIN_API } from '../Constants/CyberBug/CyberBug'

 export const signinCyberBugsAction = (email, password) => {
  return {
    type: UESR_SIGNIN_API,
    userLognin: {
      email: email,
      password: password,
    },
  }
}
