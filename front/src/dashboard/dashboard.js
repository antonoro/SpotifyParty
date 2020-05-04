import React from 'react';
import * as $ from "jquery";
import './dashboard.css'

class Dashboard extends React.Component{
    
    constructor(props){
        super();
        this.state = {
            loggedIn: true,
            item: null,
            authToken: props.token,
            refreshToggled: false,
            playbackCommandtrigger: false,
            changePlaybackTrigger: false,
            changePlayback: null,
            playback: null,
        };
    }

    componentDidMount(){
        if(this.props.token !== undefined)
        {
            this.getMusicInfo(this.props.token);
        }  
    }

    componentDidUpdate(){
        if(this.state.refreshToggled)
        {
            console.log('Refreshed');
            this.getMusicInfo(this.state.authToken);
        }

        if(this.state.playbackCommandtrigger)
        {
            console.log('Triggered Play/pause');
            if(this.state.playback === true)
            {
                console.log('play');
                this.playpausePlayback(this.state.authToken, "play");
            }
            else
            {
                console.log('pause');
                this.playpausePlayback(this.state.authToken, "pause");
            } 
        }

        if(this.state.changePlaybackTrigger)
        {
            console.log("Command:", this.state.changePlayback);
            if(this.state.changePlayback === 2)
            {
                console.log('next song');
                this.changePlayback(this.state.authToken, "next");
            }
            else if(this.state.changePlayback === 1)
            {
                console.log('previous song');
                this.changePlayback(this.state.authToken, "previous");
            }
        }   
    }

    getMusicInfo = (token) => {
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
                        refreshToggled: false,
                        playback: data.is_playing,
                    });
                }
                
            }
        });
        
    }
    
    playpausePlayback = (token, action) => {
        $.ajax( 
        {
            url: "https://api.spotify.com/v1/me/player/"+action,
            type: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: () => {
                console.log("Playback changed to: ", this.state.playback);
                this.setState({playbackCommandtrigger: false});
            }
            
        });
        
    }

    changePlayback = (token, action) => {
        $.ajax( 
        {
            url: "https://api.spotify.com/v1/me/player/"+action,
            type: "POST",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: () => {
                console.log("Playback changed to: "+this.state.changePlayback+" song");
                this.setState({changePlaybackTrigger: false, refreshToggled: true});
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
                        <div className="col-6">
                            { this.state.item === null ?
                                <h2>Now Playing: [Nothing is playing]</h2>
                            : 
                                <div>
                                    <h2>Now Playing:</h2>
                                    <h5>{this.state.item.name}</h5>
                                    <h6>Artist: {this.state.item.artists[0].name}</h6>
                                    <h6>Album: {this.state.item.album.name}</h6>
                                    <button className="btn btn-primary" onClick={() => this.setState({changePlaybackTrigger: true, changePlayback: 1})}>Previous</button>
                                    <button className="btn btn-secondary" onClick={() => this.setState({refreshToggled: true})}>Refresh</button>
                                    { this.state.playback ?
                                        <button className="btn btn-danger" onClick={() => this.setState({playbackCommandtrigger: true, playback: false})}>Pause</button>
                                    :
                                        <button className="btn btn-success" onClick={() => this.setState({playbackCommandtrigger: true, playback: true})}>Play</button>
                                    }
                                    <button className="btn btn-primary" onClick={() => this.setState({changePlaybackTrigger: true, changePlayback: 2})}>Next</button>    
                                </div>
                            }
                        </div>
                        <div className="col-6">
                            { this.state.item === null ?
                                <h2></h2>
                            :
                                <img src={`${this.state.item.album.images[1].url}`} alt="Cover"></img> 
                            }
                        </div>
                        
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