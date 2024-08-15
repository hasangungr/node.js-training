
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
    res.render('admin/add-product', {
        title: "New Product",
        // categories: categories[0],
        path: "/admin/add-product"
    });

}

exports.postAddProducts = (req, res, next) => { //sadece post da çalışır


    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    // const categoryid = req.body.name

    // Product.create(
    //     {
    //         name: name,
    //         price: price,
    //         imageUrl: imageUrl,
    //         description: description
    //     }
    // ).then(
    //     result => { res.redirect('/'); }
    // ).catch(error => { console.log(error); });


    const prd = Product.build({
        name: name,
        price: price,
        imageUrl: imageUrl,
        description: description

    });

    prd.save().then(result => {
        console.log(result);
        res.redirect('/');
    }).catch(error => {
        console.log(error);
    })




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

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const categoryid = req.body.categoryid;

    Product.findByPk(id).then(
        product => {
            product.name = name;
            product.price = price;
            product.description = description;

            // product.categoryid = categoryid;

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

 
