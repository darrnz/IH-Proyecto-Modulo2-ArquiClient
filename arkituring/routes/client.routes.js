const  {Router} = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Client = require ('../models/Client.model');
const Construction = require ('../models/Construction.model.js');
const fileUploader = require('../confing/cloudinary.config');
const Architect = require('../models/Architect.model')

//const { routes } = require('../app');

//RUTAS

//Main profile
router.get ('/client-main', async (req,res) =>{
    if(req.session.currentClient){
    const clientId= req.session.currentClient._id
    
    const clientProjects = await Client.findById(clientId).populate('projects')
    console.log(clientProjects)
    //console.log(req.session.currentClient)
    res.render('Client/main/client-main',
     {valueCookie:req.session.currentClient,
      projectsId:clientProjects  
    })
    }
    })

//Nuevo Proyecto
router.get('/add-project', async(req,res,next) => {
    if(req.session.currentClient){

    const architectsList = await Architect.find({})
    console.log(architectsList)
    res.render('Client/project/project-add-project',{
        valueCookie:req.session.currentClient,
        availableArchitects:architectsList
    })
}
})

router.post('/add-project',async(req,res,next) =>{
    const {totalSquareMeters,address,limitatiosLaws,
        pinterstAPI,specificRequest,clientId,selectArchitect} =req.body
        console.log(req.session.currentClient)
        console.log(selectArchitect)
   try{ 
       const newProject = await Construction.create({
        totalSquareMeters,address,limitatiosLaws,
        pinterstAPI,specificRequest
    })
        
        await Client.findByIdAndUpdate(clientId, { $push:{projects:newProject.id}})
        await Architect.findByIdAndUpdate(selectArchitect, { $push:{projectConstId:newProject.id}})
        await Construction.findByIdAndUpdate(newProject.id, { $push:{architects:selectArchitect}})
        await Construction.findByIdAndUpdate(newProject.id, { $push:{client:clientId}})
    console.log('Agregaste un nuevo proyecto:', newProject)
    res.redirect('/client-main')
    } catch(error) {
        next(error)
    }
})

//EXPORTACION
module.exports = router
