import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import './css/App.css';

import LoginBox from './index/login/LoginBox'
import User from './user/user'



class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={LoginBox} />
            <Route exact path="/user/:id" component={User} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// div base
// div caixa
// imagem
// form
// button login/create

export default App;
