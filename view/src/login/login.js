import React, { Component } from 'react';
import emojiHi from '../images/emojiHi.png';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Form, FormGroup, Input, Label, FormFeedback, FormText, Button,
          Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../css/App.css';




function LoginInput(props){
  return(
    <FormGroup>
      <Label for={props.tipo.name} style={{textAlign: 'left !important'}}>{props.tipo.title}</Label>
      <Input onChange={props.handleChange}
            value={props.value}
            type={props.tipo.type}
            name={props.tipo.name}
            id={props.tipo.id}
            className="shadowInput"
            required />
      <FormText className="text-muted">{props.tipo.text}</FormText>
      <FormFeedback invalid>Invalid {props.tipo.name}</FormFeedback>
    </FormGroup>
  )
}

class UploadImage extends Component{
  constructor(props){
    super(props)
    this.uploadImage = this.uploadImage.bind(this)
  }

  uploadImage(){
    document.getElementById("inputUpload").click();
  }

  render(){
    return (
      <Row>
        <Col md={{size:6}}>
          <input name="fileToUpload" id="inputUpload" style={{display: 'none'}} onChange={this.props.handlePictureUpload} type={this.props.tipo.type} />
          <Label htmlFor="botaoImagem">Avatar</Label>
          <Button onClick={this.uploadImage} id="botaoImagem" style={{marginTop: '0%', height: 50, width:'80%', backgroundColor: 'white !important'}}>Choose Image</Button>
        </Col>
      </Row>
    )
  }
}


function ModalsBody ({register, handleChange, handlePictureUpload}) {
  return (
    <ModalBody>
      <LoginInput handleChange={handleChange} value={register.email.value} tipo={register.email}/>
      <LoginInput handleChange={handleChange} value={register.username.value} tipo={register.username}/>
      <LoginInput handleChange={handleChange} value={register.password.value} tipo={register.password}/>
      <UploadImage handlePictureUpload={handlePictureUpload} tipo={register.fileToUpload} />
    </ModalBody>
  )
}

function ModalsFooter({toggle, handleSubmit}){
  return (
    <ModalFooter>
      <Button id="botaoFormModal" className="botaoForm" style={{width:'100%'}} onClick={toggle, handleSubmit}>Create</Button>
    </ModalFooter>
  )
}


class ModalCreateAccount extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: {value: '', id: 'emailModal', name: 'email', title: 'email', text:'', type: 'email'},
      password: {value: '', id:'passwordModal', name: 'password', title: 'Password', text:'', type: 'password'},
      username: {value: '', id: 'usernameModal', name: 'username', title: 'Username', text: '', type: 'text'},
      fileToUpload: {value: '', id: 'fileModal', name: 'fileToUpload', title: 'file', text: '', type: 'file'},
      modal: true
    }
    this.toggle = this.toggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePictureUpload = this.handlePictureUpload.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(event){
    let tipo = event.target.name
    this.setState({[tipo]: {...this.state[tipo], value: event.target.value}})
  }

  handlePictureUpload(event){
    console.log(event.target);
    console.log(event.target.files[0]);
    this.setState({fileToUpload: {...this.state.fileToUpload, value: event.target.files[0]}})
  }

  handleSubmit(event){
    event.preventDefault()
    let corpo = {
      email:this.state.email.value,
      user_cadastro: this.state.username.value,
      senha_cadastro: this.state.password.value,
      fileToUpload: this.state.fileToUpload.value
    }
    console.log(corpo);
    fetch('http://localhost:3001/home',
    {
      method: 'POST',
       headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify(corpo),
      file: this.state.fileToUpload.value
    }).then(res=>console.log(res)).catch(error=>console.log(error))
  }

  render(){
    return(
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Sign up</ModalHeader>
          <ModalsBody handleChange={this.handleChange} register={this.state} handlePictureUpload={this.handlePictureUpload}/>
          <ModalsFooter handleSubmit={this.handleSubmit} toggle={this.toggle} />
        </Modal>
      </div>
    )
  }
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
              <Button type="submit" className="botaoForm" id="botaoLogin">Log in</Button>
              <a id="signup" onClick={this.props.openModal} href="javascript:void(0)"><p id="crie">Or create an account!</p></a>
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
