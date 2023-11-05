const express = require('express');
const auth = require('../middlewares/auth');
const customerService = require("../services/customer")
let router = express.Router();

router.get('/', auth, customerService.getCustomer);

router.post('/', auth,customerService.createCustomer);

router.get('/:personalCode', customerService.getCustomerByPersonalCode);

router.patch("/addVisit",auth ,customerService.addVisit)

router.post("/findByName",customerService.findByName)

router.post("/getStatistics",customerService.getStatistics)

module.exports = router;