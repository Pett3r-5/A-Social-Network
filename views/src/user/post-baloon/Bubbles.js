import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/user.css';
import { Row } from 'reactstrap';

function Bubbles() {
  return (
    <Row>
      <div className="blocos" id="bolaUm"></div>
      <div className="blocos" id="bolaDois"></div>
      <div className="blocos" id="bolaTres"></div>
    </Row>
  )
}

export default Bubbles
