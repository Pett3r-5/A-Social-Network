import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Col } from 'reactstrap';

import ProfilePictureContainer from './ProfilePicture_container'




function ProfileName({nome}) {
  return (
    <div>
      <p id="profileName" >{nome}</p>
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
        <ProfilePictureContainer type={'photoPerfil'}/>
        <ProfileName nome={profile.nome} />
        <OnlineStatus/>
      </Col>
    )
}

export default Profile
