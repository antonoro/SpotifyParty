import React, { useLayoutEffect } from 'react';
import './nextup.css';
import {Table} from 'react-bootstrap';

class Nextup extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            group: '',
            userID: null,
            playlist: null,
            playlistname: null,
            tracklist: [["", ""]],
            nextup: 0,
            searchedTrack: '',
            foundTracks: [],
        }
    }

    componentDidUpdate(){
        
        if(this.state.playlist !== this.props.playlist && this.props.playlist !== null && this.props.groups !== this.state.group)
        { 
            var urilist = [];
            this.props.playlist.tracklist.map((element,i) => {
                return  urilist[i] = element;
            });
            this.setState({playlist: this.props.playlist, playlistname: this.props.playlist.name, group: this.props.group});
            if(urilist.length > 0)
            {
                this.getTrackInfos(urilist);
            }
            else{
                this.setState({tracklist: [["", ""]]});
            }
        }

        if(this.props.user !== '' && this.state.userID !== this.props.userid)
        {
            this.setState({userID: this.props.userid});
        }

        if(this.state.nextup !== this.props.nextup)
        {
            if(this.props.nextup < this.state.tracklist.length)
            {
                this.setState({nextup: this.props.nextup});
            }

            if(this.state.tracklist.length === 0)
            {
                this.setState({nextup: 0});
            }
            
        }

    
    }

    getTrackInfos = (tracklist) => {
        fetch("/gettracksinfo", 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({tracks: tracklist, userid: this.state.userID}),
        }).then(res => res.json()
        .then(res => {
            console.log("Fetched tracks info:", res);
            var tracks = [];
            res.map((track, i) => {
                return tracks[i] = [track.name, track.artists[0].name, track.album.name, `${(Math.floor(track.duration_ms/60000)).toFixed(0)}:${((track.duration_ms/1000)%60).toFixed(0)}`, track.uri];
            });
            console.log("Tracks:", tracks);
            this.setState({tracklist: tracks});
        }));
        
    } 

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: [event.target.value], 
        })
    }

    searchSubmit = (event) => {
        event.preventDefault();
        if(event.target.searchedTrack.value !== '')
        {
            fetch('/searchtracks', {
                method:'POST',
                body: JSON.stringify({searchedTrack: `${this.state.searchedTrack}`, userid: this.state.userID}),
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
            .then(resp => {
                if(resp !== null)
                {
                    console.log("Returned tracks:", resp.items);
                    var tracks = [];
                    resp.items.map((track, index) => {
                        return tracks[index] = [track.name, track.artists[0].name, track.album.name, track.uri];
                    })
                    this.setState({foundTracks: tracks, searchedTrack: ''});
                    console.log("tracks: ", this.state.foundTracks);
                }
            });
        }
        
    }

    addSongtoMongo = (song) => {
        console.log(song.target.value);
        var uri = song.target.value.split(':');
        fetch("/addtracktoplaylist", {
            method:'POST',
            body: JSON.stringify({uriTrack: `${uri[2]}`,playlist: `${this.state.playlistname}`, group: `${this.state.group}`, userid: this.state.userID}),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
        .then(resp => {
            console.log("Playlists", resp);
            this.setState({foundTracks: []});
            this.props.getUpdatedPlaylist(resp, this.state.group);
        });
    }

    render() {

        return (
            <div className="row nextupAddsong" style={{}}>
                <div className="col-6">
                { this.state.playlist !== null ?
                    <div className="nextupSection">
                        <h3 className="bigF">Next up: {this.state.tracklist[this.state.nextup][0]} - {this.state.tracklist[this.state.nextup][1]}</h3>
                        <label>Playlist name: {this.state.playlistname} Group: {this.state.group}</label>
                        <Table striped border>
                            <thead className="nextup">
                                <th>#</th>
                                <th>Song</th>
                                <th>Artist</th>
                                <th>Album</th>
                                <th>Duration</th>
                            </thead>
                            <tbody>
                            {this.state.tracklist.map((element, index) => {
                                return(<tr className="nextup">
                                    <td>{index+1}</td>
                                    <td>{element[0]}</td>
                                    <td>{element[1]}</td>
                                    <td>{element[2]}</td>
                                    <td>{element[3]}</td>
                                </tr>)
                            })
                            }
                            </tbody>
                        </Table>
                        
                    </div>
                :
                    <h2 className="nextupSection">[No playlist selected]</h2>
                }
                </div>
                <div className="col-6 nextupSection">
                    <h2 div className="nextup">Add song to playlist</h2>
                    { this.state.playlist !== null ?
                    <div>
                        <form class="form-inline justify-content-center" onSubmit={this.searchSubmit}>
                            <div class="form-group mb-2 ">
                                <input onChange={this.handleInputChange} className="form-control" name="searchedTrack" value={this.state.searchedTrack} type="text" placeholder="Search song..."/>
                            </div>
                            <button className="btn btn-success mb-2" type="submit">Search</button>
                        </form>
                        <Table striped border className="nextup">
                            <thead >
                                <th>Song</th>
                                <th>Artist</th>
                                <th>Album</th>
                                <th>Select</th>
                            </thead>
                            { this.state.foundTracks.length > 0 ?
                                <tbody>
                                {this.state.foundTracks.map((element, index) => {
                                    return(
                                        <tr>
                                            <td>{element[0]}</td>
                                            <td>{element[1]}</td>
                                            <td>{element[2]}</td>
                                            <td>
                                                <button onClick={this.addSongtoMongo.bind(this)} value={element[3]} className="btn btn-success">Add</button>
                                            </td>
                                        </tr>
                                    )
                                })
                                }   
                                </tbody>
                                :
                                <tbody>

                                </tbody>
                            }
                            
                        </Table>
                    </div>
                    :
                    <div>
                    </div>
                    }
                </div>
                
            </div>
        );
    }
}
export default Nextup;