import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/user.css';
import { Container, Row, Col, Form, Input } from 'reactstrap';

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
    console.log('this.state.value');
    console.log(this.state.value);
    this.props.add_post(this.state.value)
  }

  render() {
    return (
      <Col md={{size:11, offset: 1}} className="blocos"  style={{minHeight: 250}}>
        <div style={{paddingLeft:"5%", paddingRight:"5%"}}>
          <WallLabel />
          <Form id="newPost">
            <BaloonTextArea handleChange={this.handleChange} value={this.state.value}/>
            <BaloonSubmitButton handleSubmit={this.handleSubmit} />
          </Form>
        </div>
      </Col>
    )
  }
}

export default PostBox
