import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/user.css';
import { Col } from 'reactstrap';



function PostArrow(props){
  return(
    <Col style={{marginRight: "-86%"}}>
      <svg className="balaoCima" viewBox="0 0 5 10" style={{marginTop: "10%"}}>
        <path d="M7 0 V3 C7 7 3 8 0.5 5.4 Q0 4.4 0.8 4.3 C 0.8 4.2 5 5 7 -5" />
      </svg>
      <svg  className="balaoBaixo" viewBox="0 0 5 10" style={{marginTop: "10%"}}>
        <path d="M7 0 V3 C7 7 3 8 0.5 5.4 Q0 4.4 0.8 4.3 C 0.8 4.2 5 5 7 -5" />
      </svg>
    </Col>
  )
}

export default PostArrow;
