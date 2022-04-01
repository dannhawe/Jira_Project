import React, { useState } from 'react'
import { Drawer, Button, Radio, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons'

export default function ModelCYberBugs() {
  const [state, setState] = useState({
    placement: 'right',
  })

  const { visible, componentCyBerBugs, onsubmit } = useSelector((state) => state.ModalCyberBugs)
  console.log(visible)
  const dispatch = useDispatch()

  const showDrawer = () => {
    dispatch({
      type: 'OPEN_MODAL',
    })
  }

  const onClose = () => {
    dispatch({
      type: 'CLOSE_MODAL',
    })
  }

  const onChange = (e) => {
    setState({
      placement: 'right',
    })
  }

  return (
    <>
      <Space>
        <Radio.Group value={state.placement} onChange={onChange}></Radio.Group>
        {/* <Button type="primary" onClick={showDrawer}>
          Open
        </Button> */}
      </Space>
      <Drawer
        width={720}
        placement={state.placement}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={state.placement}
      >
        {componentCyBerBugs}
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onsubmit} type="primary" >
          Submit
        </Button>
      </Drawer>
    </>
  )
}
