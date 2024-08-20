
const getDb = require('../utility/database').getdb;


const mongodb = require('mongodb');


class User {
    constructor(name, email, id, cart) {

        this.name = name,
            this.email = email,
            this._id = id,
            this.cart = cart ? cart : {},
            this.cart.items = cart ? cart.items : []

    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

 

    static findById(userid) {
        const db = getDb();
        return db.collection('users').findOne({ _id: new mongodb.ObjectId(userid) }).then(user => {
            return user;
        }).catch(e => console.log(e));
    }
    static findByEmail(userEmail) {
        const db = getDb();
        return db.collection('users').findOne({ email: userEmail }).then(user => {
            return user;
        }).catch(e => console.log(e));
    }
}

module.exports = User;