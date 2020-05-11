const express = require('express');
const router = express.Router();

const dotenv = require('dotenv').config();

const mu = require("../db/MongoUtils.js");

const SpotifyWebAPI = require('spotify-web-api-node');


const spotifyAPI = new SpotifyWebAPI({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
});

var usersNumber = 0;
var tokens = [];

const scopes = ["user-read-currently-playing", "user-read-playback-state", "user-modify-playback-state", "user-read-email", "streaming"];

router.get('/authorize', (req, res) => {
    console.log("Login request, sending client id");
    var sentID = usersNumber + 1;
    usersNumber = usersNumber + 1;
    res.json({userid: sentID});
})

//Login endpoint
router.get('/login/:userid', (req, res) => {
    
    var actualID = parseInt(req.params.userid);
    console.log("Login received, redirecting to spotify with client id:", actualID);
    tokens[tokens.length] = [(actualID+1), "", ""];
    console.log("Token in construction: ", tokens);
    const url = spotifyAPI.createAuthorizeURL(scopes);
    res.redirect(url+"&show_dialog=true");
});

//Login callback endpoint
router.get("/logincallback/", async (req,res) => {
    console.log("LoginCallback received, getting code");
    console.log("code:", req.query.code);
    
    spotifyAPI.authorizationCodeGrant(req.query.code).then( data => {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);
        spotifyAPI.setAccessToken(data.body['access_token']);
        spotifyAPI.setRefreshToken(data.body['refresh_token']);
        var updatedToken = tokens[tokens.length-1];
        console.log('Token constructed:', updatedToken);
        updatedToken[1] = data.body['access_token'];
        updatedToken[2] = data.body['refresh_token'];
        tokens[tokens.length-1] = updatedToken;
        console.log('Token constructed:', tokens);
        res.redirect('/');
    }).catch(err => {console.log('error on Authorization Code Grant', err)});
    
});

// Update user endpoint
router.post('/getUser', (req,res) => {
    var userID = req.body.userid;
    console.log("GetUser received:", req.body.userid);
    if(userID !== null)
    {
        console.log("Trying to send username");

        var loggedinspotifyAPI = new SpotifyWebAPI({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            redirectUri: process.env.REDIRECT_URI
        });
        tokens.map((element, index) => {
            if(element[0] === userID)
            {
                loggedinspotifyAPI.setAccessToken(element[1]);
                loggedinspotifyAPI.setRefreshToken(element[2]);
            }
        });

        loggedinspotifyAPI.getMe()
        .then(data => {
            console.log("Got user with code:", data.statusCode);
            res.json({displayname: data.body.display_name, statusCode: data.statusCode});
        }).catch(err => {
            console.log('error getting user info from spotify:', err);
            res.json({statusCode: err.statusCode});
        });
    }
    else{
        res.json({statusCode: "tryagain"});
    }
});

router.post('/mydevices', (req, res) => {
    var userID = req.body.userid;
    console.log("Get devices received");
    var loggedinspotifyAPI = new SpotifyWebAPI({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    });
    tokens.map((element, index) => {
        if(element[0] === userID)
        {
            loggedinspotifyAPI.setAccessToken(element[1]);
            loggedinspotifyAPI.setRefreshToken(element[2]);
        }
    });
    loggedinspotifyAPI.getMyDevices()
    .then(data => {
        var devicesArray = data.body.devices;
        var devices = [], index = 0;
        devicesArray.map((element, i) => {
            if(element.type === "Computer")
            {
                devices[index] = {deviceid: element.id, devicename: element.name, devicetype: element.type, deviceactive: element.is_active};
                index = index + 1; 
            }
        })
        console.log("Computer devices: ", devices);
        res.json(devices);
    });
});

router.post('/getplayback', (req, res) => {
    console.log("GetPlayback received");
    var userID = req.body.userid;
    var loggedinspotifyAPI = new SpotifyWebAPI({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    });
    tokens.map((element, index) => {
        if(element[0] === userID)
        {
            loggedinspotifyAPI.setAccessToken(element[1]);
            loggedinspotifyAPI.setRefreshToken(element[2]);
        }
    });
    
    loggedinspotifyAPI.getMyCurrentPlaybackState()
    .then(data => {
        if(data.statusCode === 200 && data.body.item !== undefined)
        {
            console.log("Playback is: ", data.body.item.name);
        }
        
        res.json(data.body);
    });
    
});

router.get('/next', (req,res) =>{
    console.log("Change to next song received");
    
    
    spotifyAPI.skipToNext()
    .catch((err) => 
    {
        console.log(err);
        if(err.statusCode === 500)
        {
            console.log("Error from Spotify");
            res.json(null);
        }
        
    })
    .then((data) => {
        
        if(data.statusCode === 204)
        {
            console.log("Skipped to next");
            res.json("Next");
        }
        
        else{
            res.json(null);
        }
    })
    
});

router.get('/previous', (req,res) =>{
    console.log("Change tp previous song received");  
    spotifyAPI.skipToPrevious()
    .catch((err) => 
    {
        console.log(err);
        if(err.statusCode === 500)
        {
            console.log("Error from Spotify");
            res.json(null);
        }
        
    })
    .then(data => {
        if(data.statusCode === 204)
        {
            console.log("Skipped to previous");
            res.json("Previous");
        }
        else{
            res.json(null);
        }
    })
    
    
});

router.post('/play', (req,res) =>{
    console.log("Play song received");
    var userID = req.body.userid;
    var loggedinspotifyAPI = new SpotifyWebAPI({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    });
    tokens.map((element, index) => {
        if(element[0] === userID)
        {
            loggedinspotifyAPI.setAccessToken(element[1]);
            loggedinspotifyAPI.setRefreshToken(element[2]);
        }
    });
    
    loggedinspotifyAPI.play()
    .then(data => {
        if(data.statusCode === 204)
        {
            console.log("Playing");
            res.json("Play");
        }
        else{
            res.json(null);
        }
    })
    
});

router.post('/pause', (req,res) =>{
    console.log("Pause playback received");
    var userID = req.body.userid;
    var loggedinspotifyAPI = new SpotifyWebAPI({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    });
    tokens.map((element, index) => {
        if(element[0] === userID)
        {
            loggedinspotifyAPI.setAccessToken(element[1]);
            loggedinspotifyAPI.setRefreshToken(element[2]);
        }
    });
    loggedinspotifyAPI.pause()
    .then((data) => {
        if(data.statusCode === 204)
        {
        console.log("Pausing");
        res.json("Pause");
        }
        else{
            res.json(null);
        }
    })
    
});

router.post('/playsong', (req,res) =>{
    console.log("Play song received:", req.body);
    var uri = "spotify:track:"+req.body.uri;
    var deviceID = req.body.deviceID;
    var userID = req.body.userid;
    var loggedinspotifyAPI = new SpotifyWebAPI({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    });
    tokens.map((element, index) => {
        if(element[0] === userID)
        {
            loggedinspotifyAPI.setAccessToken(element[1]);
            loggedinspotifyAPI.setRefreshToken(element[2]);
        }
    });
    loggedinspotifyAPI.play({uris: [`${uri}`], device_id: `${deviceID}`})
    .then((data) => {
        if(data.statusCode === 204){
            console.log("Song playing");
            res.json("Play");
        }
        else{
            res.json(null);
        }

    }).catch(err => {console.log(err)});
        
    
});

router.post('/gettracksinfo', (req, res) =>{

    console.log("Get track info received", req.body.tracks);
    var userID = req.body.userid;
    var loggedinspotifyAPI = new SpotifyWebAPI({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    });
    tokens.map((element, index) => {
        if(element[0] === userID)
        {
            loggedinspotifyAPI.setAccessToken(element[1]);
            loggedinspotifyAPI.setRefreshToken(element[2]);
        }
    });
    if(req.body.tracks !== [])
    {
        loggedinspotifyAPI.getTracks(req.body.tracks)
        .then((data) => {
            if(data.statusCode === 200)
            {
                console.log("Got tracks in back:");
                res.json(data.body.tracks);
            }
            else{
                res.json(null);
            }
        });
    }
    else{
        res.json('Empty');
    }
    
    
});

router.get('/refreshaccesstoken', (req,res) =>{
    console.log("Refreshing access token");
    
    spotifyAPI.refreshAccessToken()
    .then(data => {
        console.log('The old access token is ' + spotifyAPI.access_token);
        console.log('The refresh token is ' + spotifyAPI.refresh_token);
        spotifyAPI.setAccessToken(data.body['access_token']);
        console.log('The new access token is ' + data.body['access_token']);
        console.log("Refreshed");
        res.redirect("/");
    });

});

router.post('/getallgroups', (req,res) =>{
    console.log("Getting group info...");
    var userID = req.body.userid;
    var loggedinspotifyAPI = new SpotifyWebAPI({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    });
    tokens.map((element, index) => {
        if(element[0] === userID)
        {
            loggedinspotifyAPI.setAccessToken(element[1]);
            loggedinspotifyAPI.setRefreshToken(element[2]);
        }
    });
    loggedinspotifyAPI.getMe()
    .then(data => {
        if(data.statusCode === 200)
        {
            var myemail = data.body.email;
            mu.getGroupsData(myemail)
            .then(arraydata =>{
                res.json(arraydata);
            });
        }
        else{
            res.json(null);
        }
    });   
    
});

router.post('/createplaylist', (req,res) =>{
    console.log("Received new playlist:", req.body.newplaylist);
    console.log("In group: ", req.body.relatedgroup);
    mu.insertPlaylistinGroup(req.body.newplaylist, req.body.relatedgroup)
    .then(() => {
        res.json('Allo');
    });
    
});

router.post('/creategroup', (req,res) =>{
    var userID = req.body.userid;
    var loggedinspotifyAPI = new SpotifyWebAPI({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    });
    tokens.map((element, index) => {
        if(element[0] === userID)
        {
            loggedinspotifyAPI.setAccessToken(element[1]);
            loggedinspotifyAPI.setRefreshToken(element[2]);
        }
    });
    loggedinspotifyAPI.getMe()
    .then(data => {
        if(data.statusCode === 200)
        {
            var myemail = data.body.email;
            console.log("New group: ", req.body.newgroup);
            mu.insertNewGroup(req.body.newgroup, myemail)
            .then(() => {
                res.json("Done!");
            });
        }
        else{
            res.json(null);
        }
    });
    
    
});

router.post('/addmember', (req,res) =>{

    console.log("New member: ", req.body.newMember);
    console.log("In group: ", req.body.relatedgroup);
    mu.insertMemberinGroup(req.body.newMember, req.body.relatedgroup)
    .then( () => {
        res.json('Done.');
    } 
    );
});

router.post('/addtracktoplaylist', (req,res) =>{

    console.log("New track: ", req.body.uriTrack);
    console.log("In playlist: ", req.body.playlist);
    console.log("In group: ", req.body.group);
    console.log("From user id:",req.body.userid);
    
    mu.getOldPlaylist(req.body.uriTrack, req.body.playlist, req.body.group)
    .then( comboplaylists => {
        console.log("new playlists: ", comboplaylists[1]);
        mu.updatePlaylist(req.body.playlist, comboplaylists[1], req.body.group)
        .then(() => {
            res.json(comboplaylists[0]);
        })
    } 
    );
});

router.post('/searchtracks', (req, res) => {
    console.log("Searching for tracks containing:", req.body.searchedTrack);
    var userID = req.body.userid;
    var loggedinspotifyAPI = new SpotifyWebAPI({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    });
    tokens.map((element, index) => {
        if(element[0] === userID)
        {
            loggedinspotifyAPI.setAccessToken(element[1]);
            loggedinspotifyAPI.setRefreshToken(element[2]);
        }
    });
    loggedinspotifyAPI.searchTracks(`${req.body.searchedTrack}`, { limit : 5})
    .then(data => {
        if(data.statusCode === 200)
        {
            res.json(data.body.tracks);
        }
        else{
            res.json(null);
        }
    });
});

router.post('/allgroupmessages', async (req, res) => {
    console.log("Retrieving group messages for group: ", req.body.group);
    if(req.body.group !== '')
    {
        mu.getSavedGroupMessages(req.body.group)
        .then((datamessages) => {
            res.json({success: true, data: datamessages});
        })  
    }
    else{
        res.json({success: false});
    }
});

router.post('/sendchatmessage', (req, res) => {
    console.log("Received chat message:", req.body);
    mu.updateGroupMessages(req.body.writtenmessage, req.body.author, req.body.group)
    .then( () => {
        res.json("Done.");
    } 
    );
});

router.post('/creategroupmessages', (req, res) => {
    console.log("Creating group chat archive", req.body.group);
    mu.createGroupMessages(req.body.group)
    .then(() => {
        res.json('Done');
    })
})

module.exports = router;