
const Product = require('../models/product');
// const Category = require('../models/category');

exports.getProducts = (req, res, next) => {//products sayfası

    console.log("admin products");
    Product.findAll().then(products => {
        res.render('admin/products', {//admin/products klasöründe ki pug
            title: "Admin Products",
            products: products,
            path: "/admin/products", //path
            action: req.query.action, //linkin sonundaki querystring parametreleri
            // id: req.query.id
        }); //engine kullanılır viewse gider ve pugdosyasını çalıştırır

    }).catch(
        (error => {
            console.log(error)
        })
    );

};



exports.getAddProduct = (req, res, next) => { //product ekleme sayfası
    res.render('admin/add-product', {
        title: "New Product",
        // categories: categories,
        path: "/admin/add-product"
    });
}

exports.postAddProducts = (req, res, next) => { //sadece post da çalışır
    const product = new Product(req.body.name, req.body.price, req.body.description, req.body.imageUrl);
    product.save()
        .then(
            result => {
                res.redirect('/admin/products');
            }
        )
        .catch();
}


exports.getEditProduct = (req, res, next) => {

    Product.findById(req.params.productid).then(product => {
  

        res.render('admin/edit-product', {
            title: "Edit Product",
            path: "/admin/products",
            // categories: categories,
            product: product
        });
    }).catch(e => console.log(e));
};






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


