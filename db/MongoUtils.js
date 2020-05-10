const MongoClient = require("mongodb").MongoClient;

const dotenv = require('dotenv').config();

function MongoUtils(){
    const mu = {}, dbName = "PartyData", GroupColl = "groupParties";
    const url = process.env.MONGO_URI;

    mu.connect = () => {
        client = new MongoClient(url, {useUnifiedTopology: true});
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
            client.close();
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
        .findOne({'playlists.name': playlistname})
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
    
    mu.updatePlaylist = (playlistname, newplaylists) => mu.connect().then(client => (

        client.db(dbName)
        .collection(GroupColl)
        .updateOne({'playlists.name': playlistname}, {$set: {playlists: newplaylists}})
        )
        .then(() => {
            client.close();
            return('Done');
        }
    ));
    

    return mu;
}

module.exports = MongoUtils();