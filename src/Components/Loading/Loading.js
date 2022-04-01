import React from 'react'
import './Loading.css'
import { useSelector } from 'react-redux'

export default function Loading() {
  const { isLoading } = useSelector((state) => state.LoadingReducer)

  if (isLoading) {
    return (
      <div className="bgloading">
        <img src={require('../../assets/imgLoading/kOnzy.gif')}></img>
      </div>
    )
  }else{
      return ''
  }
}
