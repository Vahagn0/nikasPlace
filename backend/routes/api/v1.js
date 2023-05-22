const productController = require('../../controllers/product');
const userController = require('../../controllers/user');
const adminController = require('../../controllers/superAdmin');

const express = require('express');
let router = express.Router();
router.use('/product', productController);
router.use('/user', userController);
router.use('/admin', adminController);
module.exports = router;