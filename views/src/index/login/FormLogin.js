import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'reactstrap';
import '../../css/App.css';

import LoginInput from '../Login-input';


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
      user: {},
      authorized: '',
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
    this.props.http_request_get_self(this.state)
    this.props.history.push(`/user/${this.props._id}`)
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

export default withRouter(FormLogin)






// handleSubmit(event){
//   event.preventDefault()
//   fetch('http://localhost:3001',
//   {
//     method: 'POST',
//     headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'},
//     body: JSON.stringify({username: this.state.username.value, password: this.state.password.value})
//   }).then(res=> res.json()).then((result)=> {
//     console.log('aqui');
//     console.log(result)
//     if(result) {
//       this.setState({authorized: true})
//       this.props.populate_user(result)
//       this.props.history.push(`/user/${result._id}`)
//     }
//   }).catch((error)=> {
//     this.props.history.push(`/unauthorized`)
//   })
// }
