import React, { Component } from 'react';
import emojiHi from '../../images/emojiHi.png';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Form, Button } from 'reactstrap';
import '../../css/App.css';

import LoginInput from '../Login-input';
import ModalCreateAccount from '../signup/Modal-create-account'


function SignupLink({openModal}){
  return <a id="signup" onClick={openModal} href="javascript:void(0)"><p id="crie">Or create an account!</p></a>
}

function ButtonLogin({handleSubmit}){
  return <Button type="submit" className="botaoForm" id="botaoLogin" onSubmit={handleSubmit}>Log in</Button>
}




class FormLogin extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
      username: {value: '', id:'username', name: 'username', title: 'Username', text: 'For testing purposes, try logging in as: batman', type: 'text'},
      password: {value: '',  id:'password', name: 'password', title: 'Password', text:'Try logging in with the password 123456', type: 'password'}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    let tipo = event.target.name
    this.setState({[tipo]: {...this.state[tipo], value: event.target.value}})
  }

  handleSubmit(event){
    event.preventDefault()
    fetch('http://localhost:3001',
    {
      method: 'POST',
       headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({username: this.state.username.value, password: this.state.password.value})
    }).then(res=>console.log(res)).catch(error=>console.log(error))
  }

  render(){
      return(
            <Form className="loginForm" onSubmit={this.handleSubmit}>
              <LoginInput handleChange={this.handleChange} value={this.state.username.value} tipo={this.state.username}/>
              <LoginInput handleChange={this.handleChange} value={this.state.password.value} tipo={this.state.password}/>
              <ButtonLogin handleSubmit={this.handleSubmit}/>
              <SignupLink openModal={this.props.openModal}/>
            </Form>
      )
  }
}


class LoginBox extends Component {
  constructor(props){
    super(props)
    this.state = {modalOpened: false}
    this.openModal = this.openModal.bind(this)
  }

  openModal(){
    this.setState({modalOpened: !this.state.modalOpened})
  }

  render(){
    return (
      <Row>
        <Col md={{size:4, offset:4}} sm={{size:8, offset:2}} xs={{size:10, offset:1}}>
          <div style={{padding:20}}>
            <div className="LoginBox" >
              <img id="emoji" src={emojiHi} />
              <FormLogin openModal={this.openModal}/>
            </div>
          </div>
          {this.state.modalOpened? <ModalCreateAccount /> : null}
        </Col>
      </Row>
    )
  }
}





export default LoginBox
