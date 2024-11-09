const express = require('express');

const router = express.Router();
const {signup, login, logout, changePassword, sendForgotPasswordCode, verifyForgotPasswordCode} = require('../controllers/authController');
const {identifier} = require('../middlewares/verify');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/change-password', identifier, changePassword);
router.post('/send-fp-code', sendForgotPasswordCode);
router.post('/verify-fp-code', verifyForgotPasswordCode);

module.exports = router;