const express = require('express');

const router = express.Router();

const {
    validateBody,
    userCurrent,
    upload
} = require('../../middlewares');

const {
    joiRegisterSchema,
    joiLoginSchema
} = require('../../models/userSchema');

const {
    signup,
    login,
    current,
    updateUser,
    logout
} = require('../../controllers/userControl');

router.post('/signup', validateBody(joiRegisterSchema), signup);

router.post('/login', validateBody(joiLoginSchema), login);

router.get('/current', userCurrent, current);

router.patch('/update', userCurrent, upload.single('avatar'), updateUser);

router.get('/logout', userCurrent, logout);

module.exports = router;