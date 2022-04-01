import React, { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik'
import { useDispatch, useSelector, connect } from 'react-redux'
import * as Yup from 'yup'

function FormEditCyberBugs(props) {
  
  const dispatch = useDispatch()
  const arrayProjectSetting = useSelector((state) => state.UserLoginProjectSetting.arrProject)
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  })



  const handlerFunction = (value, asa) => {
    setFieldValue('description', value)
  }

  useEffect(() => {
    setFieldValue('description', values.description)

    dispatch({
      type: 'CALL_API_CATERGORY',
    })

    dispatch({
      type: 'FORM_EDIT',
      submit: handleSubmit,
    })
  }, [])

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p>id</p>
            <input
              disabled
              className="form-control"
              value={values.id}
              type="input"
              placeholder="id"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p>project Name</p>
            <input
              className="form-control"
              value={values.projectName}
              onChange={handleChange}
              name='projectName'
            />
          </div>
        </div>

        <div className="col-4">
          <form className="form-group">
            <p>project category</p>
            <select value={values.CategoryId} onChange={handleChange} name="CategoryId" className="form-control">
              {arrayProjectSetting.map((item, index) => {
                return <option value={item.id}>{item.projectCategoryName}</option>
              })}
            </select>
          </form>
        </div>
        <div className="col-12">
          <div className="form-group ">
            <p>Description</p>
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
      </div>
    </form>
  )
}

const EditCyberBugs = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      id: props.projectEdit?.id,
      projectName: props.projectEdit?.projectName,
      description: props.projectEdit?.description,
      CategoryId: props.projectEdit?.categoryId,
    }
  },
  validationSchema: Yup.object(),
  handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
          type:"UPDATE_API",
          newProject: values
        })
  },
})(FormEditCyberBugs)

const mapStateToProps = (state) => {
  return {
    projectEdit: state.FormEditReducer.projectEdit,
  }
}
export default connect(mapStateToProps)(EditCyberBugs)
