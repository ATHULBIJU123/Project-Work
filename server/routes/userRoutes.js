const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

module.exports = router; 