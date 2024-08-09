


const products = [
    { id: "13231", name: 'Samsung s6', price: '2000', imageUrl: '1.jpg', description: "Good" },
    { id: "15234", name: 'Samsung s7', price: '3000', imageUrl: '2.jpg', description: "Bad" },
    { id: "43232", name: 'Samsung s8', price: '4000', imageUrl: '3.jpg', description: "Normal" },
    { id: "11219", name: 'Samsung s9', price: '5000', imageUrl: '4.jpg', description: "Bad" },
];

module.exports = class Product {
    constructor(name, price, imageUrl, description) {
        this.id = (Math.floor(Math.random() * 99999) + 1).toString();
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;


    }


    saveProduct() {
        products.push(this);
    }

    static getAll() {
        return products;
    }



    static getById(id) {
        const product = products.find(i => i.id === id);
        return product;
    }

    static update(product) {
        const index = products.findIndex(i => i.id === product.id);

        products[index].name = product.name;
        products[index].price = product.price;
        products[index].description = product.description;
    }

}

