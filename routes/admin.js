const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');



//route işlemleri path/hangi metot
router.get('/add-product',adminController.getAddProduct); 
router.get('/add-product',adminController.postAddProducts);
router.get('/products',adminController.getProducts);
router.get('/edit-product',adminController.getEditProduct);
router.get('/edit-product',adminController.postEditProduct);
 







module.exports = router;

