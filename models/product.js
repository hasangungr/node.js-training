


const products = [
    { id: "13231", name: 'Samsung s6', price: '2000', imageUrl: '1.jpg', description: "Good", categoryid: "1" },
    { id: "15234", name: 'Samsung s7', price: '3000', imageUrl: '2.jpg', description: "Bad", categoryid: "1" },
    { id: "43232", name: 'Mac', price: '4000', imageUrl: '3.jpg', description: "Normal", categoryid: "2" },
    { id: "11219", name: 'Arçelikk', price: '5000', imageUrl: '4.jpg', description: "Bad", categoryid: "3" },
];

module.exports = class Product {
    constructor(name, price, imageUrl, description, categoryid) {
        this.id = (Math.floor(Math.random() * 99999) + 1).toString();
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        // this.categoryid = categoryid
    }


    saveProduct() {
        products.push(this);
    }

    static getAll() {
        return products;
    }



    static getById(id) {
        return products.find(i => i.id === id);

    }

    static update(product) {
        const index = products.findIndex(i => i.id === product.id);

        products[index].name = product.name;
        products[index].price = product.price;
        products[index].description = product.description;
    }

    static deleteById(productid) {
        const index = products.findIndex(i => i.id === productid);
        products.splice(index, 1);
    }

    static getProductsByCategoryId(categoryid) {

        return products.filter(i => i.categoryid === categoryid);
    }
}

