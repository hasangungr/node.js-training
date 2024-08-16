const mongodb = require('mongodb');


const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://localhost/node-app')
        .then(client => {
            console.log('connected');
            callback(client);

        }).catch(e => { console.log(e) });
}


module.exports = mongoConnect;