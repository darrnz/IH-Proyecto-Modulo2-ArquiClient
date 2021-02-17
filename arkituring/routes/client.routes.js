const  {Router} = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Client = require ('../models/Client.model');
const Construction = require ('../models/Construction.model.js');
const fileUploader = require('../confing/cloudinary.config.js');
const Architect = require('../models/Architect.model')

//const { routes } = require('../app');

//RUTAS

  /*const toPopulate = [ { path: 'idUser', select: '-password' }, { path : 'procedures', populate: { path: 'locantionId' } } ]
  Dentist.find().populate(toPopulate)*/

//Main profile
router.get ('/client-main', async (req,res) =>{
    if(req.session.currentClient){
        const toPopulate =[ { path: 'projects', populate: { path: 'architects' } } ]
        const clientId= req.session.currentClient._id
    
        const clientProjects = await Client.findById(clientId).populate(toPopulate)
                          
        console.log(req.session.currentClient)
        res.render('Client/main/client-main',{
            valueCookie:req.session.currentClient,
            projectsId:clientProjects  
            })
    }
})

//Nuevo Proyecto
router.get('/add-project',async(req,res,next) => {
    if(req.session.currentClient){

    const architectsList = await Architect.find({})
    console.log(architectsList)
    res.render('Client/project/project-add-project',{
        valueCookie:req.session.currentClient,
        availableArchitects:architectsList
    })
}
})

router.post('/add-project',fileUploader.single('terrainImages'), async(req,res,next) =>{
    const {totalSquareMeters,address,limitatiosLaws,
        pinterstAPI,specificRequest,clientId,selectArchitect,projectName} =  req.body
        console.log(req.file)
        console.log(selectArchitect)

   try{ 
       const newProject = await Construction.create({
        totalSquareMeters,address,limitatiosLaws,projectName,
        pinterstAPI,specificRequest,terrainImages:req.file.path
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
