import React from 'react'
import { Route } from 'react-router-dom'

import Menu from './Menu/Menu'
import Model from './Modal/Model'
import SiderBar from './SiderBar/SiderBar'

export const CyberTemplate = (props) => {
  const { Component, ...restParam } = props

  return (
    <Route
      {...restParam}
      render={(propRoute) => {
        return (
          <div className="jira">
            <SiderBar />
            <Menu />
            <Component {...propRoute} />
            <Model />
          </div>
        )
      }}
    ></Route>
  )
}
