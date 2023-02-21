const usercont = require('./userContoller');
const express = require('express');
const morgan = require('morgan');
exports.app = express();
exports.app.use(morgan('dev'));

exports.app.use(express.static('public'));

exports.app.use(express.urlencoded({extended: true}));
exports.app.use(express.json());
exports.app.post('/register', usercont.create);
