
const express = require('express');

const router = express.Router();

const admin = require('./admin');

const shopController = require('../controllers/shop');





// router.get('/', (req, res, next) => {
//     console.log('home middleware');
//     res.sendFile(
//         path.join(__dirname, '../', 'views', 'index.html'));//süreç kesilir 
// });



// /admin/add-prduct=> GET
router.get('/',shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productid', shopController.getProduct);

router.get('/detail', shopController.getProductDetails);

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/delete-cartitem', shopController.postCartItemDelete);

router.get('/orders', shopController.getOrders);



router.get('/categories/:categoryid', shopController.getProductsByCategoryId);

 



module.exports = router;