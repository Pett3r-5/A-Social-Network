import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Navbar, NavbarBrand, Row, Col, Form, FormGroup, Input, Label, FormFeedback, FormText, Button } from 'reactstrap';

class Profile extends Component{
  render() {
    return (
      <Col md={{size: 2}} id="adiconarForm" style={{textAlign: 'center', maxWidth: '20%'}}>
        <div id="perfilDois" style={{margin: 'auto', height: 100, width: 100}}>
          <div className="blocos" id="photoPerfil"></div>
        </div>
        <p id="nomePerfil" style={{textAlign: 'center', marginTop: '7%', fontSize: '120%'}}>UserPrimeiro</p>
        <div style={{margin: 'auto', height: 1, width:100, backgroundColor: 'lightgrey', marginTop: '-5%'}}></div>
        <p style={{fontSize: '90%', textAlign: 'center', marginTop: '5%'}}>Online</p>
      </Col>
    )
  }
}

export default Profile
