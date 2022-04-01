/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Space, message, Popconfirm, Avatar, Popover, AutoComplete } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import parse from 'html-react-parser'
import FormEditCyberBugs from '../../Components/Form/FormEditCyberBugs'
import { UserOutlined } from '@ant-design/icons'
import userEvent from '@testing-library/user-event'
import { NavLink } from 'react-router-dom'

export default function ProjectManager() {
  const seachRef = useRef(null)
  const listProject = useSelector((state) => state.ProjectCyberBugs.listProject)
  const { arrUserSeach } = useSelector((state) => state.UserLoginProjectSetting)
  const [valuess, setValue] = useState({
    valuess: '',
  })
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  })
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'getAPICyberBugs',
    })
  }, [])

  const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    })
  }

  const clearFilters = () => {
    setState({ filteredInfo: null })
  }

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    })
  }

  let { sortedInfo, filteredInfo } = state
  sortedInfo = sortedInfo || {}
  filteredInfo = filteredInfo || {}
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    },
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (text, record, index) => {
        if(record.id){
          return <NavLink to={`/CyberBugsDetail/${record?.id}`}>{text}</NavLink>
        }
      },
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      sortOrder: sortedInfo.columnKey === 'projectName' && sortedInfo.order,
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record, index) => {
        let jsxContent = parse(text)
        return <div>{jsxContent}</div>
      },

      filters: [],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.description.length - b.description.length,
      sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
      ellipsis: true,
    },

    {
      title: 'members',
      key: 'members',
      render: (text, record, index) => {
        return (
          <div className="text-right">
            {record.members?.slice(0, 2).map((item, i) => {
              return (
                <Popover
                  trigger="click"
                  placement="topLeft"
                  content={() => {
                    return (
                      <div className="table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr>
                                <th> {item.userId}</th>
                                <th>
                                  <img
                                    style={{ width: '20px', height: 20, borderRadius: '50%' }}
                                    src={item.avatar}
                                  ></img>
                                </th>
                                <th>{item.name}</th>
                                <th>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: 'REMOVE_USER_FOR_PROJECT',
                                        USerRemove: {
                                          projectId: record.id,
                                          userId: item.userId,
                                        },
                                      })
                                    }}
                                    className="btn btn-danger"
                                  >
                                    X
                                  </button>
                                </th>
                              </tr>
                            )
                          })}
                        </tbody>
                      </div>
                    )
                  }}
                >
                  <Avatar key={i} src={item.avatar} />
                </Popover>
              )
            })}
            {record.members?.length > 2 ? <Avatar style={{ cursor: 'pointer' }}>...</Avatar> : ''}
            {
              <Popover
                placement="topLeft"
                title={'add Members'}
                content={() => {
                  return (
                    <AutoComplete
                      options={arrUserSeach?.map((item, index) => {
                        return { label: item.name, value: item.userId.toString() }
                      })}
                      value={valuess}
                      onChange={(text) => {
                        setValue(text)
                      }}
                      onSelect={(value, option) => {
                        setValue(option.label)
                        dispatch({
                          type: 'ADD_USER',
                          UserAdd: {
                            projectId: record.id,
                            userId: value,
                          },
                        })
                      }}
                      onSearch={(value) => {
                        if (seachRef.current) {
                          clearTimeout(seachRef.current)
                        }
                        seachRef.current = setTimeout(() => {
                          dispatch({
                            type: 'SEACH_MEMBER',
                            key: value,
                          })
                        }, 300)
                      }}
                      style={{ width: 200 }}
                      placeholder="input here"
                    />
                  )
                }}
                trigger="click"
              >
                <button className="btn btn-primary ml-2" style={{ borderRadius: '50%' }}>
                  +
                </button>
              </Popover>
            }
          </div>
        )
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <button
            className="btn btn-success"
            onClick={() => {
              dispatch({
                type: 'OPEN_MODAL_EDIT',
                component: <FormEditCyberBugs></FormEditCyberBugs>,
              })
              dispatch({
                type: 'EDIT_PROJECT',
                projectEdit: record,
              })
            }}
          >
            <a>
              <EditOutlined />
            </a>
          </button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {
              dispatch({
                type: 'DELETE_API',
                id: record.id,
              })
            }}
            okText="Yes"
            cancelText="No"
          >
            <button onClick={() => {}} className="btn btn-danger">
              <a>
                <DeleteOutlined />
              </a>
            </button>
          </Popconfirm>
          ,
        </Space>
      ),
    },
  ]
  return (
    <div className="container">
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={listProject} onChange={handleChange} />
    </div>
  )
}
