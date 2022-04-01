import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector, connect } from 'react-redux'
function ProjectSetting(props) {
  const dispatch = useDispatch()
  const arrayProjectSetting = useSelector((state) => state.UserLoginProjectSetting.arrProject)
  useEffect(() => {
    dispatch({
      type: 'CALL_API_CATERGORY',
    })
  }, [])

  const { values, touched, errors, handleChange, handleBlur, handleSubmit,setFieldValue } = props
  const handlerFunction = (value, asa) => {
    setFieldValue('description',value)
  }
  return (
    <div className="">
      <h3 className=""> Create-React</h3>

      <form className="container" onSubmit={handleSubmit} onChange={handleChange}>
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName"></input>
        </div>

        <div className="form-group">
          <p>Description</p>
          <Editor
            name="Description"
            onEditorChange={handlerFunction}
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
        <button type="submit">sent content</button>
      </form>

      <div className="form-group mb-4">
        <p>Category</p>
        <select onChange={handleChange} name="CategoryId" className="form-control">
          {arrayProjectSetting.map((item, index) => {
            return <option value={item.id}>{item.projectCategoryName}</option>
          })}
        </select>
      </div>
    </div>
  )
}

const ProjectSettingCyberbugs = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: '',
      description: '',
      CategoryId: props.arrProject[0]?.id,
    }
  },
  validationSchema: Yup.object(),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type:"SUBMIT_PROJECT_SETTING",
      newProject:values

    })
  },
})(ProjectSetting)

const mapStateToProps = (state) => {
  return {
    arrProject: state.UserLoginProjectSetting.arrProject,
  }
}
export default connect(mapStateToProps)(ProjectSettingCyberbugs)
