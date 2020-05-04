import React from 'react';
import { Navbar, Button, Form, FormControl, NavDropdown, Nav } from 'react-bootstrap';
import './topheader.css';
import hash from "../hash";
import * as $ from "jquery";

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
        super(props);
        
        this.state = {
            loggedIn: false,
            token: null,
            email: null,
            username: null,
        };
    }

    componentDidMount() {
        
        console.log("URI", this.state.redirect_uri);
        let _token = hash.access_token;
        if (_token) {
            // Set token
            console.log("token is: ", _token);
            this.props.getAccessToken(_token);
            this.getAccountInfo(_token);
            this.setState({
                loggedIn: true,
            });
        }
        else{
            this.setState({
                loggedIn: false,
            });
        }
    }

    getAccountInfo(token) {
        $.ajax( 
        {
            url: "https://api.spotify.com/v1/me",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                this.setState({
                    username: data.display_name
                });
                console.log(this.state.email);
            }
        });
        
    }

    render(){
        
        return (
            
            <Navbar className="topheader" bg="light" expand="lg">
                <Navbar.Brand className="brandLogo" href="/">Spotify Party</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                    { this.state.loggedIn === false ?
                    <Nav className="ml-auto logintag">
                        <Nav.Link href=
                        {`${authEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>Login with Spotify</Nav.Link>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <NavDropdown className="myaccountTag" title="My Account" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">Hello, {this.state.username}</NavDropdown.Item>
                            <NavDropdown.Item href="#">Preferences</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    }
                    

                    <Form inline className="searchButton">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button  variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            
        );
    }
}

export default TopHeader;