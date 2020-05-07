import React from 'react';
import './nextup.css';
import {Table} from 'react-bootstrap';

class Nextup extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            playlist: null,
            playlistname: null,
            tracklist: [],
            nextup: [],
        }
    }

    componentDidUpdate(){
        if(this.state.playlist !== this.props.playlist)
        { 
            var urilist = [];
            this.props.playlist.map((element,i) => {
                if( i > 0)
                {
                    urilist[i-1] = element;
                }
            });
            this.setState({playlist: this.props.playlist});
            this.getTrackInfos(urilist);
        }
    }

    getTrackInfos = (tracklist) => {
        fetch("/gettracksinfo", 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tracklist),
        }).then(res => res.json()
        .then(res => {
            console.log("Fetched tracks info:", res);
            var tracks = [];
            res.map((track, i) => {
                tracks[i] = [track.name, track.artists[0].name, track.album.name, `${(Math.floor(track.duration_ms/60000)).toFixed(0)}:${((track.duration_ms/1000)%60).toFixed(0)}`, track.uri];
            });
            console.log("Tracks:", tracks);
            this.setState({tracklist: tracks, nextup: tracks[0]});
        }));
        
    } 

    render() {

        return (
            <div className="row nextupAddsong border">
                <div className="col-6 border-right">
                { this.state.playlist !== null ?
                    <div className="nextup">
                        <h3>Next up: {this.state.nextup[0]} ({this.state.nextup[1]})</h3>
                        <label>Playlist name: {this.state.playlist[0]}</label>
                        <Table striped border>
                            <thead>
                                <th>#</th>
                                <th>Song</th>
                                <th>Artist</th>
                                <th>Album</th>
                                <th>Duration</th>
                            </thead>
                            <tbody>
                            {this.state.tracklist.map((element, index) => {
                                return(<tr>
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
                    <h2 className="nextup">[No playlist selected]</h2>
                }
                </div>
                <div className="col-6 ">
                    <h2 div className="nextup">Add song to playlist</h2>
                </div>
                
            </div>
        );
    }
}
export default Nextup;