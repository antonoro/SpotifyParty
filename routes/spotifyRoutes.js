const express = require('express');
const router = express.Router();

const SpotifyWebAPI = require('spotify-web-api-node');

scopes = ["user-read-currently-playing",
"user-read-playback-state",
"user-modify-playback-state",
"user-read-email"];

router.post('/callback',
);