import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Row, Col } from 'reactstrap';

import ProfileContainer from './profile_container'
import Post from './post-baloon/Post'
import Bubbles from './post-baloon/Bubbles'
import PreviousPost from './post-baloon/Previous-post'
import Friends from './Friends'

function UserBody(props) {
  return (
    <Row style={{paddingTop: '13%', width: '100%'}}>
      <Col md={{size: 8, offset: 2}} sm={{size:10, offset:1}} id="rowBase">
        <Row>
          <ProfileContainer />
          <Post />
        </Row>
        {props.data.posts.map(e=> <><Bubbles/><PreviousPost text={e}/></>)}
        <Row style={{paddingTop: 150}}>
          <Friends friends={props.data.friends}/>
        </Row>
      </Col>
    </Row>
  )
}


export default UserBody
