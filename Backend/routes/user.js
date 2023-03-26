const express = require('express');
const router = express.Router(); 

const { model } = require('mongoose');
//creation de chemin user dans controllors
const userCtrl = require('../controllors/user');

router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login);

module.exports = router;