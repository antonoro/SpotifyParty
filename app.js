var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var SpotifyRouter = require('./routes/spotifyRoutes');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('body-parser').json());
app.use(express.static(path.join(__dirname, 'front/build')));

app.use('/', indexRouter);


module.exports = app;
