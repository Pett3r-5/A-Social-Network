import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Container, Row, Col } from 'reactstrap';



function FooterTitle(){
  return <h4 style={{margin: '0 auto', textAlign: 'center', marginTop: '10% !important'}}>A SOcial NNETwork/chat app</h4>
}


function FooterText(){
  return(
    <Col md={{size:10, offset: 1}}>
      <p style={{margin: '0 auto', textAlign: 'center', marginTop: '1%'}}>Copyright © 2010 by me<br />
        All rights reserved. No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.
      </p>
    </Col>
  )
}

class UserFooter extends Component{
  render() {
    return (
      <footer className='footing'>
        <Container fluid style={{padding: '4% !important'}}>
          <div style={{padding: 50}}>
            <FooterTitle/>
            <FooterText/>
          </div>
        </Container>
      </footer>
    )
  }
}


export default UserFooter
