import React from 'react';
import { Navbar, Button, Form, FormControl, NavDropdown, Nav } from 'react-bootstrap';
import './topheader.css';
import hash from "../hash";
import * as $ from "jquery";
import logo from './img/record.svg'

/* David Bautista: Hola!, veo que usaron clases... podría ser mejor usando hooks no?, así mismo recuerden poner los proptypes
para validar los tipos de datos*/

const authEndpoint = "https://accounts.spotify.com/authorize";

const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-email",
];


class TopHeader extends React.Component{
    
    constructor(props){
        super();
        
        this.state = {
            user: '',
            userid: null,
            devicename: null, 
            deviceactive: false,
        };
    }

    componentDidMount() {
        
        
    }

    componentDidUpdate() {

        if(this.props.user !== this.state.user)
        {this.setState({user: this.props.user});}

        if(this.state.devicename !== this.props.devicename && this.props.devicename !== null)
        {
            this.setState({devicename: this.props.devicename, deviceactive: `${this.props.deviceactive}`})
        }
        
    }

    handleScanDeviceClick = () => {
        this.props.getDevicesID();
    }

    toggleLogOut = () => {
        sessionStorage.removeItem('useridsession');
    }

    render(){
        
        return (
            
            <Navbar  className="topheader"  expand="lg">
                <Navbar.Brand className="brandLogo" href="/"><img className="logo" alt="logo" src={logo}/></Navbar.Brand>
                <Navbar.Toggle bg="light" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse bg="light" id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    { (this.state.user === '') ?
                    <Nav className="ml-auto logintag">
                        <Nav.Link className="topheader unique white" href={`/login/${this.state.userid}`}>Login with Spotify</Nav.Link>
                    </Nav>
                    :
                    <Nav bg="light" className="ml-auto">
                        <NavDropdown alignRight className="myaccountTag" title="My Account" id="dropdown-menu-align-right">

                            <NavDropdown.Item className="white">Hello, {this.state.user}</NavDropdown.Item>
                            { this.state.devicename === null ? 
                                <div className="text-center"><NavDropdown.Item className="white">Device name: [No active device]</NavDropdown.Item>
                                <button onClick={this.handleScanDeviceClick} className="btn btn-success ">Scan devices</button></div>
                            :
                                <NavDropdown.Item className="white">Device name: {this.state.devicename}</NavDropdown.Item>
                            }
                            
                            <NavDropdown.Divider />
                            <NavDropdown.Item className="white" onClick={this.toggleLogOut} href="/">Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    } 
                </Navbar.Collapse>
            </Navbar>
            
        );
    }
}

export default TopHeader;
