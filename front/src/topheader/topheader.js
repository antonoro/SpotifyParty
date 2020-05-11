import React from 'react';
import { Navbar, Button, Form, FormControl, NavDropdown, Nav } from 'react-bootstrap';
import './topheader.css';
import hash from "../hash";
import * as $ from "jquery";
import logo from './img/logoW.svg'


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
        if(this.state.userid === null)
        {
            console.log("Requesting client id...");
            fetch("/authorize")
            .then(res => res.json()
            .then(res => {
                console.log("Fetched client ID:", res.userid);
                this.setState({userid: res.userid});
                console.log("client id:", this.state.userid);
                this.props.getID(res.userid);
            }));
        }
        
    }

    componentDidUpdate() {

        if(this.props.user !== this.state.user)
        {this.setState({user: this.props.user});}

        if(this.state.devicename !== this.props.devicename && this.props.devicename !== null)
        {
            this.setState({devicename: this.props.devicename, deviceactive: `${this.props.deviceactive}`})
        }
        
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
                        <Nav.Link  className="topheader unique white" href={`/login/${this.state.userid}`}>Login with Spotify</Nav.Link>
                    </Nav>
                    :
                    <Nav bg="light" className="ml-auto">
                        <NavDropdown alignRight className="myaccountTag" title="My Account" id="dropdown-menu-align-right">

                            <NavDropdown.Item className="white">Hello, {this.state.user}</NavDropdown.Item>

                            <NavDropdown.Item className="white">Device name: {this.state.devicename}</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item className="white" href="/">Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    } 
                </Navbar.Collapse>
            </Navbar>
            
        );
    }
}

export default TopHeader;