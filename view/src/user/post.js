import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Container, Navbar, NavbarBrand, Row, Col, Form, FormGroup, Input, Label, FormFeedback, FormText, Button } from 'reactstrap';

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

class PostBox extends Component{
  render() {
    return (
      <Col>
        <Container className="blocos" style={{minHeight: 200}}>
          <Col sm style={{float:'left'}}>
            <div style={{width:'20%', height: '70%', textAlign: 'center', paddingTop:'0.5%', marginTop:'2%', backgroundColor: 'rgb(200, 190, 200)'}}>Wall </div>
          </Col>
          <Row className="balaoFora" style={{width: '90%', height: '80%'}}>
            <Form id="newPost" style={{width: '100%', height: "100%"}}>
              <textarea id="txtarea" name="post" style={{width: '100%', height: '60%', backgroundColor:'rgb(240, 230, 240)', border: '2px solid white', borderRadius: '5px'}} className="balao" selected> Write something</textarea><br/>
              <Input type="submit" value="Post" id="botaoPost" style={{zIndex: 7, position: 'absolute', display: 'block', width: 100, height: '50 !important', backgroundColor:'rgb(220, 230, 240) !important', marginTop: '1%'}} />
            </Form>
          </Row>
        </Container>
      </Col>
    )
  }
}

class Post extends Component{
  render() {
    return (
      <Col md={{size: 10}} id="">
        <Row>
          <PostArrow />
          <PostBox />
        </Row>
      </Col>
    )
  }
}


export default Post
