const express = require('express');

const { login, logout, register, forgotpw, resetpw, userinfo, deleteUser } = require('../controllers/auth');

const router = express.Router();

router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgot').post(forgotpw);
router.route('/userinfo').get(userinfo);
router.route('/register').post(register);
router.route('/delete').delete(deleteUser);
router.route('/reset/:resetToken').put(resetpw);

module.exports = router;