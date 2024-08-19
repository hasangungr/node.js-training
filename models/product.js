
const getDb = require('../utility/database').getdb;


const mongodb = require('mongodb');


class Product {
    constructor(name, price, description, imageUrl, id, userId) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId; 
    }


    save() {
        let db = getDb();

        if (this._id) {
            db = db.collection('products')
                .updateOne({ _id: this._id }, { $set: this });

        } else {
            db =
                db.collection('products')
                    .insertOne(this);
        }
        return db.then(
            result => {
                console.log(result);
            }
        )
            .catch(e => {
                console.log(e);
            });

    }





    static findAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
            // .project({ name: 1, price: 1, description: 1, imageUrl: 0 })
            .then(
                products => {
                    return products;
                }
            )
            .catch(e => {
                console.log(e);
            });

    }

    static findById(productid) {
        const db = getDb();

        // return db.collection('products').find({_id:new mongodb.ObjectId(productid)}).toArray()
        //     .then(
        //         products => {
        //             return products;
        //         }
        //     )
        //     .catch(e => {
        //         console.log(e);
        //     });


        return db.collection('products').findOne({ _id: new mongodb.ObjectId(productid) }).then(product => {
            return product
        }).catch(e => console.log(e));

    }


    static deleteById(productid) {
        const db = getDb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(productid) }).then(() => {
            console.log("deleted");
        }).catch(e => {
            console.log(e);
        })

    }
}

module.exports = Product;