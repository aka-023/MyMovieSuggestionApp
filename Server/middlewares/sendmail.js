require('dotenv').config();
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.NODE_CODE_SENDING_EMAIL_ADD,
        pass: process.env.NODE_CODE_SENDING_EMAIL_PASSWORD
    }
});

module.exports = transport; 