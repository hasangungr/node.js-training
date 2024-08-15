
const Category = require('../models/category');
const Product = require('../models/product');



exports.getIndex = (req, res, next) => { //home page

    Product.findAll({
        attributes: ['id', 'name', 'price'],
    }).then(products => {
        const categories = Category.findAll().then(
            categories => {
                res.render('shop/index', {
                    title: "Home Page",
                    products: products,
                    categories: categories,
                    path: "/"

                });
            }
        ).cath((error => {
            console.log(error)
        }));

    }).catch(
        (error => {
            console.log(error)
        })
    );


};


exports.getProducts = (req, res, next) => { //all products


    Product.findAll(
        {
            attributes: ['id', 'name', 'price', 'description'],
        }
    ).then(products => {
        const categories = Category.findAll().then(
            categories => {
                res.render('shop/products', {
                    title: "Products",
                    products: products,
                    categories: categories,
                    path: "/products"

                });
            }
        ).cath((error => {
            console.log(error)
        }));

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

    Product.findAll({

        attributes: ['id', 'name', 'price', 'description'],
        where: {
            id: req.params.productid
        }


    }).then(
        products => res.render('shop/product-detail', {
            title: products[0].name,
            product: products[0],
            // categories: categories,
            path: '/products'
        })


    ).catch((error => {
        console.log(error)
    }));
    // Product.findByPk(req.params. productid).then(
    //     (product) => {
    //         res.render('shop/product-detail', {
    //             title: product.name,
    //             product: product,
    //             // categories: categories,
    //             path: '/products'
    //         });
    //     }
    // ).catch(
    //     (error => {
    //         console.log(error)
    //     })
    // );
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
