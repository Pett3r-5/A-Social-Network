import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Navbar, NavbarBrand, Row, Col, Form, FormGroup, Input, Label, FormFeedback, FormText, Button } from 'reactstrap';
import UserNavbar from './navbar'
import UserBody from './userbody'
import UserFooter from './userfooter'


class User extends Component {
  render(){
    return(
      <div>
        <UserNavbar />
        <UserBody />
        <UserFooter />
      </div>
    )
  }
}

export default User
