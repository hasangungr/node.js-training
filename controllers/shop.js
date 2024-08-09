
const Product = require('../models/product');



exports.getIndex = (req, res, next) => { //home page
    const products = Product.getAll();
    res.render('shop/index', {
        title: "Home Page",
        products: products,
        path: "/"

    });
};


exports.getProducts = (req, res, next) => { //all products
    const products = Product.getAll();

    console.log("shop products");
    res.render('shop/products', {
        title: "Products",
        products: products,
        path: "/products"

    });
};


exports.getProductDetails = (req, res, next) => { //product detail
    const products = Product.getAll();
    res.render('shop/details', {
        title: "Details",
        path: "/details"

    });
};

exports.getCart = (req, res, next) => { //cart 
    const products = Product.getAll();
    res.render('shop/cart', {
        title: "Cart",
        path: "/cart"

    });
};

exports.getOrders = (req, res, next) => { //orders info
    const products = Product.getAll();
    res.render('shop/orders', {
        title: "Orders",
        path: "/orders"

    });
};

exports.getProduct = (req, res, next) => {//product sayfası

 

    const product = Product.getById(req.params.productid);


    res.render('shop/product-detail', {
        title: product.name,
        product: product,
         path: '/products'
    });

};
