import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import parse from 'html-react-parser'

export default function Mian() {
  const { lstTask } = useSelector((state) => state.ProjectCyberBugs)
  console.log(lstTask)
  const dispatch = useDispatch();
  const renderAvatar = () => {
    return lstTask.members?.map((item, index) => {
      return (
        <div className="avatar">
          <img src={item.avatar} alt />
        </div>
      )
    })
  }

  const renderCard = () => {
    return lstTask.lstTask?.map((item, index) => {
      return (
        <div
          key={index}
          className="card"
          style={{ width: '17rem', height: '100%', minHeight: '25rem', paddingBottom: '10px' }}
        >
          <div className="card-header">{item.statusName}</div>
          <ul className="list-group list-group-flush">
            {lstTask.lstTask[index].lstTaskDeTail?.map((item, index) => {
              return (
                <>
                  <li
                    className="list-group-item"
                    data-toggle="modal"
                    data-target="#infoModal"
                    style={{ cursor: 'pointer' }}
                    value={item.taskId}
                    onClick={()=>{
                      dispatch({
                        type:"GET_TASK_DETAIL_API",
                        taskId:item.taskId
                      })
                    }}
                  >
                    <p>{parse(item.description)}</p>
                    <div className="block" style={{ display: 'flex' }}>
                      <div className="block-left">
                        <i className="fa fa-bookmark" />
                        <p style={{ fontSize: 10, fontWeight: 'bold' }} className="text-danger">
                          {item.priorityTask.priority}
                        </p>
                      </div>
                      <div className="block-right">
                        <div className="avatar-group" style={{ display: 'flex' }}>
                          <div className="avatar">
                            {lstTask.members?.map((members, index) => {
                              return <img src={members.avatar} alt />
                            })}
                          </div>
                          <div className="avatar"></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </>
              )
            })}
          </ul>
        </div>
      )
    })
  }
  return (
    <div className="main">
      <div className="header">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
            <li className="breadcrumb-item">Project</li>
            <li className="breadcrumb-item">CyberLearn</li>
            <li className="breadcrumb-item active" aria-current="page">
              {lstTask.projectName}
            </li>
          </ol>
        </nav>
      </div>
      <h2> {lstTask.projectName}</h2>
      <div className="info" style={{ display: 'flex' }}>
        <div className="avatar-group" style={{ display: 'flex' }}>
          {renderAvatar()}
        </div>
      </div>
      <div className="content" style={{ display: 'flex' }}>
        {renderCard()}
      </div>
    </div>
  )
}
