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

const scopes = ["user-read-currently-playing", "user-read-playback-state", "user-modify-playback-state", "user-read-email"];
const authorizeSpotifyURL = "https://accounts.spotify.com/authorize";
const tokenSpotifyURL = "https://accounts.spotify.com/api/token";

//Login endpoint
router.get('/login', (req, res) => {
    console.log("Login received, redirecting to spotify");
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
        
        res.redirect('/');
    }).catch(err => {console.log('error on Authorization Code Grant', err)});
    
});

// Update user endpoint
router.get('/getUser', (req,res) => {
    console.log("GetUser received");
    console.log("Trying to send username");
    spotifyAPI.getMe()
    .then(data => {
        res.json(data.body.display_name);
    }).catch(err => {console.log('error getting user info from spotify')});
    
});

router.get('/getplayback', (req, res) => {
    console.log("GetPlayback received");
    
    spotifyAPI.getMyCurrentPlaybackState()
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

router.get('/play', (req,res) =>{
    console.log("Play song received");
    
    spotifyAPI.play()
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

router.get('/pause', (req,res) =>{
    console.log("Pause playback received");
    
    spotifyAPI.pause()
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

router.get('/playdoowop', (req,res) =>{
    console.log("Doo wop received");

    spotifyAPI.play({uris: ["spotify:track:17RcMFZHPrjusBlklhSKou"]})
    .then((data) => {
        if(data.statusCode === 204){
            console.log("Doo Wop playing");
            res.json("Play");
        }
        else{
            res.json(null);
        }

    }).catch(err => {console.log(err)});
        
    
});

router.post('/gettracksinfo', (req, res) =>{
    console.log("Get track info received", req.body);
    if(req.body !== [])
    {
        spotifyAPI.getTracks(req.body)
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

router.get('/getallgroups', (req,res) =>{
    console.log("Getting group info...");
    
    spotifyAPI.getMe()
    .then(data => {
        if(data.statusCode === 200)
        {
            var myemail = data.body.email;
            mu.getGroupsData(myemail)
            .then(arraydata =>{
                console.log("array data", arraydata);
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

    spotifyAPI.getMe()
    .then(data => {
        if(data.statusCode === 200)
        {
            var myemail = data.body.email;
            console.log("New group: ", req.body.newgroup);
            mu.insertNewGroup(req.body.newgroup, myemail)
            .then(() => {
                res.json('Done');
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
    mu.getOldPlaylist(req.body.uriTrack, req.body.playlist, req.body.group)
    .then( comboplaylists => {
        console.log("new playlists: ", comboplaylists[1]);
        mu.updatePlaylist(req.body.playlist, comboplaylists[1])
        .then(() => {
            res.json(comboplaylists[0]);
        })
    } 
    );
});

router.post('/searchtracks', (req, res) => {
    console.log("Searching for tracks containing:", req.body.searchedTrack);
    spotifyAPI.searchTracks(`${req.body.searchedTrack}`, { limit : 5})
    .then(data => {
        if(data.statusCode === 200)
        {
            res.json(data.body.tracks);
        }
        else{
            res.json(null);
        }
    });
})


module.exports = router;