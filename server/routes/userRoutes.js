const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const accessControl = require('../utils/access-control').accessControl;

const setAccessControl = (access_type) => {
    return (req, res, next) => {
        accessControl(access_type, req, res, next)
    }
};

router.get('/users', setAccessControl('1'),userController.getUsers);
// router.post('/users', setAccessControl('1'),userController.createUser);

//19 june : mail template
router.post('/users',setAccessControl('1'), userController.addNewUser);


module.exports = router;