
const Category = require('../models/category');
const Product = require('../models/product');



exports.getIndex = (req, res, next) => { //home page
    const products = Product.getAll();
    const categories = Category.getAll();
    res.render('shop/index', {
        title: "Home Page",
        products: products,
        categories: categories,
        path: "/"

    });
};


exports.getProducts = (req, res, next) => { //all products
    const products = Product.getAll();
    const categories = Category.getAll();
    console.log("shop products");
    res.render('shop/products', {
        title: "Products",
        products: products,
        categories: categories,
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

    const categories = Category.getAll();

    res.render('shop/product-detail', {
        title: product.name,
        product: product,
        categories: categories,
        path: '/products'
    });

};

exports.getProductsByCategoryId = (req, res, next) => {

    const categoryid = req.params.categoryid;

    const products = Product.getProductsByCategoryId(categoryid);

    const categories = Category.getAll();



    console.log("shop products");
    res.render('shop/products', {
        title: "Products",
        products: products,
        categories: categories,
        selectedCategoryId: categoryid,
        path: "/products"

    });

}
