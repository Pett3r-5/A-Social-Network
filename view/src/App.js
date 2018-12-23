import React, { Component } from 'react';
import './css/App.css';
import LoginBox from './login/login'
import User from './user/user'



class App extends Component {
  constructor(props){
    super(props)
    this.state = {pg: false}
  }

  render() {
    if(this.state.pg){
      return (
        <div className="App">
          <LoginBox />
        </div>
      );
    }
    return (
      <div className="App" style={{backgroundColor: 'rgb(250,250,250)'}}>
        <User />
      </div>
    )
  }
}

// div base
// div caixa
// imagem
// form
// button login/create

export default App;
