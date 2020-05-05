const express = require('express');
const router = express.Router();

const dotenv = require('dotenv').config();


const SpotifyWebAPI = require('spotify-web-api-node');

var loggedIn = false;

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
        loggedIn = true;
        res.redirect('/');
    }).catch(err => {console.log('error on Authorization Code Grant', err)});
    
});

// Update user endpoint
router.get('/getUser', (req,res) => {
    console.log("GetUser received");
    if(loggedIn === true){
        console.log("loggedIn, sending username");
        spotifyAPI.getMe()
        .then(data => {
            res.json(data.body.display_name);
        }).catch(err => {console.log('error getting user info from spotify')});
    }
    else{
        console.log("Not loggedIn, giving back null");
        res.json(null);
    }
});

router.get('/getplayback', (req, res) => {
    console.log("GetPlayback received");
    if(loggedIn === true)
    {
        console.log("loggedIn, sending playback info");
        spotifyAPI.getMyCurrentPlaybackState()
        .then(data => {
            console.log("Playback is: ", data.body.item.name);
            res.json(data.body);
        });
    }
    else{
        console.log("Not loggedIn, giving back null");
        res.json(null);
    }
});

router.get('/next', (req,res) =>{
    console.log("Change to next song received");
    if(loggedIn === true)
    {
        console.log("loggedIn, fetching next song");
        spotifyAPI.skipToNext()
        .then(() => {
            console.log("Skipped to next");
            res.json("Next");
        })
    }
    else{
        console.log("Not loggedIn, giving back null");
        res.json(null);
    }
});

router.get('/previous', (req,res) =>{
    console.log("Change tp previous song received");
    if(loggedIn === true)
    {
        console.log("loggedIn, fetching previous song");
        spotifyAPI.skipToPrevious()
        .then(() => {
            console.log("Skipped to previous");
            res.json("Previous");
        })
    }
    else{
        console.log("Not loggedIn, giving back null");
        res.json(null);
    }
});

router.get('/play', (req,res) =>{
    console.log("Play song received");
    if(loggedIn === true)
    {
        console.log("loggedIn, playing song");
        spotifyAPI.play()
        .then(() => {
            console.log("Playing");
            res.json("Play");
        })
    }
    else{
        console.log("Not loggedIn, giving back null");
        res.json(null);
    }
});

router.get('/pause', (req,res) =>{
    console.log("Pause playback received");
    if(loggedIn === true)
    {
        console.log("loggedIn, pausing playback");
        spotifyAPI.pause()
        .then(() => {
            console.log("Pausing");
            res.json("Pause");
        })
    }
    else{
        console.log("Not loggedIn, giving back null");
        res.json(null);
    }
});


module.exports = router;