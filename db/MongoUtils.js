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

    mu.insertNewGroup = (group) => mu.connect().then(client => (
        client.db(dbName)
        .collection(GroupColl)
        .insertOne({
            groupname: `${group}`,
            playlists: [],
            members: [],
            nextup: "",
            nowplaying: ""
        }).then(() => {
            console.log("Added!");
        })
    ));
        

    return mu;
}

module.exports = MongoUtils();