import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/user.css';
import { Row, Col } from 'reactstrap';

function PreviousPost(props){
  return (
    <Row style={{marginTop: '2%'}}>
      <Col md={{size:12}} className="blocos" style={{height: '150%', zIndex:2}}>
        <Col md={{size:10, offset:1}} className="balaoFora">
            <p className="balao" style={{textAlign: 'left'}}> {props.text} </p>
        </Col>
      </Col>
    </Row>
  )
}


export default PreviousPost
