

//mysql 
const connection = require('../utility/database');

module.exports = class Product {
    constructor(name, price, imageUrl, description, categoryid) {
        // this.id = (Math.floor(Math.random() * 99999) + 1).toString();
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.categoryid = categoryid
    }


    saveProduct() {
        // products.push(this);


        return connection.execute('insert into  products(name,price,imageUrl,description) values (?,?,?,?)',
            [this.name, this.price, this.imageUrl, this.description]);
    }

    static getAll() {
        // return products;
        return connection.execute('SELECT * FROM products');
    }



    static getById(id) {
        // return products.find(i => i.id === id);
        return connection.execute('SELECT * FROM products where products.id=?', [id]);

    }

    static update(product) {
        // const index = products.findIndex(i => i.id === product.id);

        // products[index].name = product.name;
        // products[index].price = product.price;
        // products[index].description = product.description;
        // products[index].categoryid = product.categoryid;

        return connection.execute(`update products set products.name=?,products.price=?,products.imageUrl=?,products.description=?
             where products.id=?`, [product.name, product.price, product.imageUrl, product.description, product.id]);
    }

    static deleteById(productid) {
        // const index = products.findIndex(i => i.id === productid);
        // products.splice(index, 1);

        return connection.execute('delete from products where products.id=?', [productid]);
    }

    static getProductsByCategoryId(categoryid) {

        // return products.filter(i => i.categoryid === categoryid);
    }
}

