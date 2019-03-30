import React, { Component } from 'react';
import '../css/user.css';

import UserNavbar from './navbar'
import UserFooter from './userfooter'
import UserBodyContainer from './UserBody_container'


class User extends Component {
  componentDidMount() {
    if(!this.props.authenticated) {
      this.props.history.push(`/unauthorized`)
    }
    // if(!this.props.user._id || this.props.loggedin._id !== this.props.user._id) {
    //   this.props.http_request_get_user(this.props.match.params._id)
    // }
    // this.props.http_request_get_self(this.state).resolve()
  }

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
