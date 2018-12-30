import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal, ModalHeader } from 'reactstrap';
import '../../css/App.css';

import { ModalsBody, ModalsFooter } from './Modal-content'



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

export default ModalCreateAccount
