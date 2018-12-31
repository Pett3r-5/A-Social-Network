import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Label, Button, ModalBody, ModalFooter } from 'reactstrap';
import '../../css/App.css';

import LoginInput from '../Login-input'


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

export { ModalsBody, ModalsFooter }
