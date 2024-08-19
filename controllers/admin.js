
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

        console.log(req.params.productid);
    }).catch(e => console.log(e));
};







exports.postEditProduct = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    // const categoryid = req.body.categoryid;

    const product = new Product(name, price, description, imageUrl, id);

    product.save()
        .then(result => {
            res.redirect('/admin/products?action=edit');
        })
        .catch(err => console.log(err));
}



exports.postDeleteProduct = (req, res, next) => {


    Product.deleteById(req.body.productid).then(
        () => {
            res.redirect('/admin/products?action=delete');
        }
    ).catch((e) => {
        console.log(e);
    });

}


