
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {//products sayfası
    console.log("admin products");
    const products = Product.getAll();
    res.render('admin/products', {//admin/products klasöründe ki pug
        title: "Admin Products",
        products: products,
        path: "/admin/products", //path
        action: req.query.action, //linkin sonundaki querystring parametreleri
        id: req.query.id

    }); //engine kullanılır viewse gider ve pugdosyasını çalıştırır
};



exports.getAddProduct = (req, res, next) => { //product ekleme sayfası
    console.log('add product get middleware')
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));

    res.render('admin/add-product', {
        title: "New Product",
        path: "/admin/add-product"
    }); //engine kullanılır viewse gider ve pugdosyasını çalıştırır
}

exports.postAddProducts = (req, res, next) => { //sadece post da çalışır
    // console.log(req.body); //body-parse olmadan undefined döner 

    // products.push({ name: req.body.name, price: req.body.price, image: req.body.image, description: req.body.description });
    // console.log(req.body);

    const product = new Product(req.body.name, req.body.price, req.body.imageUrl, req.body.description);
    product.saveProduct();
    res.redirect('/'); //işlemler bittikten sonra anasayfa ya dön
}


exports.getEditProduct = (req, res, next) => {
    const product = Product.getById(req.params.productid);

    res.render('admin/edit-product', {
        title: "Edit Product",
        path: "/admin/products",
        product: product
    }); //engine kullanılır viewse gider ve pugdosyasını çalıştırır
}

exports.postDeleteProduct = (req, res, next) => {
    console.log('delete');
    Product.deleteById(req.body.productid);
    res.redirect('/admin/products?action=delete');
}


exports.postEditProduct = (req, res, next) => { //sadece post da çalışır

    const product = Product.getById(req.body.id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    Product.update(product);


    res.redirect('/admin/products?action=edit&id='+product.id); //tipler 
}

