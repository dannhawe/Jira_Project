import React from 'react'
import { Button, Input } from 'antd'
import { UserOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons'
import { withFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { signinCyberBugsAction } from '../../redux/Actions/CyberBugs'
import { UESR_SIGNIN_API } from '../../redux/Constants/CyberBug/CyberBug'
function LoginCyberBug(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} className="container ">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: window.innerHeight,
        }}
      >
        <div
          className="d-flex"
          style={{ flexDirection: 'column', width: '80%', textAlign: 'center' }}
        >
          <h3 style={{ textAlign: 'center' }}> Login Cyberbugs</h3>
          <div className="text-danger"> {errors.email}</div>
          <Input
            onChange={handleChange}
            style={{ textAlign: 'left' }}
            // type="email"
            className="mb-3"
            name="email"
            size="large"
            placeholder="Email"
            prefix={<UserOutlined />}
          />
          <div className="text-danger"> {errors.password}</div>
          <Input
            onChange={handleChange}
            style={{ textAlign: 'left' }}
            type="password"
            name="password"
            size="large"
            placeholder="Password"
            prefix={<UserOutlined />}
          />
          <button className="btn btn-danger mt-3"> Login</button>

          <div className="social mt-5 ">
            <Button
              style={{ backgroundColor: 'rgb(59,89,152' }}
              className="mr-4"
              type="primary"
              shape="circle"
              icon={<FacebookOutlined />}
            ></Button>
            <Button type="primary" shape="circle" icon={<TwitterOutlined />}></Button>
          </div>
        </div>
      </div>
    </form>
  )
}

const CyberLoginBugs = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string().required('Không được bỏ trống').email('email không hợp lệ '),
    password: Yup.string().min(6, 'phải từ 6-32 kí tự').max(32, 'phải từ 6-32 kí tự'),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
   props.dispatch(signinCyberBugsAction(values.email, values.password))
  },

  displayName: 'BasicForm',
})(LoginCyberBug)
export default connect()(CyberLoginBugs)
