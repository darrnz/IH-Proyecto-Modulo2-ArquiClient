const {Router}      = require('express');
const router        = new Router();
const mongoose      = require('mongoose');
const Architect     = require('../models/Architect.model')
const Construction  = require ('../models/Construction.model');
const fileUploader  = require('../confing/cloudinary.config.js');

//RUTAS

//Main profile
router.get ('/architect-main', async(req,res) =>{
    if (req.session.currentArchitect) {
        const toPopulate = [ { path: 'projectConstId', populate: { path: 'client' } } ]
        const architectId = req.session.currentArchitect._id
        const clientProjects = await Architect.findById(architectId).populate(toPopulate)        
        res.render('Architect/main/archi-main',
        {
            valueCookie:req.session.currentArchitect,
            projectsId:clientProjects,  
        })
    }
});

router.get('/project/:id/details-arq',async(req,res,next)=>{
    if (req.session.currentArchitect) {
        const id = req.params.id;
        const selectedProject = await Construction.findById(id);
        res.render('Architect/projects/project-main-archi', 
            {
                viewProject:selectedProject,
                valueCookie:req.session.currentArchitect
        });
  }
});


router.get('/project/:id/edit-arq', async(req,res) => {
    if (req.session.currentArchitect) {
        const id = req.params.id;
        const selectedProject = await Construction.findById(id);
        console.log(id)
        console.log(selectedProject.pinterstAPI)
        res.render('Architect/projects/project-edit-arq', 
        {
            valueCookie:req.session.currentArchitect,
            idEdit:id,
            viewProject:selectedProject,
        })
    }
});
  
router.post('/project/:id/edit-arq',fileUploader.single('renderImg'),async(req,res,next)=>{
    const id = req.params.id
    const { limitatiosLaws,pinterstAPI,specificRequest,totalSquareMeters,address,projectName } = req.body
    const editedProject = await Construction.findByIdAndUpdate(id,
        {$set:{limitatiosLaws,pinterstAPI,specificRequest,totalSquareMeters,
                address,projectName,renderImg:req.file.path}},
        {new:true})
    console.log('Haz editado un nuevo proyecto',editedProject)
    res.redirect(`/project/${id}/details-arq`)
});


//EXPORTACION
module.exports = router;
