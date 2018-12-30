import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Row, Col } from 'reactstrap';


function ProfilePicture(){
  return(
    <div id="profilePicture">
      <div className="blocos" id="photoPerfil"></div>
    </div>
  )
}

function ProfileName({username}) {
  return (
    <div>
      <p id="profileName" >{username}</p>
      <div className="lineSeparator"></div>
    </div>
  )
}

function OnlineStatus(){
  return <p id="onlineStatus">Online</p>
}



function Profile({profile}){
    return (
      <Col md={{size: 2}}>
        <ProfilePicture />
        <ProfileName username={profile.username} />
        <OnlineStatus/>
      </Col>
    )
}

export default Profile
