const  {Router} = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Client = require ('../models/Client.model');
//const { routes } = require('../app');

//RUTAS

//Main profile
router.get ('/client-main', (req,res) =>{
    console.log(req.session.currentArquitect)
    res.render('Client/main/client-main',
     {valueCookie:req.session.currentArquitect})
    })

//EXPORTACION
module.exports = router
