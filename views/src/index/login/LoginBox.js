import React, { Component } from 'react';
import emojiHi from '../../images/emojiHi.png';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col } from 'reactstrap';
import '../../css/App.css';

import FormLoginContainer from './FormLogin_container'
import ModalCreateAccount from '../signup/Modal-create-account'






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
            <div className="LoginBox">
              <img id="emoji" src={emojiHi} alt="emoji logo"/>
              <FormLoginContainer openModal={this.openModal}/>
            </div>
          </div>
          {this.state.modalOpened? <ModalCreateAccount /> : null}
        </Col>
      </Row>
    )
  }
}





export default LoginBox
