import React, { useEffect } from 'react'
import '../../index.css'
import Mian from '../../templates/HomeTemplate/CyberTemplate/Main/Mian'

import { useDispatch, useSelector } from 'react-redux'
export default function IndexCyberbus(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(props.match.params.id)
    dispatch({
      type: 'GET_PROJECT_DETAIL_API',
      id: props.match.params.id,
    })
  }, [])

  return <Mian />
}


