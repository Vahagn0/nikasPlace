const express = require('express');
const auth = require('../middlewares/auth');
const customerService = require("../services/customer")
let router = express.Router();

router.get('/', auth, customerService.getCustomer);

 router.post('/', customerService.createCustomer);

// router.patch('/:id',);

module.exports = router;