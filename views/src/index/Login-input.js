import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FormGroup, Input, Label, FormFeedback, FormText } from 'reactstrap';
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

export default LoginInput
