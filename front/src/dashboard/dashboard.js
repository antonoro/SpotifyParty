import React from 'react';
import MyGroups from './mygroups/mygroups.js';
import Nextup from './nextup/nextup.js';
import './dashboard.css'

class Dashboard extends React.Component{
    
    constructor(props){
        super();
        this.state = {
            user: null,
            deviceID: null,
            loggedIn: false,
            item: null,
            refreshToggled: false,
            playbackCommandtrigger: false,
            playListCommandtrigger: false,
            changePlaybackTriggerNext: false,
            changePlaybackTriggerPrevious: false,
            changePlayback: null,
            playback: null,
            playlistDisplay: null,
            iteratorPlaylist:0,
            group: '',
        };
    }

    componentDidMount(){
    }

    componentDidUpdate(){

        if(this.props.user !== this.state.user && this.props.user !== null && this.props.deviceID !== this.state.deviceID && this.props.deviceID !== null) // when user changes
        {
            this.setState({user: this.props.user, loggedIn: true, deviceID: this.props.deviceID});
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

        if(this.state.changePlaybackTriggerNext)
        {
            
            var i = this.state.iteratorPlaylist;
            console.log("size:", this.state.playlistDisplay.tracklist.length);
            console.log("iterator: ", i);
            console.log('next song: ',this.state.playlistDisplay.tracklist[i]);
            
            this.playSong(this.state.playlistDisplay.tracklist[i]);
            
        }
        if(this.state.changePlaybackTriggerPrevious)
        {   
            if(this.state.iteratorPlaylist > 0)
            {
                var i = this.state.iteratorPlaylist -1;
            }
            else
            {
                var i = 0;
            }
            console.log('previous song: ',this.state.playlistDisplay.tracklist[i]);
            
            this.playSong(this.state.playlistDisplay.tracklist[i]);
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
                    playbackCommandtrigger: false,
                });
            }
        })
        );
        
    }

    playSong = (songuri) => {
        fetch("/playsong", 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({uri: `${songuri}`, deviceID: `${this.state.deviceID}`}),
        }).then(res => res.json()
        .then(res => {
            console.log(res);
            if((this.state.iteratorPlaylist) < this.state.playlistDisplay.tracklist.length)
            {
                console.log("Waiting for spotify to change song...");
                setTimeout( () => {
                    if(this.state.changePlaybackTriggerNext)
                    {
                        this.setState({
                            refreshToggled: true,
                            changePlaybackTriggerNext: false,
                            iteratorPlaylist: this.state.iteratorPlaylist + 1,
                        });
                    }
                    else if(this.state.changePlaybackTriggerPrevious){
                        this.setState({
                            refreshToggled: true,
                            changePlaybackTriggerPrevious: false,
                            iteratorPlaylist: this.state.iteratorPlaylist + 1,
                        });
                    }
                }, 1000); // Not good practice, should find a way to coordinate with spotify, but can't predict when it'll actually have changed the song
            }
            else{
                setTimeout( () => {
                    this.setState({refreshToggled: true, changePlaybackTriggerNext: false, iteratorPlaylist: 0});
                    console.log("Reset iterator: ", this.state.iteratorPlaylist);
                
                }, 1000); // Not good practice, should find a way to coordinate with spotify, but can't predict when it'll actually have changed the song
            }
           
        }));
        
    } 

    changePlaybackNext = () => {
        console.log("Changing playback...");
        fetch("/next")
        .then(res => res.json()
        .then(res => {
            
            if(res !== null)
            {
                console.log("Fetched!: ", res);
                this.setState({
                    changePlaybackTriggerNext: false,
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

    changePlaybackPrevious = (action) => {
        console.log("Changing playback...");
        fetch("/previous")
        .then(res => res.json()
        .then(res => {
            
            if(res !== null)
            {
                console.log("Fetched!: ", res);
                this.setState({
                    changePlaybackTriggerPrevious: false,
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

    getSelectedPlaylist = (playlist) => {
        console.log("Got selected playlist in dashboard: ", playlist.name);
        this.setState({playlistDisplay: playlist, iteratorPlaylist: 0});
    }

    getSelectedGroup = (group) => {
        console.log("Got selected group in dashboard: ", group);
        this.setState({group: group});
    }

    addedSongtoPlaylist = (newplaylist) => {
        console.log("Got updated playlist in dashboard: ", newplaylist);
        this.setState({playlistDisplay: newplaylist});
    }

    render(){
        
        return (
            <div id="mainrow" className="row">    
                <div id="mygroups" className="col-2 border-right border-top">
                    <div className="row justify-content-center">
                        <h2>My groups</h2>
                        <MyGroups user={this.state.user} getplaylist={this.getSelectedPlaylist} getGroup={this.getSelectedGroup} updatedPlaylist={this.state.playlistDisplay}/>
                    </div>
                    
                </div>
                <div className="col-7">
                    <div className="row nowplaying border-bottom border-top">
                        <div className="col-6">
                            { (this.state.item === null || this.state.item === undefined) ?
                                <div>    
                                    <h2>Now Playing: [Nothing is playing]</h2>
                                    <button className="btn btn-warning" onClick={() => this.setState({refreshToggled: true})}>Refresh</button>
                                    { this.state.playlistDisplay !== null ?
                                        <button className="btn btn-primary" onClick={() => this.setState({changePlaybackTriggerNext: true})}>Play Next</button>
                                    :
                                        <div>
                                        </div>
                                    }
                                </div>
                            : 
                                <div>
                                    <h2>Now Playing:</h2>
                                    <h5>{this.state.item.name}</h5>
                                    <h6>Artist: {this.state.item.artists[0].name}</h6>
                                    <h6>Album: {this.state.item.album.name}</h6>
                                    
                                    <button className="btn btn-warning" onClick={() => this.setState({refreshToggled: true})}>Refresh</button>
                                    { this.state.playback ?
                                        <button className="btn btn-danger" onClick={() => this.setState({playbackCommandtrigger: true, playback: false})}>Pause</button>
                                    :
                                        <button className="btn btn-success" onClick={() => this.setState({playbackCommandtrigger: true, playback: true})}>Play</button>
                                    }
                                    { this.state.playlistDisplay !== null && this.state.iteratorPlaylist < this.state.playlistDisplay.tracklist.length ?
                                        <button className="btn btn-primary" onClick={() => this.setState({changePlaybackTriggerNext: true})}>Next</button>
                                    :
                                        <button className="btn btn-primary" disabled>Next</button>
                                    }
                                    
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
                    <div>
                        <Nextup playlist={this.state.playlistDisplay} getUpdatedPlaylist={this.addedSongtoPlaylist} group={this.state.group} nextup={this.state.iteratorPlaylist}/>
                    </div>
                    
                </div>
                <div id="chat" className="col-3 border-left border-top">
                    <h2>Chat</h2>
                </div>
            </div>
        );
    }
}

export default Dashboard;