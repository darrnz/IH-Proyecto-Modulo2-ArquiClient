//Importaciones
const {Router} = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Client = require('../models/Client.model')
const Architect = require('../models/Architect.model')

const saltRounds = 10


//Rutas

//Rutas Signup - Client

router.get('/signup', (req,res,next) =>{
    res.render('signup')
})

router.post('/signup', async (req,res,next)=>{
    const{userSign} = req.body
    console.log(userSign)
    const {
    /*common*/ firstName,lastName,email1,email2,password,mobileNumber,officeNumber,
                rfc,address,country,city,zipCode,      
    /*archiExclusuve*/ commercialName,fiscalName,bioStory,webPage,facebook,
                        instagram,twitter,tiktok
    } = req.body

    console.log({
        /*common*/ firstName,lastName,email1,email2,password,mobileNumber,officeNumber,
                    rfc,address,country,city,zipCode,      
        /*archiExclusuve*/ commercialName,fiscalName,bioStory,webPage,facebook,
                            instagram,twitter,tiktok
        })
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
        res.status(500).render('signup',{errorMessage:'Por favor revisa tu contraseña, debe contener al menos 6 carácteres, incluuendo un número, una letra mayúscula y una letra minúscula'})
        return;
    }
    //pendiense revision de que contenidos van llenos
   
    try{
    const genSaltRounds = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password,genSaltRounds);
    
    let newClient;
    let newArchitect;
    if(userSign === 'client') {
        newClient = Client.create({
            signUpInfo:{firstName,lastName,email1,email2,passwordHash,mobileNumber,officeNumber,
                rfc,address,country,city,zipCode}
        })
        console.log('Se creó un nuevo cliente', newClient);
        res.render('Client/main/welcomeProfile')
    } else {
        newArchitect = Architect.create({
            /*common*/ businessInformation:{firstName,lastName,email1,email2,passwordHash,mobileNumber,
                        officeNumber,rfc,address,country,city,zipCode},      
            /*archiExclusuve*/ socialInformation:{commercialName,fiscalName,bioStory,webPage,facebook,
                                instagram,twitter,tiktok}
        })
        console.log('Se creó una nueva empresa', newArchitect);
        res.render('Architect/main/welcomeProfile')
    }

    } catch(error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render('signup', {errorMessage:'El correo debe estar en un formato válido ej. abc@mail.com'})
        } else if (error.code === 11000) {
            res.status(500).render('signup', {errorMessage:'El usuario ya existe, por favor intenta con uno diferente'})
        } else {
            next(error)
        }
    }
   
});

//LOGIN 

router.get('/login', (req,res,next)=>{
    res.render('login')
})

router.post('/login', (req,res,next)=>{
    
})




//Exportación
module.exports = router