import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { Editor } from '@tinymce/tinymce-react'

export default function Model() {
  const { taskDetail, listStatus, listPriority } = useSelector((state) => state.ProjectCyberBugs)
  const dispatch = useDispatch()
  const [visability, setvisability] = useState(false)
  const [content, setContent] = useState(taskDetail.description)
  console.log(taskDetail)
  useEffect(() => {
    dispatch({
      type: 'GET_ALL_PROJECT_API',
    })
  }, [])
  const handlechange = (e) => {
    const { name, value } = e.target
    dispatch({
      type:"UPDATE_FULL_TASK",
      taskType: 'UPDATE_TASK',
      name,
      value,
    })
  }
  const ParseHtml = () => {
    if (taskDetail.description) {
      return (
        <>
          {!visability ? (
            <div onClick={()=>{setvisability(true)}}>{parse(taskDetail.description)}</div>
          ) : (
            <div>
              <Editor
                name="description"
                initialValue={taskDetail.description}
                onEditorChange ={(content,editor)=>{
                  setContent(content)
                }}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
              />
              <button
                className="btn btn-primary m-3"
                onClick={(e) => {
                  dispatch({
                    type:"UPDATE_FULL_TASK",
                    taskType: 'UPDATE_TASK',
                    name:'description',
                    value:content
                  })
                  setvisability(false)
                }}
              >
                submit
              </button>
              <button
                className="btn btn-primary m-3"
                onClick={(e) => {
                
                }}
              >
                close
              </button>
            </div>
          )}
        </>
      )
    } else {
      return ''
    }
  }
  const timeTracking = () => {
    let timeTracking =
      (taskDetail.timeTrackingSpent /
        (taskDetail.timeTrackingSpent + taskDetail.timeTrackingRemaining)) *
      100
    if (timeTracking) {
      return timeTracking
    } else {
      return 0
    }
  }
  const hangdleChangInput =(e) =>{
      dispatch({
        type:"INRERT_COMMENT",
        taskId:taskDetail.taskId,
        contentComment:e.target.value
      })
  }
  return (
    <div>
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="searchModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-search">
          <div className="modal-content">
            <div className="modal-header">
              <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
              </div>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>RECENT ISSUES</p>
              <div style={{ display: 'flex' }}>
                <div className="icon">
                  <i className="fa fa-bookmark" />
                </div>
                <div>
                  <p>cyberlearn</p>
                  <p>BUG-238066</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Info Modal */}
      <div
        className="modal fade"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-info">
          <div className="modal-content">
            <div className="modal-header">
              <div className="task-title">
                <i className="fa fa-bookmark" />
                <span>{taskDetail.taskName}</span>
              </div>
              <div style={{ display: 'flex' }} className="task-click">
                <div>
                  <i className="fab fa-telegram-plane" />
                  <span style={{ paddingRight: 20 }}>Give feedback</span>
                </div>
                <div>
                  <i className="fa fa-link" />
                  <span style={{ paddingRight: 20 }}>Copy link</span>
                </div>
                <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8">
                    <div className="description">
                      <p style={{ fontWeight: 'bold' }}>Description</p>
                      <p>{ParseHtml()}</p>
                    </div>
                    <div className="comment">
                      <h6>Comment</h6>
                      <div className="block-comment" style={{ display: 'flex' }}>
                        <div className="avatar">
                         <img src='https://scontent.fsgn7-1.fna.fbcdn.net/v/t1.6435-9/170264212_1828567673978459_8199339495756211766_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=6lXVbYxgfmYAX8vrxZt&_nc_ht=scontent.fsgn7-1.fna&oh=00_AT8lxchuqxkDvIIMzaOSyv8THorf5f9hIFf64-kh3gltBw&oe=626A5D53'></img>
                        </div>
                        <div className="input-comment">
                          <input type="text" placeholder="Add a comment ..." onChange={hangdleChangInput} />
                          <p>
                           
                          </p>
                        </div>
                      </div>
                      <div className="lastest-comment">
                        <div className="comment-item">
                          <div className="display-comment" style={{ display: 'flex' }}>
                            <div className="avatar">
                            <img src='https://scontent.fsgn7-1.fna.fbcdn.net/v/t1.6435-9/170264212_1828567673978459_8199339495756211766_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=6lXVbYxgfmYAX8vrxZt&_nc_ht=scontent.fsgn7-1.fna&oh=00_AT8lxchuqxkDvIIMzaOSyv8THorf5f9hIFf64-kh3gltBw&oe=626A5D53'></img>

                            </div>
                            <div>
                              <p style={{ marginBottom: 5 }}>
                                Lord Gaben <span>a month ago</span>
                              </p>
                              <p style={{ marginBottom: 5 }}>
                                    {/* {taskDetail.lstComment.map((item,index))} */}
                              </p>
                              <div>
                                <span style={{ color: '#929398' }}>Edit</span>•
                                <span style={{ color: '#929398' }}>Delete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="status">
                      <h6>STATUS</h6>
                      <select
                        c
                        lassName="custom-select"
                        name="statusId"
                        onChange={handlechange}
                        value={taskDetail.statusId}
                      >
                        {listStatus?.map((item, index) => {
                          return (
                            <option value={listStatus[index].statusId}>
                              {listStatus[index].statusName}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="assignees">
                      <h6>ASSIGNEES</h6>
                      <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex' }} className="item">
                          {taskDetail.assigness?.map((item, index) => {
                            return (
                              <>
                                <div className="avatar">
                                  <img src={item.avatar} alt />
                                </div>
                                <p className="name pt-2 pr-3  ">{item.name}</p>
                              </>
                            )
                          })}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <i className="fa fa-plus" style={{ marginRight: 5 }} />
                          <span>Add more</span>
                        </div>
                      </div>
                    </div>

                    <div className="priority" style={{ margin: '20px 0px' }}>
                      <h6>PRIORITY</h6>
                      <select
                        name="priorityId"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handlechange}
                        value={taskDetail.priorityId}
                      >
                        {listPriority?.map((item, index) => {
                          return (
                            <option key={index} value={item.priorityId}>
                              {item.priority}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="estimate">
                      <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                      <input
                        type="text"
                        disabled
                        value={taskDetail.originalEstimate}
                        className="estimate-hours"
                      />
                    </div>
                    <div className="time-tracking">
                      <h6>TIME TRACKING</h6>
                      <div style={{ display: 'flex' }}>
                        <i className="fa fa-clock" />
                        <div style={{ width: '100%' }}>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: `${timeTracking()}%`,
                              }}
                              aria-valuenow={taskDetail.timeTrackingSpent}
                              aria-valuemin={0}
                              aria-valuemax={
                                taskDetail.timeTrackingSpent + taskDetail.timeTrackingRemaining
                              }
                            />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="logged">{taskDetail.timeTrackingSpent}h logged</p>
                            <p className="estimate-time">
                              {taskDetail.timeTrackingRemaining}h estimated
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
