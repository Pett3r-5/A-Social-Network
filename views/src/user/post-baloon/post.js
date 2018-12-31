import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/user.css';
import { Row, Col } from 'reactstrap';

import PostArrow from './post-arrow'
import PostBoxContainer from './PostBox-container'


class Post extends Component{
  render() {
    return (
      <Col md={{size: 10}}>
        <Row>
          <PostArrow />
          <PostBoxContainer />
        </Row>
      </Col>
    )
  }
}


export default Post
