import React, { Component } from 'react';
import '../css/user.css';

import UserNavbar from './navbar'
import UserFooter from './userfooter'
import UserBodyContainer from './UserBody_container'


class User extends Component {
  componentDidMount() {
    console.log('this.props.authenticated')
    console.log(this.props.authenticated)
    if(!this.props.authenticated) {
      this.props.history.push(`/unauthorized`)
    }
    // if(this.props.match.params._id !== this.props.loggedIn._id){
      // this.props.http_request_get_user(this.props.match.params._id)
    // }
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
