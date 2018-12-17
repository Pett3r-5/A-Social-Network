import React, { Component } from 'react';
import emojiHi from './images/emojiHi.png';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Form, FormGroup, Input, Label, FormFeedback, FormText, Button,
          Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './App.css';


class ModalCreateAccount extends Component {
  render(){
    return(
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

class FormLogin extends Component {

  render(){
    return(

          <Form className="loginForm">
            <FormGroup>
              <Label for="username" style={{textAlign: 'left !important'}}>Username</Label>
              <Input type="text" name="username" id="username" className="shadowInput" required />
              <FormText id="userHelp" className="text-muted">For testing purposes, try logging in as: batman</FormText>
              <FormFeedback invalid>Invalid username</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="exampleInputPassword1">Password</Label>
              <Input type="password" id="exampleInputPassword1" name="password" className="shadowInput" placeholder="" required />
              <FormText id="passwordHelp" className="text-muted">Try logging in with the password 123456</FormText>
              <FormFeedback invalid>Invalid password</FormFeedback>
            </FormGroup>
            <Button className="botaoForm" id="botaoLogin">Log in</Button>
            <a id="signup" onClick={this.props.openModal} href="_blank"><p id="crie">Or create an account!</p></a>
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
  componentDidMount(){
    this.setState({modalOpened: false})
  }

  openModal(){
    console.log('entrou');
    this.setState({modalOpened: !this.state.modalOpened})
    console.log(this.state.modalOpened);
  }

  render(){
    console.log(this.state.modalOpened);
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
