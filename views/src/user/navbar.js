import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Navbar, Nav, NavbarBrand, NavLink, Form, Collapse, Input, NavItem, Button } from 'reactstrap';
import $ from 'jquery'


class Search extends Component {
    render(){
      return (
        <Form inline className="pull-right">
          <Input type="search" id="searching" placeholder="Search" style={{position: 'relative', display: 'inline-block'}} />
          <Button id="procura" type="submit" id="procura">Search</Button>
        </Form>
      )
    }
}


function PicNav(props) {
  return (
    <div id='perfilUm' className='fade-in' style={{height: 20, width: 20}}>
      <button type='button' class='btn btn-lg btn-danger' id='photoPerfil2'
        data-toggle='popover'
        title= {props.userLogadoNome}
        data-content='<a href=\"http://pudim.com.br\">Editar perfil</a>'
        style={{backgroundImage: `url(../images/user_images/${props.userLogadoImagem})`, marginTop: '40%', border: 'none'}}>
      </button>
    </div>
  )
}


class UserNavbar extends Component {
  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      userLogadoNome: 'teste',
      userLogadoImagem: 'aaa.png',
      picNav: null
    };
  }

  componentDidMount(){
    window.addEventListener('scroll', function () {
      if ($(document).scrollTop() > 50) {
        document.getElementById('navbarSupportedContent').style.paddingBottom = '0%'
        document.getElementById('navbarSupportedContent').style.paddingTop = '0%'
        document.getElementById('logo').style.fontSize = '100%'
        document.getElementById('logo').style.color = 'rgb(100, 150, 200)'
        document.getElementById('navbase').style.backgroundColor = 'rgb(250, 250, 250)'
      } else {
        document.getElementById('navbarSupportedContent').style.paddingBottom = '2%'
        document.getElementById('navbarSupportedContent').style.paddingTop = '2%'
        document.getElementById('logo').style.fontSize = '300%'
        document.getElementById('logo').style.color = 'rgb(150, 200, 250)'
        document.getElementById('navbase').style.backgroundColor = 'rgb(228, 199, 255)'
      }
      if ($(document).scrollTop() > 250) {
        // if (!$("#perfilUm").length) {
        // }
        //   $(function () {
        //     var template1 = '<a href="http://pudim.com.br" class="popover-body">editar perfil</a>'
        //   $('#photoPerfil2').popover({html: true})
        // })
        this.setState({picNav: <PicNav userLogadoImagem={this.state.userLogadoImagem} userLogadoNome={this.state.userLogadoNome}/>})

      } else {
        this.setState({picNav: null})
        // $('#perfilUm').remove()
        // if ($( "#perfilDois" ).length) {
        //   }
          // $('#photoPerfil2').popover('dispose')
      }
    })
  }

  toggle(){
      this.setState({isOpen: !this.state.isOpen})
  }

  render(){
    return(
      <Navbar fixed="top" light expand="lg" id="navbase">
        <NavbarBrand href="#" id="logo">
          sonnet
        </NavbarBrand>
        <Collapse id="navbarSupportedContent" isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
              <NavItem horizontal>
                <NavLink id="home" href="#">Home</NavLink>
              </NavItem>
              <NavItem horizontal>
                <NavLink id="settings" href="#">Settings</NavLink>
              </NavItem>
              {this.state.picNav}
          </Nav>
          <Search />
        </Collapse>
      </Navbar>
    )
  }
}

export default UserNavbar
