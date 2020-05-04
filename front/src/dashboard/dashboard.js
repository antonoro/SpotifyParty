import React from 'react';
import * as $ from "jquery";
import './dashboard.css'

class Dashboard extends React.Component{
    
    constructor(props){
        super();
        this.state = {
            loggedIn: true,
            item: null,
        };
    }

    componentDidMount(){
        if(this.props.token !== null)
        {
            this.getAccountInfo(this.props.token);
        }
        
    }

    getAccountInfo(token) {
        $.ajax( 
        {
            url: "https://api.spotify.com/v1/me/player",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                if(data !== undefined)
                {
                    this.setState({
                        item: data.item,
                    });
                }
                
            }
        });
        
    }
    
    render(){
        
        return (
            <div className="row">    
                <div id="mygroups" className="col-2 border">
                    <div className="row justify-content-center">
                        <h2>My groups</h2>
                    </div>
                    
                </div>
                <div className="col-7">
                    <div className="row nowplaying border">
                        { this.state.item === null ?
                            <h2>Now Playing: [Nothing is playing]</h2>
                        :
                            <div className="row">
                                <div className="col">
                                    <h2>Now Playing: {this.state.item.name}</h2>
                                    <h4>Artist: {this.state.item.artists[0].name}</h4>
                                    <h4>Album: {this.state.item.album.name}</h4>
                                </div>
                                <div className="col">
                                    <img src={`${this.state.item.album.images[1].url}`} alt="Cover"></img>
                                </div>
                            </div>
                            
                            
                        }
                        
                        
                        
                    </div>
                    <div className="row nextup border">
                        <h2>Next up:</h2>
                    </div>
                    
                </div>
                <div id="chat" className="col-3 border">
                    <h2>Chat</h2>
                </div>
            </div>
        );
    }
}

export default Dashboard;