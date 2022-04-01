import { Button, notification } from 'antd'
import React from 'react'

export const NotifiFunction = (type,message,description) =>{
  notification[type]({
    message: message,
    description:description
  });
  }

  