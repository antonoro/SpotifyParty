const MongoClient = require("mongodb").MongoClient;

const dotenv = require('dotenv').config();

function MongoUtils(){
    const mu = {}, dbName = "PartyData", GroupColl = "groupParties", GroupChats = "groupChats";
    const url = process.env.MONGO_URI;

    mu.connect = () => {
        client = new MongoClient(url, {useUnifiedTopology: true});
        return client.connect();
    }

    mu.connectreactive = () => {
        client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true});
        return client.connect();
    }
    
    mu.getGroupsData = (email) => mu.connect().then(client => (
        client.db(dbName)
        .collection(GroupColl)
        .find({members: `${email}`})
        .sort({timestamp: -1})
        .toArray() 
        )
        .then(dataCollection => {
            console.log("Group data given");
            client.close();
            return dataCollection;
        }
    ));

    mu.insertNewGroup = (group, myemail) => mu.connect().then(client => (
        // Add implementation to verify if name is already used
        client.db(dbName)
        .collection(GroupColl)
        .insertOne({
            groupname: `${group}`,
            playlists: [],
            members: [`${myemail}`],
            nextup: "",
            nowplaying: ""
        }).then(() => {
            console.log("Added!");
            
        })
    ));

    mu.insertMemberinGroup = (member, group) => mu.connect().then(client => (
        client.db(dbName)
        .collection(GroupColl)
        .updateOne({groupname: `${group}`}, { $push: {members: `${member}`}})
        .then(() => {
            console.log("Added!");
            client.close();
        })
    ));

    mu.insertPlaylistinGroup = (playlistname, group) => mu.connect().then(client => (
        client.db(dbName)
        .collection(GroupColl)
        .updateOne({groupname: `${group}`}, { $push: {playlists: {name: `${playlistname}`, tracklist: []}}})
        .then(() => {
            console.log("Added!");
            client.close();
            return('Done');
        })
    ));

    mu.getOldPlaylist = (track, playlistname, group) => mu.connect().then(client => (

        client.db(dbName)
        .collection(GroupColl)
        .findOne({ groupname: `${group}`, 'playlists.name': playlistname})
        )
        .then(dataCollection => {
            var oldplaylists = dataCollection.playlists;
            var newplaylists = [], newplaylist = {}, newtracklist = [];
            oldplaylists.map((playlist, index) => {
                if(playlist.name === playlistname)
                {
                    newtracklist = playlist.tracklist;
                    newtracklist.push(track);
                    newplaylist = {name: playlistname, tracklist: newtracklist};
                    newplaylists[index] = newplaylist;
                }
                else{
                    newplaylists[index] = {name: playlist.name, tracklist: playlist.tracklist};
                }
            });
            client.close();
            var comboPlaylists = [newplaylist, newplaylists];
            return comboPlaylists;
        }
    ));
    
    mu.updatePlaylist = (playlistname, newplaylists, group) => mu.connect().then(client => (

        client.db(dbName)
        .collection(GroupColl)
        .updateOne({ groupname: `${group}`, 'playlists.name': playlistname}, {$set: {playlists: newplaylists}})
        )
        .then(() => {
            client.close();
            return('Done');
        }
    ));

    mu.getGroupMessages = () => (
        mu.connectreactive().then((client) => 
            client.db(dbName)
            .collection("groupChats")
            .find({})
            .toArray()
            )
            .finally((data) => {
                console.log("Got group messages data");
                client.close();
                return data;
            }
    ));

    mu.getSavedGroupMessages = (group) => mu.connect().then(client => (
        client.db(dbName)
        .collection(GroupChats)
        .findOne({groupname: `${group}`})
        .then((data) => {
            console.log("Got data!", data);
            client.close();
            return data ;
        })
    ));

    mu.listenforChanges = (notifyAll) => {
        console.log("Listening for changes");
        return mu.connectreactive().then((client) => {
            const cursor = client.db(dbName)
            .collection("groupChats")
            .watch();

            cursor.on("change", (data) => {
                console.log("Mongo got change:", data);
                mu.getGroupMessages().then((groupdata) =>{
                    notifyAll(JSON.stringify(groupdata));
                });
            });
        });
    }

    mu.updateGroupMessages = (message, author, group) => mu.connect().then(client => (
        client.db(dbName)
        .collection(GroupChats)
        .updateOne({groupname: `${group}`}, { $push: {messages: [`${message}`,`${author}`]}})
        .then(() => {
            console.log("Added!");
            client.close();
            return('Done');
        })
    ));

    mu.createGroupMessages = (group) => mu.connect().then(client => (
        client.db(dbName)
        .collection(GroupChats)
        .insertOne({groupname: `${group}`, messages: []})
        .then(() => {
            console.log("Added!");
            client.close();
            return('Done');
        })
    ));

    return mu;
            
}

module.exports = MongoUtils();