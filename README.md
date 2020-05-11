# SpotifyParty
Real-time shared music player using Spotify's API, to listen to music at the same time as your friends! 

<img src="https://i.imgur.com/grdZkJ3.png" alt="Screenshot of main page">

## 1: Objectives and technologies used

Our goal was to create a user-friendly web tool to share music and escape with friends the idea is to have a good time and share those times.

### Technologies used

This project is developed mainly using React, HTML and CSS. Node.js is used to set up the web server, MongoDB manages the data (recipes and ingredients) and Express.jswas used to set up the basis of the project. Passport.js is used to manage the authentication process, and Bootstrap provides fonts and templates for front-end cosmetics. And last the API of Spotify used in a Node.Js wrapper.

## 2: How to deploy / Prerequisites

After cloning the project repository to a local folder, you'll need to install these few dependencies and softwares:

- Node.js : You'll absolutely need this Javascript runtime, since everything server-side is based upon it. The Node Package Manager (npm) is very useful to include more Node modules. However, needed modules are already included in the project repo. You can find it at this link : https://nodejs.org/en/download/

- MongoDB : You'll also need to install and run you own Mongo database to host your ingredient list. Using npm, adding mongodb to your project is fairly easy. This package is however already included in the node-modules folder, so you won't have to install it again. We suggest download MongoDB Compass, which provides an intuitive UI to manage database creations and content. The project expects a mongoDB database "PartyData" to be running on mongo Atlas, with two collections (groupParties and groupChats) available. 

You will of course need a web browser, such as Firefox, to load the front-end part of our project. Finally, to use and modify the project for personal use, you'll need a text/code editor, such as Visual Studio Code or SublimeText.  

## Steps 
First run npm install on node.js
Second create a .env variables you need to add the following
CLIENT_ID Obtained from Spotify
CLIENT_SECRET Obtained from Spotify
REDIRECT_URI=http://localhost:3001/logincallback/
MONGO_URI Obtained from mongo Atlas
REACT_APP_CLIENT_ID
REACT_APP_REDIRECT_URI 
PORT=3001
REDIRECT_URL=3001

your backend should be running on port 3001

then cd Front
Run npm install
Change proxy to 3001 in package.json 

run both backend and front end

## 3: Authors

This project is made by Juan Pablo Otalora Romero and Antoine Noreau, for the Web Developement Class at Universidad de Los Andes, Colombia. 

Juan Pablo Otalora // https://github.com/JuanOtalora

Antoine Noreau // https://github.com/antonoro

## 4: Screenshot

<img src="https://i.imgur.com/grdZkJ3.png" alt="Screenshot of main page">

## 5: Licence

