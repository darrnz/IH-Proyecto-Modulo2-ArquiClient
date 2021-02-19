const {Router}          = require('express');
const router            = new Router();
const bcrypt            = require('bcrypt');
const mongoose          = require('mongoose');
const Client            = require ('../models/Client.model');
const Construction      = require ('../models/Construction.model.js');
const Architect         = require('../models/Architect.model');
const fileUploader      = require('../confing/cloudinary.config.js');


//RUTAS

  /*const toPopulate = [ { path: 'idUser', select: '-password' }, { path : 'procedures', populate: { path: 'locantionId' } } ]
  Dentist.find().populate(toPopulate)*/

//Main profile
router.get ('/client-main', async(req,res) => {
    if (req.session.currentClient) {
        const toPopulate = [ { path: 'projects', populate: { path: 'architects' } } ]
        const clientId = req.session.currentClient._id;
        const clientProjects = await Client.findById(clientId).populate(toPopulate)
        res.render('Client/main/client-main',{
            valueCookie:req.session.currentClient,
            projectsId:clientProjects  
            })
    }
})

//Nuevo Proyecto
router.get('/add-project', async(req,res,next) => {
    if (req.session.currentClient) {
        const architectsList = await Architect.find({});
        res.render('Client/main/projects/project-add-project',{
            valueCookie:req.session.currentClient,
            availableArchitects:architectsList,
        });
    };
});

router.post('/add-project',fileUploader.single('terrainImages'), async(req,res,next) => {
   const { totalSquareMeters,address,limitatiosLaws, pinterstAPI,specificRequest,clientId,selectArchitect,projectName } =  req.body;
   try{ 
       const newProject = await Construction.create({
        totalSquareMeters,address,limitatiosLaws,projectName,
        pinterstAPI,specificRequest,terrainImages:req.file.path
    });
    await Client.findByIdAndUpdate(clientId, { $push:{projects:newProject.id}});
    await Architect.findByIdAndUpdate(selectArchitect, { $push:{projectConstId:newProject.id}});
    await Construction.findByIdAndUpdate(newProject.id, { $push:{architects:selectArchitect}});
    await Construction.findByIdAndUpdate(newProject.id, { $push:{client:clientId}});
    console.log('Agregaste un nuevo proyecto:', newProject);
    res.redirect('/client-main');
    } catch(error) {
        next(error)
    };
});

//detalle por proyecto
router.get('/project/:id/details', async(req,res,next) => {
    if (req.session.currentClient) {
      const id = req.params.id;
      const selectedProject = await Construction.findById(id);
      res.render('Client/main/projects/project-main', 
      {
        viewProject:selectedProject,
        valueCookie:req.session.currentClient,
      });
    };
});
  
router.get('/project/:id/edit', async(req,res,next) => {
    if (req.session.currentClient) {
        const id = req.params.id;    
        const selectedProject = await Construction.findById(id);
        res.render('Client/main/projects/project-edit', 
        {
            idEdit:id,
            viewProject:selectedProject,
            valueCookie:req.session.currentClient,
        });
    };
});
  
router.post('/project/:id/edit', fileUploader.single('terrainImages'), async(req,res,next) => {
    const id = req.params.id;
    const { limitatiosLaws,pinterstAPI,specificRequest,totalSquareMeters,address,projectName } = req.body;
    const editedProject = await Construction.findByIdAndUpdate(id,
                    { $set:{ limitatiosLaws,pinterstAPI,specificRequest,totalSquareMeters, address,projectName,terrainImages:req.file.path } },
                    {new:true});   
    console.log('Haz editado un nuevo proyecto',editedProject);
    res.redirect(`/project/${id}/details`);
});

//EXPORTACION
module.exports = router;
