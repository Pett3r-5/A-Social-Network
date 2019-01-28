import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Navbar, Nav, NavbarBrand, NavLink, Form, Collapse, Input, NavItem, Button } from 'reactstrap';
import $ from 'jquery'

import ProfilePictureContainer from './ProfilePicture_container'


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


// function PicNav(props) {
//   return (
//     <div id='perfilUm' className='fade-in' style={{height: 20, width: 20}}>
//       <button type='button' className='btn btn-lg btn-danger' id='photoPerfil2'
//         data-toggle='popover'
//         title= {props.userLogadoNome}
//         data-content='<a href=\"http://pudim.com.br\">Editar perfil</a>'
//         style={{backgroundImage: `url(../images/user_images/${props.userLogadoImagem})`, marginTop: '40%', border: 'none'}}>
//       </button>
//     </div>
//   )
// }

function Logo(props){
  return (
    <NavbarBrand href="#" id="logo" className={props.logoClass}>
      sonnet
    </NavbarBrand>
  )
}

function ListLink({idProp, title}){
  return (
    <NavItem className="navItem" horizontal>
      <NavLink id={idProp} href="#">{title}</NavLink>
    </NavItem>
  )
}



class UserNavbar extends Component {
  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      picNav: null,
      logoClass: 'bigLogo'
    };
  }

  componentDidMount(){
    let component = this;
    window.addEventListener('scroll', function () {
      if ($(document).scrollTop() > 50) {
        document.getElementById('navbarSupportedContent').style.paddingBottom = '0%'
        document.getElementById('navbarSupportedContent').style.paddingTop = '0%'
        document.getElementById('navbase').style.backgroundColor = 'rgb(250, 250, 250)'
        document.getElementById('navbase').style.height = '70px'
        $('.navItem').css('margin-top','30px')
        component.setState({logoClass: 'smallLogo'})

      } else {
        document.getElementById('navbarSupportedContent').style.paddingBottom = '2%'
        document.getElementById('navbarSupportedContent').style.paddingTop = '2%'
        document.getElementById('navbase').style.backgroundColor = 'rgb(228, 199, 255)'
        document.getElementById('navbase').style.height = ''
        $('.navItem').css('margin-top','0px')
        component.setState({logoClass: 'bigLogo'})
      }
      if ($(document).scrollTop() > 250) {
        component.setState({picNav: <ProfilePictureContainer type='photoPerfil2'/>})

      } else {
        component.setState({picNav: null})
      }
    })
  }

  toggle(){
      this.setState({isOpen: !this.state.isOpen})
  }

  render(){
    return(
      <Navbar fixed="top" light expand="lg" id="navbase">
        <Logo logoClass={this.state.logoClass}/>
        <Collapse id="navbarSupportedContent" isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
              <ListLink idProp={'home'} title={'Home'}/>
              <ListLink idProp={'settings'} title={'Settings'}/>
              {this.state.picNav}
          </Nav>
          <Search />
        </Collapse>
      </Navbar>
    )
  }
}

export default UserNavbar






//
//
//
// class UserNavbar extends Component {
//   constructor(props){
//     super(props)
//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false,
//       picNav: null,
//       logoClassCss: 'bigLogo',
//       navbarContentCss: 'navbarContentBig',
//       navBaseCss: 'navbaseBig',
//       listLinkCss: 'listLinkBig'
//     };
//   }
//
//   componentDidMount(){
//     let component = this;
//     window.addEventListener('scroll', function () {
//       if ($(document).scrollTop() > 50) {
//         // document.getElementById('navbarSupportedContent').style.paddingBottom = '0%'
//         component.setState({listLinkCss: 'listLinkSmall'})
//         component.setState({navBaseCss: 'navbarContentSmall'})
//         component.setState({logoClass: 'smallLogo'})
//         component.setState({navbarContent: 'navbarContentSmall'})
//
//       } else {
//         // document.getElementById('navbarSupportedContent').style.paddingBottom = '2%'
//         component.setState({listLinkCss: 'listLinkBig'})
//         component.setState({navBaseCss: 'navbarContentBig'})
//         component.setState({logoClass: 'bigLogo'})
//         component.setState({navbarContent: 'navbarContentBig'})
//       }
//
//       if ($(document).scrollTop() > 250) {
//         component.setState({picNav: <ProfilePictureContainer type='photoPerfil2'/>})
//
//       } else {
//         component.setState({picNav: null})
//       }
//     })
//   }
//
//   toggle(){
//       this.setState({isOpen: !this.state.isOpen})
//   }
//
//   render(){
//     return(
//       <Navbar fixed="top" light expand="lg" className={this.state.navBaseCss}>
//         <Logo logoClass={this.state.logoClassCss}/>
//         <Collapse className={this.state.navbarContentCss} isOpen={this.state.isOpen} navbar>
//           <Nav className="mr-auto" navbar>
//               <ListLink idProp={'home'} className={this.state.listLinkCss} title={'Home'}/>
//               <ListLink idProp={'settings'} className={this.state.listLinkCss} title={'Settings'}/>
//               {this.state.picNav}
//           </Nav>
//           <Search />
//         </Collapse>
//       </Navbar>
//     )
//   }
// }
//
// export default UserNavbar
//
//
//
//
//
//
//
// // if (!$("#perfilUm").length) {
// // }
// //   $(function () {
// //     var template1 = '<a href="http://pudim.com.br" class="popover-body">editar perfil</a>'
// //   $('#photoPerfil2').popover({html: true})
// // })
// // $('#perfilUm').remove()
// // if ($( "#perfilDois" ).length) {
// //   }
//   // $('#photoPerfil2').popover('dispose')s
