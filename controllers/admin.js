
const Category = require('../models/category');
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
    console.log(req.user._id);
    console.log("post edtit");
    const product = new Product(req.body.name, req.body.price, req.body.description, req.body.imageUrl, null, req.user._id);
    product.save()
        .then(() => { res.redirect('/admin/products'); })
        .catch();
}


exports.getEditProduct = (req, res, next) => {

    Product.findById(req.params.productid).then(product => {

        Category.findAll().then(categories => {


            categories = categories.map(category => {


                if (product.categories) {

                    product.categories.find(item => {
                        if (item == category._id) {
                            category.selected = true;
                        }
                    })
                }
                return category;
            })

            res.render('admin/edit-product', {
                title: "Edit Product",
                path: "/admin/products",
                categories: categories,
                product: product
            });
        })
        console.log(req.params.productid);
    }).catch(e => console.log(e));
};







exports.postEditProduct = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const categories = req.body.categoryids;
    console.log(categories)

    const product = new Product(name, price, description, imageUrl, categories, id, req.user._id);

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


//category

exports.getAddCategory = (req, res, next) => {
    res.render('admin/add-category', {
        title: 'New Category',
        path: '/admin/add-category',

    })
}



exports.postAddCategory = (req, res, next) => {

    const name = req.body.name;
    const description = req.body.description;

    const category = new Category(name, description);
    category.save().then(result => {
        res.redirect('/admin/categories?action=create');
    }).catch((e) => {
        console.log(e);
    });

}


//categories

exports.getCategories = (req, res, next) => {

    Category.findAll().then(categories => {
        res.render('admin/categories', {
            title: 'Categories',
            path: '/admin/add-category',
            categories: categories,
            action: req.query.action
        })
    }).catch((e) => {
        console.log(e);
    });

}


exports.getEditCategory = (req, res, next) => {

    Category.findById(req.params.categoryid).then(category => {

        res.render('admin/edit-category', {
            title: 'Edit Category',
            path: '/admin/edit-category',
            category: category,

        })
    }).catch((e) => {
        console.log(e);
    });

}
exports.postEditCategory = (req, res, next) => {
    console.log("edit");
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;

    const category = new Category(name, description, id);
    category.save().then(result => {
        res.redirect('/admin/categories?action=edit');
    }).catch((e) => {
        console.log(e);
    });



}
