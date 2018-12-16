import React, { Component } from 'react';
import emojiHi from './images/emojiHi.png';
import './App.css';

class ButtonSubmit extends Component {
  render(){
    return(
      <button></button>
    )
  }
}

class FormLogin extends Component {
  render(){
    return(
      <form><ButtonSubmit /></form>
    )
  }
}


class LoginBox extends Component {
  render(){
    return (
      <div className="LoginBox">
        <img id="emoji" src={emojiHi} responsive />
        <FormLogin />
      </div>
    )
  }
}





export default LoginBox
