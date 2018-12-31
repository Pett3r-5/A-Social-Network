import React, { Component } from 'react';
import '../css/user.css';

import UserNavbar from './navbar'
import UserFooter from './userfooter'
import UserBodyContainer from './UserBody_container'


class User extends Component {
  render(){
    return(
      <div>
        <UserNavbar />
        <UserBodyContainer />
        <UserFooter />
      </div>
    )
  }
}

export default User
