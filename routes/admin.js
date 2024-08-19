const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');



//route işlemleri path/hangi metot
router.get('/products',adminController.getProducts);

router.get('/add-product',adminController.getAddProduct); 
router.post('/add-product',adminController.postAddProducts);



router.get('/products/:productid',adminController.getEditProduct);
 router.post('/products',adminController.postEditProduct);

 router.post('/delete-product',adminController.postDeleteProduct); //product id bodyden gelecek




 







module.exports = router;

