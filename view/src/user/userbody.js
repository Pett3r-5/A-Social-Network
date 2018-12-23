import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Navbar, NavbarBrand, Row, Col, Form, FormGroup, Input, Label, FormFeedback, FormText, Button } from 'reactstrap';
import Profile from './profile'
import Post from './post'

class UserBody extends Component{
  render() {
    return (
      <Row style={{paddingTop: '13%'}}>
        <Col md={{size: 8, offset: 2}} sm-offset={{size:10, offset:1}} id="rowBase">
          <Row>
            <Profile />
            <Post />
          </Row>
        </Col>
      </Row>
    )
  }
}


export default UserBody
