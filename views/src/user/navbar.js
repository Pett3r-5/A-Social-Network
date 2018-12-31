import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/user.css';
import { Navbar, Nav, NavbarBrand, NavLink, Form, Collapse, Input, NavItem, Button } from 'reactstrap';



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

class UserNavbar extends Component {
  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
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
          </Nav>
          <Search />
        </Collapse>
      </Navbar>
    )
  }
}

export default UserNavbar
