
const getDb = require('../utility/database').getdb;


const mongodb = require('mongodb');


class Category {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }


    save() {

        const db = getDb();


        return db.collection('categories').insertOne(this).then(result => {

        }).catch(e => console.log(e))

    }


    static findAll() {
        const db = getDb();

        return db.collection('categories').find().toArray().then(categories => {
            return categories
        }).catch(e => console.log(e))
    }
}

module.exports = Category;