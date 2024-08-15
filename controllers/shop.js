
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


    console.log('get products')
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

    req.user.getCart().then(cart => {
        return cart.getProducts().then(
            products => {
                console.log(products);
                res.render('shop/cart', {
                    title: "Cart",
                    path: "/cart",
                    products: products


                });
            }
        ).catch(error => {
            console.log(error)
        });

    }).catch(error => {
        console.log(error)
    });


};

exports.postCart = (req, res, next) => { //cart 


    const productId = req.body.productId;
    let quantity = 1;
    let userCart;

    req.user.getCart().then(cart => {
        userCart = cart;
        return cart.getProducts({ where: { id: productId } });


    }).then(products => {
        let product;
        if (products.length > 0) {
            product = products[0]
        }
        if (product) {
            quantity += product.cartItem.quantity;

            return product;
        }
        return Product.findByPk(productId);
    }).then(product => {
        userCart.addProduct(product, {
            through:
            {
                quantity: quantity
            }
        })


    }).then(() => {
        res.redirect('/cart');
    })
        .catch(error => {
            console.log(error)
        });

    // return cart.getProducts().then(
    //     products => {
    //         res.render('shop/cart', {
    //             title: "Cart",
    //             path: "/cart",
    //             products: products


    //         });
    //     }).catch(error => {
    //         console.log(error)
    //     });
};



exports.postCartItemDelete = (req, res, next) => { //orders info
    req.user.getCart().then(cart => {
        return cart.getProducts({
            where: {
                id: req.body.productid
            }
        }).then(products => {
            return products[0].cartItem.destroy().then(
                () => {
                    res.redirect('/cart');
                }
            );

        })
    })


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
    const model = []
    Category.findAll()
        .then(categories => {
            model.categories = categories;
            const category = categories.find(i => i.id == req.params.categoryid);

            return category.getProducts();

        }).then(products => {
            res.render('shop/products', {
                title: "Products",
                products: products,
                categories: model.categories,
                selectedCategoryId: req.params.categoryid,
                path: "/products"

            });
        }).catch(e => {
            console.log(e);
        })
}





exports.getOrders = (req, res, next) => { //orders info
    // const products = Product.getAll();
    res.render('shop/orders', {
        title: "Orders",
        path: "/orders"

    });
};




exports.postOrder = (req, res, next) => { //orders info

    console.log("post order");
    let userCart;
    req.user.getCart().then(cart => {
        userCart = cart;
        return cart.getProducts();
    }).then(
        products => {


            return req.user.createOrder()
                .then(order => {
                    order.addProducts(products.map(product => {
                        product.orderItem = {
                            quantity: product.cartItem.quantity,
                            price: product.price
                        }
                        return product;
                    }));

                }).catch(e => { console.log(e); });
        })
        .then(() => {
            userCart.setProducts(null);

        })
        .then(() => {
            res.redirect("orders");
        })
        .catch(e => {
            console.log(e);
        });
};
