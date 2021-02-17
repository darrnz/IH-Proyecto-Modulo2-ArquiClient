const  {Router} = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Architect = require('../models/Architect.model')
const Construction = require ('../models/Construction.model.js');
const Client = require ('../models/Client.model');

//rutas
//detalle por proyecto
router.get('/project/:id/details',async(req,res,next)=>{
  const id = req.params.id
  if(req.session.currentArchitect || req.session.currentClient ){
  const selectedProject = await Construction.findById(id)

  res.render('Project/project-main', 
  {
    viewPRoject:selectedProject,
    valueCookieArq:req.session.currentArchitect,
    valueCookieUser:req.session.currentClient
  })
}
})

router.get('/project/:id/edit',async(req,res,next)=>{
  const id = req.params.id
  if(req.session.currentArchitect || req.session.currentClient ){
  const selectedProject = await Construction.findById(id)

  res.render('Project/project-edit', 
  {
    viewPRoject:selectedProject,
    valueCookieArq:req.session.currentArchitect,
    valueCookieUser:req.session.currentClient
  })
}
})

router.post('/project/:id/edit',async(req,res,next)=>{
  const id = req.params.id
  const {limitatiosLaws,pinterstAPI,specificRequest} =req.body

  const editedProject = await Construction.findByIdAndUpdate(id);
  console.log('Haz editado un nuevo proyecto',{editedProject})
  res.redirect('/project/:id/details')

})


//export
module.exports = router