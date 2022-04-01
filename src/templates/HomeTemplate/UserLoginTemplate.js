import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout
export const UserLoginTemplate = (props) => {
  let { Component, ...restToute } = props

  const [{width,height}, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(()=>{
    window.onresize = ()=>{
      setSize({
        width:window.innerWidth,
        height:window.innerHeight
      })
    }
  })

  return (
    <Route
      {...restToute}
      render={(propsRoute) => {
        return (
          <Layout>
            <Sider
              width={width/2}
              style={{
                height:height,
                backgroundSize: '100%',
                backgroundImage: `url(https://picsum.photos/${Math.round(width/2)}/${Math.round(height)})`,
              }}
            ></Sider>
            <Content>
              <Component {...propsRoute}></Component>
            </Content>
          </Layout>
        )
      }}
    ></Route>
  )
}
