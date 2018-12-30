import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/user.css';
import { Container, Row, Col, Form, Input } from 'reactstrap';

import PostArrow from './post-arrow'
import { WallLabel, BaloonTextArea, BaloonSubmitButton } from './post-interior'



class PostBox extends Component{
  constructor(props){
    super(props)
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault()
  }

  render() {
    return (
      <Col>
        <Container className="blocos" style={{minHeight: 250}}>
            <WallLabel />
            <Form id="newPost">
              <BaloonTextArea handleChange={this.handleChange} value={this.state.value}/>
              <BaloonSubmitButton handleSubmit={this.handleSubmit} />
            </Form>
        </Container>
      </Col>
    )
  }
}

class Post extends Component{
  render() {
    return (
      <Col md={{size: 10}}>
        <Row>
          <PostArrow />
          <PostBox />
        </Row>
      </Col>
    )
  }
}


export default Post
