const express = require ('express');
const router = express.Router();
const authController = require('../controller/authController');
const accessControl = require('../utils/access-control').accessControl

const setAccessControl = (access_type) => {
    return (req, res, next) => {
        accessControl(access_type, req, res, next);
    }
};

router.post('/login',setAccessControl('*'), authController.login);
router.post('/forget-password', setAccessControl('*'),authController.forgotPasswordController)
router.post('/reset-password', setAccessControl('*'),authController.passwordResetController)

module.exports = router;