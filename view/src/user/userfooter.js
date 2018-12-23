import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Container, Navbar, NavbarBrand, Row, Col, Form, FormGroup, Input, Label, FormFeedback, FormText, Button } from 'reactstrap';

class UserFooter extends Component{
  render() {
    return (
      <footer className='footing' style={{backgroundColor: 'rgb(249, 95, 249)', height:300, width:'100%', marginTop: '5%'}}>
        <Container fluid style={{padding: '4% !important'}}>
        <div style={{padding: 50}}>
          <h4 style={{margin: '0 auto', textAlign: 'center', marginTop: '10% !important'}}>A SOcial NNETwork/chat app</h4>
          <p style={{margin: '0 auto', textAlign: 'center', paddingRight:'8%', paddingLeft:'8%', marginTop: '1%'}}>Copyright © 2010 by me<br />
  All rights reserved. No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.
          </p>
          </div>
        </Container>
      </footer>
    )
  }
}


export default UserFooter
