import React from 'react';

function ProfilePicture({imagem}){
  // profile = String(imagem)
  return(
    <div id="profilePicture">
      <div className="blocos" id={imagem.type} style={{backgroundImage: `url(${imagem.path})`}}></div>
    </div>
  )
}

export default ProfilePicture
