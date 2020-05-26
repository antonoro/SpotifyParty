import React from 'react';
import './mygroups.css';
import {Accordion, Card, ToggleButtonGroup, ToggleButton, Form, Button, Collapse} from 'react-bootstrap';

class MyGroups extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user: '',
            userID: null,
            loggedIn: false,
            getgroups: false,
            groups: null,
            newPlaylist: '',
            newPlaylistGroup: '',
            newGroup: '',
            newMember: '',
            newMemberGroup: '',
            selectedGroup: null,
            updatedPlaylist: null,
        }
    }

    componentDidUpdate(){
        if(this.props.user !== this.state.user && this.props.user !== '' && this.state.userID !== this.props.userid) // when user changes
        {
            this.setState({user: this.props.user, loggedIn: true, getgroups: true, userID: this.props.userid});
            
        }

        if(this.state.selectedGroup !== this.props.selectedGroup)
        {
            this.setState({selectedGroup: this.props.selectedGroup});
        }

        if(this.state.groups !== null && this.state.selectedGroup !== null && this.props.playlistToMyGroups !== this.state.updatedPlaylist)
        {
            var groups = this.state.groups;
            groups.map((element, i) => {
                if(element.playlists.length && element.groupname === this.state.selectedGroup)
                {
                    var playlists = element.playlists;
                    playlists.map((playlist, index) => {
                        if(playlist.name === this.props.playlistToMyGroups.name)
                        {
                            console.log("Old tracklist:", playlist.tracklist);
                            console.log("to update with:", this.props.playlistToMyGroups.tracklist);
                            if(playlist.tracklist !== this.props.playlistToMyGroups.tracklist)
                            {
                                
                                var newgroups = groups;
                                newgroups[i].playlists[index].tracklist = this.props.playlistToMyGroups.tracklist;
                                this.setState({groups: newgroups, updatedPlaylist: this.props.playlistToMyGroups});
                            }
                        }
                    });
                }
            });
        }    

        if(this.state.loggedIn === true && this.state.getgroups === true)
        {
            this.getAllgroups();
        }
    }

    getAllgroups() {
        fetch("/getallgroups", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userid: this.state.userID}),
        })
        .then(res => res.json()
        .then(res => {
            console.log("Res is: ", res);
            this.setState({groups: res, getgroups: false})
            
        }));
    }

    handleSelectedPlaylist = (val) => {
        console.log("Selected playlist in MyGroups: ", `${val[0].name} from group: ${val[1]}`);
        this.props.getplaylist(val[0], val[1]);
    }

    handleSelectedGroup = (val) => {
        console.log("Active group is: ", val.target.getAttribute("value") );
        this.props.getGroup(val.target.getAttribute("value"));
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: [event.target.value], 
        })
    }

    handleAddPlaylistSubmit = (event) => {
        event.preventDefault();
        if(event.target.newPlaylist.value !== '')
        {
            fetch('/createplaylist', 
            {
                method: 'POST', 
                body: JSON.stringify({newplaylist: `${this.state.newPlaylist}`, relatedgroup: `${event.target.newPlaylistGroup.value}`}),
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
            .then(resp => {
                console.log("addplaylist response:", resp);
                if(resp !== null)
                {
                    this.setState({newPlaylist: '', newPlaylistGroup: '', getgroups: true});
                    console.log(this.state.newPlaylist);
                }
            });
        }
    }

    handleAddGroupSubmit = (event) => {
        event.preventDefault();
        if(event.target.newGroup.value !== '')
        {
            var newArchivegroup = this.state.newGroup;
            fetch('/creategroup', 
            {
                method: 'POST', 
                body: JSON.stringify({newgroup: `${this.state.newGroup}`, userid: this.state.userID}),
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
            .then(resp => {
                if(resp !== null)
                {
                    this.setState({newGroup: '', getgroups: true});
                    fetch('/creategroupmessages', 
                    {
                        method: 'POST', 
                        body: JSON.stringify({group: `${newArchivegroup}`}),
                        headers: { 'Content-Type': 'application/json' },
                    }).then(res => res.json())
                    .then(resp => {
                        if(resp !== null)
                        {
                            console.log("Group chatarchive created");
                        }
                    })
                }
            });
        }
    }

    handleAddMemberSubmit = (event) => {
        event.preventDefault();
        if(event.target.newMember.value !== '')
        {
            fetch('/addmember', 
            {
                method: 'POST', 
                body: JSON.stringify({newMember: `${this.state.newMember}`, relatedgroup: `${event.target.newMemberGroup.value}`}),
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
            .then(resp => {
                if(resp !== null)
                {
                    this.setState({newMember: '', newMemberGroup: '', getgroups: true});
                    
                }
            });
        }
    }

    render() {

        return (
            <div className="fullsize">
                { this.state.user !== null ?
                    <div className="fullsize">

                        { this.state.groups !== null ?
                            <Accordion defaultActiveKey="0">
                                {   this.state.groups.map((group, index) =>
                                    {
                                        return (
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} onClick={this.handleSelectedGroup} value={group.groupname} eventKey={index}>
                                                {group.groupname}
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey={index}>
                                                <Card.Body>
                                                    <h4>Members</h4>
                                                    <ul id="MemberList">
                                                        {group.members.map((member, i) => {
                                                            var displayName = member.split("@")[0];
                                                            return(<h6>{displayName}</h6>)
                                                            })
                                                        }
                                                    </ul>
                                                    <Accordion>
                                                        <Accordion.Toggle as={Button} eventKey={3}>
                                                            Add Member
                                                        </Accordion.Toggle>
                                                       
                                                        <Accordion.Collapse eventKey={3}>
                                                            <Card.Body>
                                                                <form onSubmit={this.handleAddMemberSubmit}>
                                                                    <Form role="form">
                                                                        <Form.Group>
                                                                            <Form.Control name="newMemberGroup" type="hidden" value={this.state.groups[index].groupname}/>
                                                                            <Form.Control onChange={this.handleInputChange} name="newMember" type="email" placeholder="Enter email" value={this.state.newMember}/>
                                                                            
                                                                            <Button className="btnAddPlaylist" variant="success" type="submit">
                                                                                Add
                                                                            </Button>
                                                                        </Form.Group>
                                                                    </Form>
                                                                </form>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <h4 className="labelPlaylist">Playlists</h4>
                                                    <div id="fixedspacing">
                                                        <p></p>
                                                    </div>
                                                    <ToggleButtonGroup type="radio" name="playlists" vertical onChange={this.handleSelectedPlaylist}>
                                                        {group.playlists.map((playlist, i) => {
                                                            return(
            
                                                                <ToggleButton value={[this.state.groups[index].playlists[i],this.state.groups[index].groupname]} >{playlist.name}</ToggleButton>
                                                                
                                                            )
                                                        })
                                                        }
                                                    </ToggleButtonGroup>
                                                    <div id="fixedspacing">
                                                        <p></p>
                                                    </div>
                                                    <Accordion>
                                                        <Accordion.Toggle as={Button} eventKey={2}>
                                                            Create Playlist
                                                        </Accordion.Toggle>
                                                       
                                                        <Accordion.Collapse eventKey={2}>
                                                            <Card.Body>
                                                                <form onSubmit={this.handleAddPlaylistSubmit}>
                                                                    <Form role="form">
                                                                        <Form.Group>
                                                                            <Form.Control name="newPlaylistGroup" type="hidden" value={this.state.groups[index].groupname}/>
                                                                            <Form.Control onChange={this.handleInputChange} name="newPlaylist" type="text" placeholder="Enter name" value={this.state.newPlaylist}/>
                                                                            
                                                                            <Button className="btnAddPlaylist" variant="success" type="submit">
                                                                                Create
                                                                            </Button>
                                                                        </Form.Group>
                                                                    </Form>
                                                                </form>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                              </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        
                                        )
                                    })
                                }
                            </Accordion> 
                        :
                            <div>
                                
                            </div>
                        }

                        <Accordion>
                            <Accordion.Toggle as={Card.Header} eventKey={1}>
                                Create Group
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1}>
                                <Card.Body>
                                    <form onSubmit={this.handleAddGroupSubmit}>
                                        <Form>
                                            <Form.Group>
                                            <Form.Control className="input" onChange={this.handleInputChange} name="newGroup" type="text" placeholder="Enter name" value={this.state.newGroup}/>
                                            </Form.Group>
                                            <Button className="btnAddPlaylist" variant="success" type="submit">
                                                Create
                                            </Button>
                                        </Form>
                                    </form>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Accordion>
                            
                    </div>
                    :
                    <h4>Not logged in</h4>
                }
                    
                
            </div>
        );
    }
}
export default MyGroups;