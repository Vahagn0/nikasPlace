const express = require('express');
const superAdminService = require('../services/superAdmin');
const router = express.Router()
const auth = require('../middlewares/auth');

router.post('/login', superAdminService.login);


module.exports = router