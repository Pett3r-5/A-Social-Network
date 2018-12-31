import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Navbar, NavbarBrand, Row, Col, Form, FormGroup, Input, Label, FormFeedback, FormText, Button } from 'reactstrap';

import UserNavbar from './navbar'
import UserFooter from './userfooter'
import UserBodyContainer from './UserBody-container'


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
