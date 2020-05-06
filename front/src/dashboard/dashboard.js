import React from 'react';

import './dashboard.css'

class Dashboard extends React.Component{
    
    constructor(props){
        super();
        this.state = {
            user: null,
            loggedIn: false,
            item: null,
            refreshToggled: false,
            playbackCommandtrigger: false,
            changePlaybackTrigger: false,
            changePlayback: null,
            playback: null,
        };
    }

    componentDidMount(){
    }

    componentDidUpdate(){

        if(this.props.user !== this.state.user) // when user changes
        {
            this.setState({user: this.props.user, loggedIn: true});
            this.getMusicInfo();
        }

        if(this.state.refreshToggled)
        {
            console.log('Refreshed');
            this.getMusicInfo();
        }

        if(this.state.playbackCommandtrigger)
        {
            console.log('Triggered Play/pause');
            if(this.state.playback === true)
            {
                console.log('play');
                this.playpausePlayback("play");
            }
            else
            {
                console.log('pause');
                this.playpausePlayback("pause");
            } 
        }

        if(this.state.changePlaybackTrigger)
        {
            console.log("Command:", this.state.changePlayback);
            if(this.state.changePlayback === 2)
            {
                console.log('next song');
                this.changePlayback("next");
            }
            else if(this.state.changePlayback === 1)
            {
                console.log('previous song');
                this.changePlayback("previous");
            }
        }   
    }

    getMusicInfo = () => {
        console.log("Fetching playback info...");
        fetch("/getplayback")
        .then(res => res.json()
        .then(res => {
            console.log("res is:" , res);
            if(res !== null && res!== undefined)
            {
                console.log("Fetched!");
                this.setState({
                    item: res.item,
                    refreshToggled: false,
                    playback: res.is_playing,
                });
            }
        })
        );
    }
    
    playpausePlayback = (action) => {
        console.log("Playing/pausing playback...");
        fetch("/"+action)
        .then(res => res.json()
        .then(res => {
            
            if(res !== null)
            {
                console.log("Done!: ", res);
                this.setState({
                    playbackCommandtrigger: false
                });
            }
        })
        );
        
    }

    changePlayback = (action) => {
        console.log("Changing playback...");
        fetch("/"+action)
        .then(res => res.json()
        .then(res => {
            
            if(res !== null)
            {
                console.log("Fetched!: ", res);
                this.setState({
                    changePlaybackTrigger: false,
                });
                console.log("Waiting for spotify to change song...");
                setTimeout( () => {
                    this.setState({refreshToggled: true});
                }, 1000); // Not good practice, should find a way to coordinate with spotify, but can't predict when it'll actually have changed the song
                    
            }
            else{
                alert("Error from spotify");
            }
        })
        );
        
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
                            { (this.state.item === null || this.state.item === undefined) ?
                                <div>    
                                    <h2>Now Playing: [Nothing is playing]</h2>
                                    <button className="btn btn-warning" onClick={() => this.setState({refreshToggled: true})}>Refresh</button>
                                </div>
                            : 
                                <div>
                                    <h2>Now Playing:</h2>
                                    <h5>{this.state.item.name}</h5>
                                    <h6>Artist: {this.state.item.artists[0].name}</h6>
                                    <h6>Album: {this.state.item.album.name}</h6>
                                    <button className="btn btn-primary" onClick={() => this.setState({changePlaybackTrigger: true, changePlayback: 1})}>Previous</button>
                                    <button className="btn btn-warning" onClick={() => this.setState({refreshToggled: true})}>Refresh</button>
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
                            { (this.state.item === null || this.state.item === undefined) ?
                                <h2></h2>
                            :
                                <div>
                                    <img src={`${this.state.item.album.images[1].url}`} alt="Cover"></img> 
                                    
                                </div>
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