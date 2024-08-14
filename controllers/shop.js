
const Category = require('../models/category');
const Product = require('../models/product');



exports.getIndex = (req, res, next) => { //home page
    // const products = Product.getAll();
    const categories = Category.getAll();
    Product.getAll().then(products => {
        res.render('shop/index', {
            title: "Home Page",
            products: products[0],
            categories: categories,
            path: "/"

        });
    }).catch(
        (error => {
            console.log(error)
        })
    );


};


exports.getProducts = (req, res, next) => { //all products

    const categories = Category.getAll();


    Product.getAll().then(products => {
        res.render('shop/products', {
            title: "Products",
            products: products[0],
            categories: categories,
            path: "/products"

        });
    }).catch(
        (error => {
            console.log(error)
        })
    );



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
    const categories = Category.getAll();
    Product.getById(req.params.productid).then(
        (product) => {

            console.log(product[0]);
            res.render('shop/product-detail', {
                title: product[0][0].name,
                product: product[0][0],
                categories: categories,
                path: '/products'
            });
        }
    ).catch(
        (error => {
            console.log(error)
        })
    );
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
