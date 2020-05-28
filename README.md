# SpotifyParty
Real-time shared music player using Spotify's API, to listen to music at the same time as your friends! 

<img src="https://i.imgur.com/grdZkJ3.png" alt="Screenshot of main page">

## 1: Objectives and technologies used

Our goal was to create a user-friendly web tool to share music and escape this quarantine with friends : the idea is to have a good time and be part of the party from your own home.

### Technologies used

This project is developed mainly using React, HTML and CSS. Node.js is used to set up the web server, MongoDB manages the data (recipes and ingredients) and Express.js was used to set up the basis of the project. Spotify's Web API is used to manage the authentication process, and Bootstrap provides fonts and templates for front-end cosmetics. NPM's spotify-web-api-node is used as a wrapper for all calls to Spotify Web API.

## 2: How to deploy / Prerequisites

After cloning the project repository to a local folder, you'll need to install these few dependencies and softwares:

- Node.js : You'll absolutely need this Javascript runtime, since everything server-side is based upon it. The Node Package Manager (npm) or Yarn (preferred) are very useful to install Node modules. Needed modules are already included in the project repo (build) and in the package.json file. You can find and download Node.js at this link : https://nodejs.org/en/download/

- MongoDB : You'll also need to install and run you own Mongo database to host your party data. Using yarn or npm, adding mongodb to your project is fairly easy. We suggest download MongoDB Compass, which provides an intuitive UI to manage database creations and content. The project expects a mongoDB database "PartyData" to be running on mongo Atlas, with two collections (groupParties and groupChats) available. 

- Spotify Account: You will absolutely need a Spotify account to use our app. A link to register (sign up or log in) is provided on the landing page. Premium users have access to all features, while Free users can only listen to music chosen by their friends.

You will of course need a web browser, such as Firefox, to load the front-end part of our project. Finally, to use and modify the project for personal use, you'll need a text/code editor, such as Visual Studio Code or SublimeText.  

## Steps 

First, run yarn install on node.js to download all dependencies.

```
yarn install

```

Second create a .env variable. You'll need to add the following:
CLIENT_ID=[Obtained from Spotify]
CLIENT_SECRET=[Obtained from Spotify]
REDIRECT_URI=http://localhost:3001/logincallback/
MONGO_URI=[Obtained from mongo Atlas]

Your backend server should be running on port 3001, while the front end should be set on 3000.

Then, move to the front folder and make sure all dependencies are also installed.

```
cd front
yarn install
```

Change proxy to 3001 in the package.json file of the front folder and build the front project.

```
yarn build

```

Go back to your backend terminal (cd ..) and run the project as a whole with nodemon or node:

```
yarn start:dev

```

OR

```
yarn start

```

Navigate to localhost:3001 and enjoy our app!

IMPORTANT NOTICE: This app is only a Spotify assistant. It won't play music, only control your listening device. You'll need to have a spotify web session opened to enjoy your party (open.spotify.com).

## 3: Authors

This project is made by Juan Pablo Otalora Romero and Antoine Noreau, for the Web Developement Class at Universidad de Los Andes, Colombia. 

Juan Pablo Otalora // https://github.com/JuanOtalora

Antoine Noreau // https://github.com/antonoro

## 4: Screenshot

<img src="https://i.imgur.com/grdZkJ3.png" alt="Screenshot of main page">

## 5: Licence

This project is licensed under the MIT <a href="./LICENSE">License</a>.

## 6: Usability test

We ran our app on usability tests with standard internet users (no programming experience) to understand its main flaws. Here a short resume:

- Add play button on each song in playlist. It's unclear how to get the playlist to actually play.

- Next song button should be place elsewhere or labelled differently.

- Add song to playlist feature should be shown on a pop up. It's unclear what it used for when there is no loaded playlist.

- General UI is too loaded.

- Add a step by step or basic instructions when loading the app (and no groups are loaded).
