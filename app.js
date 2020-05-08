const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const SpotifyRouter = require('./routes/spotifyRoutes');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('body-parser').json());
app.use(express.static(path.join(__dirname, 'front/build')));

app.use('/', indexRouter);
app.use('/', SpotifyRouter);


module.exports = app;
