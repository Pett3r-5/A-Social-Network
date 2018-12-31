import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/user.css';
import { Row, Col, Input, Button } from 'reactstrap';


function WallLabel(){
  return (
    <Row >
      <Col md={{size:3}}>
        <div id="wallLabel">Wall</div>
      </Col>
    </Row>
  )
}

class BaloonTextArea extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <Row>
        <Col md={{size:12}}>
          <Input type="textarea" name="post" id="txtarea" className="balao" placeholder="Write something"
          onChange={this.props.handleChange}
          value={this.props.value}
          selected />
        </Col>
      </Row>
    )
  }
}



function BaloonSubmitButton({handleSubmit}) {

  return (
    <Row>
      <Col md={{size:2, offset: 10}}>
        <Button type="button" value="Post" id="botaoPost" className="btn-block" onClick={handleSubmit} >Post</Button>
      </Col>
    </Row>
  )
}

export { WallLabel, BaloonTextArea, BaloonSubmitButton }
