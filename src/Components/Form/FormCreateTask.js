import { Editor } from '@tinymce/tinymce-react'
import React, { useState, useEffect } from 'react'
import { Select, Radio, Slider } from 'antd'
import { useDispatch, useSelector, connect } from 'react-redux'
import * as Yup from 'yup'
import { withFormik } from 'formik'

function FormCreateTask(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props
  const { listGetAllProject, listGetAlTaskType, listPriority, listStatus } = useSelector(
    (state) => state.ProjectCyberBugs
  )
  const handlerFunction = (value, asa) => {
    setFieldValue('description', value)
  }
  const dispatch = useDispatch()
  const { arrSeachMember } = useSelector((state) => state.UserLoginProjectSetting)
  const AssigneeesList = arrSeachMember.map((item, index) => {
    return { label: item.name, value: item.userId }
  })
  // console.log(arrSeachMember)
  useEffect(() => {
    dispatch({
      type: 'GET_ALL_PROJECT_API',
    })
    dispatch({
      type: 'GET_ALL_STATUS_API',
    })
    dispatch({
      type: 'GET_ALL_PRIORITY_API',
    })
    dispatch({
      type: 'GET_ALL_STATUS_API',
    })
    dispatch({
      type: 'SUBMIT_FORM_CREATE_TASK',
      handleSubmit: handleSubmit,
    })
  }, [])
  const [timeTracking, setTimeTracking] = useState({
    timeSpent: 20,
    timeRemaining: 40,
  })

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId"
          onChange={(e) => {
            dispatch({
              type: 'GET_USER_BY_PROJECTID_API',
              UserId: e.target.value,
            })
            setFieldValue('projectId', e.target.value)
          }}
          className="form-control"
        >
          {listGetAllProject?.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.projectName}
              </option>
            )
          })}
        </select>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <p>priority</p>
            <select name="priorityId" onChange={handleChange} className="form-control">
              {listPriority.map((item, index) => {
                return <option value={item.priorityId}> {item.priority}</option>
              })}
            </select>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <p>Task Type</p>
            <select name="typeId" onChange={handleChange} className="form-control">
              {listGetAlTaskType.map((item, index) => {
                return <option value={item.id}> {item.taskType}</option>
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <p>status</p>
            <select name="statusId" onChange={handleChange} className="form-control">
              {listStatus?.map((item, index) => {
                return <option value={item.statusId}>{item.statusName}</option>
              })}
            </select>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <p>Task Name</p>
            <input
              name="taskName"
              onChange={handleChange}
              placeholder="task name"
              className="form-control"
            ></input>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <p>Assignees</p>
            <Select
              mode="multiple"
              name="listUserAsign"
              size="default"
              placeholder="Please select"
              onChange={(value) => {
                setFieldValue('listUserAsign', value)
              }}
              style={{ width: '100%' }}
              options={AssigneeesList}
              optionFilterProp={'label'}
            ></Select>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <p>Time Tracking</p>
            <Slider
              range={{ draggableTrack: true }}
              value={[0, timeTracking.timeSpent]}
              max={Number(timeTracking.timeSpent) + Number(timeTracking.timeRemaining)}
            />

            <div className="row">
              <div className="col-6">
                <p style={{ fontWeight: 'bold', margin: 0, padding: 0 }}>
                  {' '}
                  {timeTracking.timeSpent} logged
                </p>
              </div>
              <div className="col-6">
                <p style={{ fontWeight: 'bold', margin: 0, padding: 0 }}>
                  {' '}
                  {timeTracking.timeRemaining} Remaining
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <p>Original</p>
            <input
              type="number"
              name="originalEstimate"
              onChange={handleChange}
              className="form-control"
              min="0"
            ></input>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-6">
              <p> Time Spent</p>
              <input
                type="number"
                className="form-control"
                min="0"
                name="timeTrackingSpent"
                onChange={(e) => {
                  setTimeTracking({
                    ...timeTracking,
                    timeSpent: e.target.value,
                  })
                  setFieldValue('timeTrackingSpent', e.target.value)
                }}
              ></input>
            </div>
            <div className="col-6">
              <p> Time Remaining</p>
              <input
                type="number"
                className="form-control"
                min="0"
                name="timeTrackingRemaining"
                onChange={(e) => {
                  setTimeTracking({
                    ...timeTracking,
                    timeRemaining: e.target.value,
                  })
                  setFieldValue('timeTrackingRemaining', e.target.value)
                }}
              ></input>
            </div>
          
          </div>
        </div>
        <div className="col-12">
              <Editor
                name="Description"
                onEditorChange={handlerFunction}
                value={values.description}
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
            </div>
      </div>
    </form>
  )
}
const EditFormCreateTask = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { listGetAllProject, listGetAlTaskType, listPriority, listStatus } = props
    
    return {
      listUserAsign: [0],
      taskName: 'string',
      description: 'string',
      statusId: listStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: listGetAllProject[0]?.id,
      typeId: listGetAlTaskType[0]?.id,
      priorityId: listPriority[0]?.priorityId,
    }
  },
  validationSchema: Yup.object(),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values)
    props.dispatch({
      type: 'POST_CREATE_TASK',
      UserPost: values,
    })
  },
})(FormCreateTask)
const mapStateToProps = (state) => {
  return {
    listGetAllProject: state.ProjectCyberBugs.listGetAllProject,
    listGetAlTaskType: state.ProjectCyberBugs.listGetAlTaskType,
    listPriority: state.ProjectCyberBugs.listPriority,
    listStatus: state.ProjectCyberBugs.listStatus,
  }
}

export default connect(mapStateToProps)(EditFormCreateTask)
