import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Col, Container, Button, Row } from 'reactstrap';
import { BrowserRouter, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

function EachFriend({e}) {
  let imagem = require('../images/user_images/'+ e.imagem)



  return(
    <Col xs={{size:2}} md={{size:1}} className="pull-left" style={{paddingLeft:50, paddingRight:50, paddingBottom:30, paddingTop:30}}>
      <div className="friendBola">
        <Link to={`/users/${e._id}`} style={{color: 'gray', textDecoration: 'none'}}>
          <Button className='friendIconList' style={{backgroundImage: `url(${imagem})`}}>
          </Button>
          <p style={{textAlign: 'center', marginTop: '10%'}}>{e.nome}</p>
        </Link>
      </div>
    </Col>
  )
}

function FriendsList({friends}){
    let url = ''

    // accessUserPage(){
    //   fetch()
    // }
    // friends = []
    // for (var i = 0; i < 42; i++) {
    //   friends.push({nome: 'ta', imagem: 'sim'})
    // }
    // console.log(friends);
    // let amigos = friends.map(e=>{
    //   e.imagem = require('../images/user_images/' + e.imagem)
    //   return e;
    // })
  return (
      <Col xs={{size: 12}}>
        <Row>
          {friends.map(e=><EachFriend e={e}/>)}
        </Row>
      </Col>
  )
}

function FriendsTitle(props){
  return (
        <Col xs={{size: 12}}>
        <Col xs={{size: 6}}>
          <p style={{textAlign: 'left'}}>Your Network</p>
          <div className="underLine-NetworkTitle"></div>
          </Col>
        </Col>
  )
}

function Friends({friends}){
  return (
    <Row>
      <FriendsTitle />
      <FriendsList friends={friends} />
    </Row>
  )
}


export default Friends
