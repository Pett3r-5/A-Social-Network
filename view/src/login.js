import React, { Component } from 'react';
import emojiHi from './images/emojiHi.png';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Form, FormGroup, Input, Label, FormFeedback, FormText, Button,
          Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './App.css';




function LoginInput(props){
  return(
    <FormGroup>
      <Label for={props.tipo.name} style={{textAlign: 'left !important'}}>{props.tipo.title}</Label>
      <Input onChange={props.handleChange}
            value={props.value}
            type={props.tipo.type}
            name={props.tipo.name}
            id={props.tipo.name}
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
          <input type="file" name="fileToUpload" id="inputUpload" style={{display: 'none'}} />
          <Label htmlFor="botaoImagem">Avatar</Label>
          <Button onClick={this.uploadImage} id="botaoImagem" style={{marginTop: '0%', height: 50, width:'80%', backgroundColor: 'white !important'}}>Choose Image</Button>
        </Col>
      </Row>
    )
  }
}




class ModalCreateAccount extends Component {
  constructor(props){
    super(props)
    this.state = {modal: false}
    this.toggle = this.toggle.bind(this)
    this.state = {email: ''}
    this.state = {password: ''}
    this.state = {username: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.setState({modal: true})
    this.setState({email: {value: '', name: 'email', title: 'email', text:'', type: 'email'}})
    this.setState({password: {value: '', name: 'password', title: 'Password', text:'', type: 'password'}})
    this.setState({username: {value: '', name: 'username', title: 'Username', text: '', type: 'text'}})
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

  handleSubmit(event){
    event.preventDefault()
    fetch('http://localhost:3001/home',
    {
      method: 'POST',
       headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({email:this.state.email.value, user_cadastro: this.state.username.value, senha_cadastro: this.state.password.value})
    }).then(res=>console.log(res)).catch(error=>console.log(error))
  }

  render(){
    if(this.state.username){
      return(
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Sign up</ModalHeader>
            <ModalBody>
              <LoginInput handleChange={this.handleChange} value={this.state.email.value} tipo={this.state.email}/>
              <LoginInput handleChange={this.handleChange} value={this.state.username.value} tipo={this.state.username}/>
              <LoginInput handleChange={this.handleChange} value={this.state.password.value} tipo={this.state.password}/>
              <UploadImage />
            </ModalBody>
            <ModalFooter>
              <Button id="botaoFormModal" className="botaoForm" style={{width:'100%'}} onClick={this.toggle, this.handleSubmit}>Create</Button>
            </ModalFooter>
          </Modal>
        </div>
      )
    }
    return null
  }
}

class FormLogin extends Component {
  constructor(props){
    super(props)
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {username: {value:''}}
    this.state = {password: {value:''}}
  }

  componentDidMount(){
    this.setState({username: {value: '', name: 'username', title: 'Username', text: 'For testing purposes, try logging in as: batman', type: 'text'}})
    this.setState({password: {value: '', name: 'password', title: 'Password', text:'Try logging in with the password 123456', type: 'password'}})
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
    if(this.state.username){
      return(
            <Form className="loginForm" onSubmit={this.handleSubmit}>
              <LoginInput handleChange={this.handleChange} value={this.state.username.value} tipo={this.state.username}/>
              <LoginInput handleChange={this.handleChange} value={this.state.password.value} tipo={this.state.password}/>
              <Button type="submit" className="botaoForm" id="botaoLogin">Log in</Button>
              <a id="signup" onClick={this.props.openModal} href="javascript:void(0)"><p id="crie">Or create an account!</p></a>
            </Form>

      )
    }
    return null
  }
}


class LoginBox extends Component {
  constructor(props){
    super(props)
    this.state = {modalOpened: false}
    this.openModal = this.openModal.bind(this)
  }

  openModal(){
    console.log('entrou');
    console.log(this.state.modalOpened);
    this.setState({modalOpened: !this.state.modalOpened})

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
