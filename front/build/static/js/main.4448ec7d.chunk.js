(this.webpackJsonpspotifypartyfront=this.webpackJsonpspotifypartyfront||[]).push([[0],{42:function(e,t,a){e.exports=a.p+"static/media/record.b3d8db83.svg"},48:function(e,t,a){e.exports=a.p+"static/media/vynil.2840d63a.svg"},49:function(e,t,a){e.exports=a.p+"static/media/record.b3d8db83.svg"},52:function(e,t,a){e.exports=a(69)},57:function(e,t,a){},58:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){},67:function(e,t,a){},68:function(e,t,a){},69:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),l=a(19),o=a.n(l),r=(a(57),a(10)),i=a(11),c=a(14),u=a(13),p=a(77),g=a(79),m=a(76);a(58),window.location.hash.substring(1).split("&").reduce((function(e,t){if(t){var a=t.split("=");e[a[0]]=decodeURIComponent(a[1])}return e}),{});window.location.hash="";a(59);var d=a(42),h=a.n(d),y=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this)).handleScanDeviceClick=function(){n.props.getDevicesID()},n.toggleLogOut=function(){sessionStorage.removeItem("useridsession")},n.state={user:"",userid:null,devicename:null,deviceactive:!1},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){this.props.user!==this.state.user&&this.setState({user:this.props.user}),this.state.devicename!==this.props.devicename&&null!==this.props.devicename&&this.setState({devicename:this.props.devicename,deviceactive:"".concat(this.props.deviceactive)})}},{key:"render",value:function(){return s.a.createElement(p.a,{className:"topheader",expand:"lg"},s.a.createElement(p.a.Brand,{className:"brandLogo",href:"/"},s.a.createElement("img",{className:"logo",alt:"logo",src:h.a})),s.a.createElement(p.a.Toggle,{bg:"light","aria-controls":"basic-navbar-nav"}),s.a.createElement(p.a.Collapse,{bg:"light",id:"basic-navbar-nav"},s.a.createElement(g.a,{className:"mr-auto"}),""===this.state.user?s.a.createElement(g.a,{className:"ml-auto logintag"},s.a.createElement(g.a.Link,{className:"topheader unique white",href:"/login/".concat(this.state.userid)},"Login with Spotify")):s.a.createElement(g.a,{bg:"light",className:"ml-auto"},s.a.createElement(m.a,{alignRight:!0,className:"myaccountTag",title:"My Account",id:"dropdown-menu-align-right"},s.a.createElement(m.a.Item,{className:"white"},"Hello, ",this.state.user),null===this.state.devicename?s.a.createElement("div",{className:"text-center"},s.a.createElement(m.a.Item,{className:"white"},"Device name: [No active device]"),s.a.createElement("button",{onClick:this.handleScanDeviceClick,className:"btn btn-success "},"Scan devices")):s.a.createElement(m.a.Item,{className:"white"},"Device name: ",this.state.devicename),s.a.createElement(m.a.Divider,null),s.a.createElement(m.a.Item,{className:"white",onClick:this.toggleLogOut,href:"/"},"Log out")))))}}]),a}(s.a.Component),f=a(35),v=(a(64),a(78)),b=a(80),E=a(75),S=a(34),N=a(81),k=a(47),T=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleSelectedPlaylist=function(e){console.log("Selected playlist in MyGroups: ","".concat(e[0].name," from group: ").concat(e[1])),n.props.getplaylist(e[0],e[1])},n.handleSelectedGroup=function(e){console.log("Active group is: ",e.target.getAttribute("value")),n.props.getGroup(e.target.getAttribute("value"))},n.handleInputChange=function(e){n.setState(Object(f.a)({},e.target.name,[e.target.value]))},n.handleAddPlaylistSubmit=function(e){e.preventDefault(),""!==e.target.newPlaylist.value&&fetch("/createplaylist",{method:"POST",body:JSON.stringify({newplaylist:"".concat(n.state.newPlaylist),relatedgroup:"".concat(e.target.newPlaylistGroup.value)}),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log("addplaylist response:",e),null!==e&&(n.setState({newPlaylist:"",newPlaylistGroup:"",getgroups:!0}),console.log(n.state.newPlaylist))}))},n.handleAddGroupSubmit=function(e){if(e.preventDefault(),""!==e.target.newGroup.value){var t=n.state.newGroup;fetch("/creategroup",{method:"POST",body:JSON.stringify({newgroup:"".concat(n.state.newGroup),userid:n.state.userID}),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){null!==e&&(n.setState({newGroup:"",getgroups:!0}),fetch("/creategroupmessages",{method:"POST",body:JSON.stringify({group:"".concat(t)}),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){null!==e&&console.log("Group chatarchive created")})))}))}},n.handleAddMemberSubmit=function(e){e.preventDefault(),""!==e.target.newMember.value&&fetch("/addmember",{method:"POST",body:JSON.stringify({newMember:"".concat(n.state.newMember),relatedgroup:"".concat(e.target.newMemberGroup.value)}),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){null!==e&&n.setState({newMember:"",newMemberGroup:"",getgroups:!0})}))},n.state={user:"",userID:null,loggedIn:!1,getgroups:!1,groups:null,newPlaylist:"",newPlaylistGroup:"",newGroup:"",newMember:"",newMemberGroup:"",selectedGroup:null,updatedPlaylist:null},n}return Object(i.a)(a,[{key:"componentDidUpdate",value:function(){var e=this;if(this.props.user!==this.state.user&&""!==this.props.user&&this.state.userID!==this.props.userid&&this.setState({user:this.props.user,loggedIn:!0,getgroups:!0,userID:this.props.userid}),this.state.selectedGroup!==this.props.selectedGroup&&this.setState({selectedGroup:this.props.selectedGroup}),null!==this.state.groups&&null!==this.state.selectedGroup&&this.props.playlistToMyGroups!==this.state.updatedPlaylist){var t=this.state.groups;t.map((function(a,n){a.playlists.length&&a.groupname===e.state.selectedGroup&&a.playlists.map((function(a,s){if(a.name===e.props.playlistToMyGroups.name&&(console.log("Old tracklist:",a.tracklist),console.log("to update with:",e.props.playlistToMyGroups.tracklist),a.tracklist!==e.props.playlistToMyGroups.tracklist)){var l=t;l[n].playlists[s].tracklist=e.props.playlistToMyGroups.tracklist,e.setState({groups:l,updatedPlaylist:e.props.playlistToMyGroups})}}))}))}!0===this.state.loggedIn&&!0===this.state.getgroups&&(console.log("Actual groups are:",this.state.groups),this.getAllgroups())}},{key:"getAllgroups",value:function(){var e=this;fetch("/getallgroups",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userid:this.state.userID})}).then((function(t){return t.json().then((function(t){console.log("Fetch groups : ",t),e.setState({groups:t,getgroups:!1})}))}))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"fullsize"},null!==this.state.user?s.a.createElement("div",{className:"fullsize"},s.a.createElement(v.a,null,s.a.createElement(v.a.Toggle,{as:b.a.Header,eventKey:1},"Create Group"),s.a.createElement(v.a.Collapse,{eventKey:1},s.a.createElement(b.a.Body,null,s.a.createElement("form",{onSubmit:this.handleAddGroupSubmit},s.a.createElement(E.a,null,s.a.createElement(E.a.Group,null,s.a.createElement(E.a.Control,{className:"input",onChange:this.handleInputChange,name:"newGroup",type:"text",placeholder:"Enter name",value:this.state.newGroup})),s.a.createElement(S.a,{className:"btnAddPlaylist",variant:"success",type:"submit"},"Create")))))),null!==this.state.groups?s.a.createElement(v.a,{defaultActiveKey:"0"},this.state.groups.map((function(t,a){return s.a.createElement(b.a,null,s.a.createElement(v.a.Toggle,{as:"button",className:"btn btn-secondary",onClick:e.handleSelectedGroup,value:t.groupname,eventKey:a},t.groupname),s.a.createElement(v.a.Collapse,{eventKey:a},s.a.createElement(b.a.Body,null,s.a.createElement("h4",null,"Members"),s.a.createElement("ul",{id:"MemberList"},t.members.map((function(e,t){var a=e.split("@")[0];return s.a.createElement("h6",null,a)}))),s.a.createElement(v.a,null,s.a.createElement(v.a.Toggle,{as:S.a,eventKey:3},"Add Member"),s.a.createElement(v.a.Collapse,{eventKey:3},s.a.createElement(b.a.Body,null,s.a.createElement("form",{onSubmit:e.handleAddMemberSubmit},s.a.createElement(E.a,{role:"form"},s.a.createElement(E.a.Group,null,s.a.createElement(E.a.Control,{name:"newMemberGroup",type:"hidden",value:e.state.groups[a].groupname}),s.a.createElement(E.a.Control,{onChange:e.handleInputChange,name:"newMember",type:"email",placeholder:"Enter email",value:e.state.newMember}),s.a.createElement(S.a,{className:"btnAddPlaylist",variant:"success",type:"submit"},"Add"))))))),s.a.createElement("h4",{className:"labelPlaylist"},"Playlists"),s.a.createElement("div",{id:"fixedspacing"},s.a.createElement("p",null)),s.a.createElement(N.a,{type:"radio",name:"playlists",vertical:!0,onChange:e.handleSelectedPlaylist},t.playlists.map((function(t,n){return s.a.createElement(k.a,{id:"playlistbtns",value:[e.state.groups[a].playlists[n],e.state.groups[a].groupname]},t.name)}))),s.a.createElement("div",{id:"fixedspacing"},s.a.createElement("p",null)),s.a.createElement(v.a,null,s.a.createElement(v.a.Toggle,{as:S.a,eventKey:2},"Create Playlist"),s.a.createElement(v.a.Collapse,{eventKey:2},s.a.createElement(b.a.Body,null,s.a.createElement("form",{onSubmit:e.handleAddPlaylistSubmit},s.a.createElement(E.a,{role:"form"},s.a.createElement(E.a.Group,null,s.a.createElement(E.a.Control,{name:"newPlaylistGroup",type:"hidden",value:e.state.groups[a].groupname}),s.a.createElement(E.a.Control,{onChange:e.handleInputChange,name:"newPlaylist",type:"text",placeholder:"Enter name",value:e.state.newPlaylist}),s.a.createElement(S.a,{className:"btnAddPlaylist",variant:"success",type:"submit"},"Create"))))))))))}))):s.a.createElement("div",null)):s.a.createElement("h4",null,"Not logged in"))}}]),a}(s.a.Component),D=a(26);a(65);var P=function(e){var t=Object(n.useState)(null),a=Object(D.a)(t,2),l=a[0],o=a[1],r=Object(n.useState)(""),i=Object(D.a)(r,2),c=i[0],u=i[1],p=Object(n.useState)([]),g=Object(D.a)(p,2),m=g[0],d=g[1],h=Object(n.useState)(null),y=Object(D.a)(h,2),f=(y[0],y[1]);return Object(n.useEffect)((function(){""!==e.group&&(!function(t){var a=window.location.origin.replace(/^http/,"ws"),n=new WebSocket(a);console.log("Host is",a),n.onopen=function(){console.log("WS client connected"),n.onmessage=function(t){console.log("WS client set message:",JSON.parse(t.data)),JSON.parse(t.data).map((function(t,a){t.groupname===e.group&&d(t.messages)}))}}}(e.group),u(e.author),o(e.group),d([]))}),[e.group]),Object(n.useEffect)((function(){fetch("/allgroupmessages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({group:e.group})}).then((function(e){return e.json()})).then((function(e){e.success?(console.log("Setting messageCollection",e.data.messages),d(e.data.messages)):console.log("No group registered")})).catch((function(e){return f(e)}))}),[l]),s.a.createElement("div",{className:"chat"},""===e.group?s.a.createElement("div",null,s.a.createElement("h2",null,"Group chat"),s.a.createElement("h2",null,"[No group selected]")):s.a.createElement("div",null,s.a.createElement("h2",null,"Group chat: ",l),s.a.createElement("div",{id:"chatbox",className:"row justify-content-center p-3"},s.a.createElement("table",{className:"tablechat"},s.a.createElement("thead",null,s.a.createElement("th",{className:"user"}),s.a.createElement("th",{className:"message"})),s.a.createElement("tbody",null,m.map((function(e,t){return s.a.createElement("tr",null,s.a.createElement("td",{className:"user"},e[1]," said: "),s.a.createElement("td",{className:"message"},e[0]))}))))),s.a.createElement("div",{className:"row justify-content-center"},s.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t=e.target[0].value,a=e.target[1].value,n=e.target[2].value;fetch("/sendchatmessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({group:t,author:a,writtenmessage:n})}).then((function(e){return e.json().then((function(e){console.log("Done.",e)}))}))},class:"form-inline justify-content-left p-3"},s.a.createElement("div",{class:"form-group mb-2"},s.a.createElement("input",{className:"form-control",name:"group",value:l,type:"hidden"}),s.a.createElement("input",{className:"form-control",name:"author",value:c,type:"hidden"}),s.a.createElement("input",{className:"form-control",name:"writtenMessage",type:"text",placeholder:"Write a message...",required:!0})),s.a.createElement("button",{className:"btn btn-success mb-2",type:"submit"},"Send")))))},I=(a(66),a(74)),w=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).getTrackInfos=function(e){fetch("/gettracksinfo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tracks:e,userid:n.state.userID})}).then((function(e){return e.json().then((function(e){console.log("Fetched tracks info:",e);var t=[];e.map((function(e,a){return t[a]=[e.name,e.artists[0].name,e.album.name,"".concat(Math.floor(e.duration_ms/6e4).toFixed(0),":").concat((e.duration_ms/1e3%60).toFixed(0)),e.uri]})),console.log("Tracks:",t),n.setState({tracklist:t})}))}))},n.handleInputChange=function(e){n.setState(Object(f.a)({},e.target.name,[e.target.value]))},n.searchSubmit=function(e){e.preventDefault(),""!==e.target.searchedTrack.value&&fetch("/searchtracks",{method:"POST",body:JSON.stringify({searchedTrack:"".concat(n.state.searchedTrack),userid:n.state.userID}),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){if(null!==e){console.log("Returned tracks:",e.items);var t=[];e.items.map((function(e,a){return t[a]=[e.name,e.artists[0].name,e.album.name,e.uri]})),n.setState({foundTracks:t,searchedTrack:""}),console.log("tracks: ",n.state.foundTracks)}}))},n.addSongtoMongo=function(e){console.log(e.target.value);var t=e.target.value.split(":");fetch("/addtracktoplaylist",{method:"POST",body:JSON.stringify({uriTrack:"".concat(t[2]),playlist:"".concat(n.state.playlistname),group:"".concat(n.state.group),userid:n.state.userID}),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log("Playlists",e),n.setState({foundTracks:[]}),n.props.getUpdatedPlaylist(e,n.state.group)}))},n.state={group:"",userID:null,playlist:null,playlistname:null,tracklist:[["",""]],nextup:0,searchedTrack:"",foundTracks:[]},n}return Object(i.a)(a,[{key:"componentDidUpdate",value:function(){if(this.state.playlist!==this.props.playlist&&null!==this.props.playlist&&this.props.groups!==this.state.group){var e=[];this.props.playlist.tracklist.map((function(t,a){return e[a]=t})),this.setState({playlist:this.props.playlist,playlistname:this.props.playlist.name,group:this.props.group}),e.length>0?this.getTrackInfos(e):this.setState({tracklist:[["",""]]})}""!==this.props.user&&this.state.userID!==this.props.userid&&this.setState({userID:this.props.userid}),this.state.nextup!==this.props.nextup&&(this.props.nextup<this.state.tracklist.length&&this.setState({nextup:this.props.nextup}),0===this.state.tracklist.length&&this.setState({nextup:0}))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"row nextupAddsong",style:{}},s.a.createElement("div",{className:"col-6"},null!==this.state.playlist?s.a.createElement("div",{className:"nextupSection"},s.a.createElement("h3",{className:"bigF"},"Next up: ",this.state.tracklist[this.state.nextup][0]," - ",this.state.tracklist[this.state.nextup][1]),s.a.createElement("label",null,"Playlist name: ",this.state.playlistname," Group: ",this.state.group),s.a.createElement(I.a,{striped:!0,border:!0},s.a.createElement("thead",{className:"nextup"},s.a.createElement("th",null,"#"),s.a.createElement("th",null,"Song"),s.a.createElement("th",null,"Artist"),s.a.createElement("th",null,"Album"),s.a.createElement("th",null,"Duration")),s.a.createElement("tbody",null,this.state.tracklist.map((function(e,t){return s.a.createElement("tr",{className:"nextup"},s.a.createElement("td",null,t+1),s.a.createElement("td",null,e[0]),s.a.createElement("td",null,e[1]),s.a.createElement("td",null,e[2]),s.a.createElement("td",null,e[3]))}))))):s.a.createElement("h2",{className:"nextup"},"[No playlist selected]")),s.a.createElement("div",{className:"col-6 nextupSection"},s.a.createElement("h2",{div:!0,className:"nextup"},"Add song to playlist"),null!==this.state.playlist?s.a.createElement("div",null,s.a.createElement("form",{class:"form-inline justify-content-center",onSubmit:this.searchSubmit},s.a.createElement("div",{class:"form-group mb-2 "},s.a.createElement("input",{onChange:this.handleInputChange,className:"form-control",name:"searchedTrack",value:this.state.searchedTrack,type:"text",placeholder:"Search song..."})),s.a.createElement("button",{className:"btn btn-success mb-2",type:"submit"},"Search")),s.a.createElement(I.a,{striped:!0,border:!0,className:"nextup"},s.a.createElement("thead",null,s.a.createElement("th",null,"Song"),s.a.createElement("th",null,"Artist"),s.a.createElement("th",null,"Album"),s.a.createElement("th",null,"Select")),this.state.foundTracks.length>0?s.a.createElement("tbody",null,this.state.foundTracks.map((function(t,a){return s.a.createElement("tr",null,s.a.createElement("td",null,t[0]),s.a.createElement("td",null,t[1]),s.a.createElement("td",null,t[2]),s.a.createElement("td",null,s.a.createElement("button",{onClick:e.addSongtoMongo.bind(e),value:t[3],className:"btn btn-success"},"Add")))}))):s.a.createElement("tbody",null))):s.a.createElement("div",null)))}}]),a}(s.a.Component),O=(a(67),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this)).getGroupPlaying=function(e){console.log("Fetching nowplaying info..."),fetch("/getgroupplaying",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userid:n.state.userID,requestedGroup:e})}).then((function(e){return e.json().then((function(e){console.log("Group playing data is:",e),null!==e&&void 0!==e&&(console.log("Fetched nowplaying:",e.playnow),e.isplaying?n.playSong(e.playnow):(console.log("Received playnow but not playing"),n.playNowSong(e.playnow),setTimeout((function(){n.playpausePlayback("pause")}),1e3)))}))}))},n.getMusicInfo=function(){console.log("Fetching playback info..."),fetch("/getplayback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userid:n.state.userID})}).then((function(e){return e.json().then((function(e){console.log("res is:",e),null!==e&&void 0!==e&&(console.log("Fetched!"),n.setState({item:e.item,refreshToggled:!1,playback:e.is_playing}))}))}))},n.playpausePlayback=function(e){console.log("Playing/pausing playback..."),fetch("/"+e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userid:n.state.userID})}).then((function(e){return e.json().then((function(e){null!==e&&(console.log("Done!: ",e),n.setState({playbackCommandtrigger:!1}))}))}))},n.playNowSong=function(e){fetch("/playsong",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({uri:"".concat(e),deviceID:"".concat(n.state.deviceID),userid:n.state.userID})}).then((function(e){return e.json().then((function(e){console.log(e),console.log("Waiting for spotify to change song..."),setTimeout((function(){n.setState({refreshToggled:!0,changePlaybackTriggerNext:!1,iteratorPlaylist:n.state.iteratorPlaylist+1})}),1e3)}))}))},n.setPlayNowSong=function(e){fetch("/setgroupplaying",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({uri:"".concat(e),requestedGroup:"".concat(n.state.group)})}).then((function(e){return e.json().then((function(e){console.log("response to set now playing",e),console.log("Added nowplaying song to group")}))}))},n.playSong=function(e){fetch("/playsong",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({uri:"".concat(e),deviceID:"".concat(n.state.deviceID),userid:n.state.userID})}).then((function(t){return t.json().then((function(t){console.log(t),n.state.iteratorPlaylist<n.state.playlistDisplay.tracklist.length?(console.log("Waiting for spotify to change song..."),setTimeout((function(){n.state.changePlaybackTriggerNext?(n.setState({refreshToggled:!0,changePlaybackTriggerNext:!1,iteratorPlaylist:n.state.iteratorPlaylist+1}),n.setPlayNowSong(e)):n.state.changePlaybackTriggerPrevious&&n.setState({refreshToggled:!0,changePlaybackTriggerPrevious:!1,iteratorPlaylist:n.state.iteratorPlaylist+1})}),1e3)):setTimeout((function(){n.setState({refreshToggled:!0,changePlaybackTriggerNext:!1,iteratorPlaylist:0}),console.log("Reset iterator: ",n.state.iteratorPlaylist)}),1e3)}))}))},n.changePlaybackNext=function(){console.log("Changing playback..."),fetch("/next").then((function(e){return e.json().then((function(e){null!==e?(console.log("Fetched!: ",e),n.setState({changePlaybackTriggerNext:!1}),console.log("Waiting for spotify to change song..."),setTimeout((function(){n.setState({refreshToggled:!0})}),1e3)):alert("Error from spotify")}))}))},n.changePlaybackPrevious=function(e){console.log("Changing playback..."),fetch("/previous").then((function(e){return e.json().then((function(e){null!==e?(console.log("Fetched!: ",e),n.setState({changePlaybackTriggerPrevious:!1}),console.log("Waiting for spotify to change song..."),setTimeout((function(){n.setState({refreshToggled:!0})}),1e3)):alert("Error from spotify")}))}))},n.getSelectedPlaylist=function(e,t){console.log("Got selected playlist in dashboard: ","".concat(e.tracklist," from group: ").concat(t)),n.setState({playlistDisplay:e,iteratorPlaylist:0})},n.getSelectedGroup=function(e){console.log("Got selected group in dashboard: ",e),n.setState({group:e}),n.getGroupPlaying(e)},n.addedSongtoPlaylist=function(e,t){console.log("Got updated playlist in dashboard: ","".concat(e," from group: ").concat(t)),n.setState({playlistDisplay:e,playlistToMyGroups:e,group:t})},n.state={user:"",deviceID:null,userID:null,loggedIn:!1,item:null,refreshToggled:!1,getGroupPlayback:!1,playbackCommandtrigger:!1,playListCommandtrigger:!1,changePlaybackTriggerNext:!1,changePlaybackTriggerPrevious:!1,changePlayback:null,playback:null,playlistDisplay:null,playlistToMyGroups:null,iteratorPlaylist:0,group:""},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){if(null!==this.state.userID&&this.props.user!==this.state.user&&""!==this.props.user&&this.props.deviceID!==this.state.deviceID&&null!==this.props.deviceID&&(this.setState({user:this.props.user,loggedIn:!0,deviceID:this.props.deviceID}),this.getMusicInfo()),null!==this.props.userid&&this.props.userid!==this.state.userID&&this.setState({userID:this.props.userid}),this.state.refreshToggled&&(console.log("Refreshed"),this.getMusicInfo()),this.state.playbackCommandtrigger&&(console.log("Triggered Play/pause"),!0===this.state.playback?(console.log("play"),this.playpausePlayback("play")):(console.log("pause"),this.playpausePlayback("pause"))),this.state.changePlaybackTriggerNext){var e=this.state.iteratorPlaylist;console.log("size:",this.state.playlistDisplay.tracklist.length),console.log("iterator: ",e),console.log("next song: ",this.state.playlistDisplay.tracklist[e]),this.playSong(this.state.playlistDisplay.tracklist[e])}if(this.state.changePlaybackTriggerPrevious){if(this.state.iteratorPlaylist>0)e=this.state.iteratorPlaylist-1;else e=0;console.log("previous song: ",this.state.playlistDisplay.tracklist[e]),this.playSong(this.state.playlistDisplay.tracklist[e])}}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{id:"mainrow",className:"row"},s.a.createElement("div",{id:"mygroups",className:"col-2 "},s.a.createElement("div",{className:"row justify-content-center groupR"},s.a.createElement("h2",{className:"titleGroup"},"My groups"),s.a.createElement(T,{userid:this.state.userID,user:this.state.user,getplaylist:this.getSelectedPlaylist,getGroup:this.getSelectedGroup,selectedGroup:this.state.group,playlistToMyGroups:this.state.playlistToMyGroups}))),s.a.createElement("div",{className:"col-7"},s.a.createElement("div",{className:"row nowplaying "},s.a.createElement("div",{className:"col-6"},null===this.state.item||void 0===this.state.item?s.a.createElement("div",null,s.a.createElement("h2",{className:"nowP"},"Now Playing: [Nothing is playing]"),""!==this.state.user?s.a.createElement("button",{className:"btn btn-warning",onClick:function(){return e.setState({refreshToggled:!0})}},"Refresh"):s.a.createElement("div",null),null!==this.state.playlistDisplay?s.a.createElement("button",{className:"btn btn-primary",onClick:function(){return e.setState({changePlaybackTriggerNext:!0})}},"Play Next"):s.a.createElement("div",null)):s.a.createElement("div",null,s.a.createElement("h2",{className:"nowP"},"Now Playing:"),s.a.createElement("h5",{className:"songName"},this.state.item.name),s.a.createElement("h6",{className:"artistName"},"Artist: ",this.state.item.artists[0].name),s.a.createElement("h6",{className:"albumName"},"Album: ",this.state.item.album.name),s.a.createElement("button",{className:"btn btn-warning res",onClick:function(){return e.setState({refreshToggled:!0})}},"Refresh"),this.state.playback?s.a.createElement("button",{className:"btn btn-danger res",onClick:function(){return e.setState({playbackCommandtrigger:!0,playback:!1})}},"Pause"):s.a.createElement("button",{className:"btn btn-success res",onClick:function(){return e.setState({playbackCommandtrigger:!0,playback:!0})}},"Play"),null!==this.state.playlistDisplay&&this.state.iteratorPlaylist<this.state.playlistDisplay.tracklist.length?s.a.createElement("button",{className:"btn btn-primary res",onClick:function(){return e.setState({changePlaybackTriggerNext:!0})}},"Next"):s.a.createElement("button",{className:"btn btn-primary res",disabled:!0},"Next"))),s.a.createElement("div",{className:"col-6"},null===this.state.item||void 0===this.state.item?s.a.createElement("h2",null):s.a.createElement("div",null,s.a.createElement("img",{src:"".concat(this.state.item.album.images[1].url),alt:"Cover"})))),s.a.createElement("div",null,s.a.createElement(w,{userid:this.state.userID,playlist:this.state.playlistDisplay,getUpdatedPlaylist:this.addedSongtoPlaylist,group:this.state.group,nextup:this.state.iteratorPlaylist}))),s.a.createElement("div",{id:"chat",className:"col-3"},s.a.createElement(P,{group:this.state.group,author:this.state.user})))}}]),a}(s.a.Component)),C=(a(68),a(48)),j=a.n(C),G=a(49),x=a.n(G),M=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(r.a)(this,a),(e=t.call(this)).getDeviceID=function(){console.log("Get DeviceID requested"),fetch("/mydevices",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userid:e.state.userID})}).then((function(e){return e.json().then((function(e){0===e.length?alert("No active computer devices"):console.log("Devices found: ",e)}))}))},e.getID=function(t){e.setState({userID:t}),console.log("App got client id:",e.state.userID)},e.state={loggedin:!1,sessionExists:!1,userState:"",deviceID:null,devicename:null,deviceactive:!1,userID:null,LandinguserID:null,getUserToggled:!1},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;if(!this.state.sessionExists){var t=sessionStorage.getItem("useridsession");console.log("SESSION ID:",t)}null===this.state.userID&&null===sessionStorage.getItem("useridsession")&&(console.log("Requesting client id..."),fetch("/authorize").then((function(t){return t.json().then((function(t){e.setState({userID:t.userid}),console.log("Landing on page with id:",e.state.userID),e.getID(t.userid)}))}))),!0!==this.state.loggedin&&(console.log("fetching getUser on mount..."),fetch("/getUser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userid:this.state.userID})}).then((function(t){return t.json().then((function(t){200===t.statusCode?t.displayname!==e.state.userState&&(console.log("Fetched!",t.displayname),e.setState({userState:t.displayname,loggedin:!0})):(console.log("Error code: ",t.statusCode),"tryagain"===t.statusCode&&e.setState({getUserToggled:!0}))}))})).catch((function(e){console.log("Error with GetUser")})))}},{key:"componentDidUpdate",value:function(){var e=this;if(!this.state.sessionExists){var t=sessionStorage.getItem("useridsession");null===t?console.log("No session user ID saved."):(console.log("Session id saved:",t),this.setState({userID:t,loggedin:!0,getUserToggled:!1,sessionExists:!0}))}this.state.getUserToggled&&setTimeout((function(){console.log("fetching getUser..."),fetch("/getUser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userid:e.state.userID})}).then((function(t){return t.json().then((function(t){if(200===t.statusCode){if(t.displayname!==e.state.userState){console.log("Fetched!:",t.displayname);sessionStorage.getItem("useridsession");sessionStorage.setItem("useridsession",e.state.userID),console.log("SESSION ID:",sessionStorage.getItem("useridsession")),e.setState({userState:t.displayname,loggedin:!0,getUserToggled:!1,sessionExists:!0})}}else console.log("Error code: ",t.statusCode),"tryagain"===t.statusCode&&e.setState({getUserToggled:!0})}))})).catch((function(e){console.log("Error with GetUser")}))}),500),null===this.state.deviceID&&!0===this.state.loggedin&&(console.log("user id:",this.state.userID),console.log("Device id:",this.state.deviceid),console.log("Logged in:",this.state.loggedin),fetch("/mydevices",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userid:this.state.userID})}).then((function(t){return t.json().then((function(t){0===t.length?alert("No listening is activated. Open your web browser at open.spotify.com, active your device (play/pause) and reload page."):(console.log("Device found: ",t[0]),t[0].deviceid!==e.state.deviceID&&e.setState({deviceID:t[0].deviceid,devicename:t[0].devicename,deviceactive:t[0].deviceactive}))}))})))}},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},this.state.loggedin?s.a.createElement("div",null,s.a.createElement(y,{user:this.state.userState,getID:this.getID,devicename:this.state.devicename,deviceactive:this.state.deviceactive,getDevicesID:this.getDeviceID}),s.a.createElement("div",{className:"container-fluid"},s.a.createElement(O,{user:this.state.userState,deviceID:this.state.deviceID,userid:this.state.userID}))):s.a.createElement("div",{className:"Plus"},s.a.createElement("header",{className:"App-header"},s.a.createElement("button",{className:"Home"}),s.a.createElement("div",{className:""},s.a.createElement("a",{className:"Login",href:"/login/".concat(this.state.userID)},"Log In"),s.a.createElement("a",{href:"https://www.spotify.com/us/",className:"Register"},"Register Now!"))),s.a.createElement("div",{className:"MiddleTitle"},s.a.createElement("h2",{className:"Black"},"Be the life of the party!"),s.a.createElement("h1",{className:"Title"},"SHARING MUSIC"),s.a.createElement("h1",{className:"Title"},"NEVER FELT SO ",s.a.createElement("span",{className:"Outline"},"GOOD")),s.a.createElement("img",{alt:"Vynil",src:j.a,className:"Vynil"}),s.a.createElement("img",{alt:"Record",src:x.a,className:"Record"}),s.a.createElement("a",{href:"/login/".concat(this.state.userID),className:"Button"},s.a.createElement("svg",null,s.a.createElement("g",null,s.a.createElement("line",{x2:"227.62",y1:"31.28",y2:"31.28"}),s.a.createElement("polyline",{points:"222.62 25.78 228.12 31.28 222.62 36.78"}),s.a.createElement("circle",{cx:"224.67",cy:"30.94",r:"30.5",transform:"rotate(180 224.67 30.94) scale(1, -1) translate(0, -61)"}))),s.a.createElement("font",null,"Enter the Sound"))),s.a.createElement("footer",{className:"Foot"},s.a.createElement("p",{className:"Copyright"},"\xa9 Antoine & Juan"),s.a.createElement("button",{className:"About"},"ABOUT"))))}}]),a}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[52,1,2]]]);
//# sourceMappingURL=main.4448ec7d.chunk.js.map