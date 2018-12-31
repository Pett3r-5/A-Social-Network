import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Row, Col } from 'reactstrap';

import ProfileContainer from './profile_container'
import Post from './post-baloon/Post'
import Bubbles from './post-baloon/Bubbles'
import PreviousPost from './post-baloon/Previous-post'
import Friends from './Friends'

class UserBody extends Component {

  render() {
    return (
      <Row style={{paddingTop: '13%', width: '100%'}}>
        <Col md={{size: 8, offset: 2}} sm={{size:10, offset:1}} id="rowBase">
          <Row>
            <ProfileContainer />
            <Post />
          </Row>
          {this.props.posts.map(e=> <><Bubbles/><PreviousPost text={e}/></>)}
          <Friends/>
        </Col>
      </Row>
    )
  }
}


export default UserBody
