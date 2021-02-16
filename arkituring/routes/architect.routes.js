const  {Router} = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Architect = require ('../models/Architect.model');
//const { routes } = require('../app');

//RUTAS

//Main profile
router.get ('/architec-main', (req,res) =>{
    console.log(req.session.currentArquitect)
    res.render('Architect/main/archi.main',
     {valueCookie:req.session.currentArquitect})
    })

//EXPORTACION
module.exports = router
