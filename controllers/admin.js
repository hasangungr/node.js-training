
const Product = require('../models/product');
const Category = require('../models/category');

exports.getProducts = (req, res, next) => {//products sayfası

    console.log("admin products");
    Product.findAll().then(products => {
        res.render('admin/products', {//admin/products klasöründe ki pug
            title: "Admin Products",
            products: products,
            path: "/admin/products", //path
            action: req.query.action, //linkin sonundaki querystring parametreleri
            id: req.query.id
        }); //engine kullanılır viewse gider ve pugdosyasını çalıştırır

    }).catch(
        (error => {
            console.log(error)
        })
    );

};



exports.getAddProduct = (req, res, next) => { //product ekleme sayfası

    Category.findAll().then(
        (categories) => {
            res.render('admin/add-product', {
                title: "New Product",
                categories: categories,
                path: "/admin/add-product"
            });
        }
    ).catch((e) => {
        console.log(e);
    });


}

exports.postAddProducts = (req, res, next) => { //sadece post da çalışır
    req.user.createProduct(
        {
            name: req.body.name,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            categoryId: req.body.categoryid,
            // userId: req.user.id
        }
    ).then(
        () => { res.redirect('/'); }
    ).catch(error => { console.log(error); });

}


exports.getEditProduct = (req, res, next) => {

    return Product.findByPk(req.params.productid).then(
        (product) => {
            if (!product) {
                return res.redirect('/');
            }
            Category.findAll().then(
                (categories) => {
                    res.render('admin/edit-product', {
                        title: "Edit Product",
                        path: "/admin/products",
                        categories: categories,
                        product: product
                    });
                }
            ).catch((e) => {
                console.log(e);
            });
            //engine kullanılır viewse gider ve pugdosyasını çalıştırır
        }
    ).catch(
        (error => {
            console.log(error)
        })
    );
}



exports.postEditProduct = (req, res, next) => { //sadece post da çalışır

    Product.findByPk(req.body.id).then(
        product => {
            product.name = req.body.name;
            product.price = req.body.price;
            product.description = req.body.description;
            product.imageUrl = req.body.imageUrl;
            product.categoryId = req.body.categoryId;

            return product.save();
        }
    ).then(
        () => {
            res.redirect('/admin/products?action=edit&id=' + id);
        }
    )
        .catch(
            (e) => {
                console.log(e);
            }

        );

}


exports.postDeleteProduct = (req, res, next) => {
    Product.destroy({
        where: {
            id: req.body.productid
        }
    }).then(
        () => {
            res.redirect('/admin/products?action=delete');
        }
    ).catch((e) => {
        console.log(e);
    });

}


