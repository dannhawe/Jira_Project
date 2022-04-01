import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import FormCreateTask from '../../../../Components/Form/FormCreateTask';

export default function SiderBar() {
  const dispatch = useDispatch();
  const { Header, Sider, Content } = Layout
  const [state, setState] = useState({ collapsed: true })
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    })
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div style={{ color: 'white', textAlign: 'right', marginRight: '5px', fontSize: '30px' }}>
          {React.createElement(state.collapsed ? MenuFoldOutlined : MenuUnfoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </div>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="2"  icon={<UploadOutlined />} onClick={()=>{
              dispatch({
                type:"CREATE_TASK",
                projectCreate:<FormCreateTask></FormCreateTask>
              })
          }}  >
           Project Task
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  )
}
