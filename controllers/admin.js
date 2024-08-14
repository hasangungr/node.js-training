
const Product = require('../models/product');
const Category = require('../models/category');

exports.getProducts = (req, res, next) => {//products sayfası
    console.log("admin products");
    Product.getAll().then(products => {
        res.render('admin/products', {//admin/products klasöründe ki pug
            title: "Admin Products",
            products: products[0],
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
    console.log('add product get middleware')
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));

    Category.getAll().then(
        (categories) => {
            res.render('admin/add-product', {
                title: "New Product",
                categories: categories[0],
                path: "/admin/add-product"
            }); //engine kullanılır viewse gider ve pugdosyasını çalıştırır
        }
    ).catch((error => {
        console.log(error)
    }));


}

exports.postAddProducts = (req, res, next) => { //sadece post da çalışır
    // console.log(req.body); //body-parse olmadan undefined döner 

    // products.push({ name: req.body.name, price: req.body.price, image: req.body.image, description: req.body.description });
    // console.log(req.body);

    const product = new Product(req.body.name, req.body.price, req.body.imageUrl, req.body.description,req.body.categoryid);
    console.log(product);
    product.saveProduct().then(
        () => {
            res.redirect('/'); //işlemler bittikten sonra anasayfa ya dön
        }
    ).catch((e) => {
        console.log(e);
    });
}


exports.getEditProduct = (req, res, next) => {
   
    return Product.getById(req.params.productid).then(
        (product) => {
            Category.getAll().then(
                (categories)=>{
                    res.render('admin/edit-product', {
                        title: "Edit Product",
                        path: "/admin/products",
                        categories: categories[0],
                        product: product[0][0]
                    }); 
                }
            ).catch( (e)=>{
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

exports.postDeleteProduct = (req, res, next) => {
    console.log('delete');
    Product.deleteById(req.body.productid).then(
        () => {
            res.redirect('/admin/products?action=delete');
        }
    ).catch((e) => {
        console.log(e);
    });


}


exports.postEditProduct = (req, res, next) => { //sadece post da çalışır

    const product = new Product();
    product.id = req.body.id;
    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
    product.categoryid = req.body.categoryid;
    Product.update(product).then(
        (product) => {
            res.redirect('/admin/products?action=edit&id=' + product.id); //tipler 
        }
    ).catch((e) => {
        console.log(e);
    });
}

