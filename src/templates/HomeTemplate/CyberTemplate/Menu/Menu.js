import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Menu() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img  src='https://scontent.fsgn7-1.fna.fbcdn.net/v/t1.6435-9/170264212_1828567673978459_8199339495756211766_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=6lXVbYxgfmYAX8vrxZt&_nc_ht=scontent.fsgn7-1.fna&oh=00_AT8lxchuqxkDvIIMzaOSyv8THorf5f9hIFf64-kh3gltBw&oe=626A5D53' alt />
        </div>
        <div className="account-info" style={{display:'flex',justifyContent:'center', alignItems:'center',}}>
          <p className='text-center' style={{fontSize:20,fontWeight:'bold'}}>Vũ Đức</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card mr-3" />
          <a className='text-dark' disabled activeStyle={{fontWeight:'bold',color:'red!important'}} to='/IndexCyberbugs'>Cyber Board</a>
        </div>
        <div>
          <i className="fa fa-cog mr-3" />
          <NavLink className='text-dark' activeStyle={{fontWeight:'bold',color:'red!important'}} to='/ProjectSetting'>Project Settings</NavLink>
        </div>
        <div>
          <i className="fa fa-truck mr-3" />
          <NavLink className='text-dark' activeStyle={{fontWeight:'bold',color:'red!important'}} to='/ProjectManager'>Manager</NavLink>
        </div>
      </div>
      <div className="feature">
       
        <div>
          <i className="fa fa-equals mr-3" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste  mr-3" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow mr-3" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box mr-3" />
          <span>Components</span>
        </div>
      </div>
    </div>
  )
}
