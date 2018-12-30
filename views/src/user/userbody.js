import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Row, Col, Form, FormGroup, Input, Label, FormFeedback, FormText, Button } from 'reactstrap';
import ProfileContainer from './profile_container'
import Post from './post-baloon/post'

class UserBody extends Component{
  render() {
    return (
      <Row style={{paddingTop: '13%', width: '100%'}}>
        <Col md={{size: 8, offset: 2}} sm-offset={{size:10, offset:1}} id="rowBase">
          <Row>
            <ProfileContainer />
            <Post />
          </Row>
        </Col>
      </Row>
    )
  }
}


export default UserBody
