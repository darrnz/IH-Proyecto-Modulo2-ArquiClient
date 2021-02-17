const  {Router} = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Architect = require('../models/Architect.model')
//const { routes } = require('../app');

//RUTAS

//Main profile
router.get ('/architect-main', (req,res) =>{
    if(req.session.currentArchitect){
    console.log(req.session)
    res.render('Architect/main/archi-main',
     {valueCookie:req.session.currentArchitect})
    }
    
})

//proyecto muestra home

router

//EXPORTACION
module.exports = router
