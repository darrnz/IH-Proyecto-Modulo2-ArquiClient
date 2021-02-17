const  {Router} = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Architect = require('../models/Architect.model')
const Construction = require ('../models/Construction.model.js');
const Client = require ('../models/Client.model');
const fileUploader = require('../confing/cloudinary.config.js');

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
    idEdit:id,
    viewPRoject:selectedProject,
    valueCookieArq:req.session.currentArchitect,
    valueCookieUser:req.session.currentClient
  })
}
})

router.post('/project/:id/edit',fileUploader.single('renderImg'),async(req,res,next)=>{
  const id = req.params.id
  const {
    limitatiosLaws,pinterstAPI,specificRequest,totalSquareMeters,address,projectName
  }=req.body

  const editedProject = await Construction.findByIdAndUpdate(id,
    {$set:{limitatiosLaws,pinterstAPI,specificRequest,totalSquareMeters,
            address,projectName,renderImg:req.file.path}},
    {new:true})
   
   
  console.log('Haz editado un nuevo proyecto',editedProject)
  res.redirect(`/project/${id}/details`)

})




//export
module.exports = router