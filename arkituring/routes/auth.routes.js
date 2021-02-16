//Importaciones
const {Router} = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Client = require('../models/Client.model')
const Architect = require('../models/Architect.model')
//const fileUploader = require('../confing/cloudinary.config');
const saltRounds = 10


//Rutas

//Rutas Signup - Client

router.get('/signup', (req,res,next) =>{
    res.render('signup')
})

router.post('/signup', async(req,res,next)=> {
    const{userSign} = req.body
    console.log(userSign)
    const {
    /*common*/ firstName,lastName,email,extraEmail,password,mobileNumber,officeNumber,
                rfc,address,country,city,zipCode,      
    /*archiExclusuve*/ commercialName,fiscalName,bioStory,webPage,facebook,
                        instagram,twitter,tiktok
    } = req.body

    //console.log({
      //  /*common*/ firstName,lastName,email,extraEmail,password,mobileNumber,officeNumber,
        //            rfc,address,country,city,zipCode,      
       // /*archiExclusuve*/ commercialName,fiscalName,bioStory,webPage,facebook,
       //                     instagram,twitter,tiktok
       // })
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
        newClient = await Client.create({
            signUpInfo:{firstName,lastName,email,extraEmail,passwordHash,mobileNumber,officeNumber,
                rfc,address,country,city,zipCode
            }
        })
        console.log('Se creó un nuevo cliente', newClient);
        req.session.currentClient = newClient;
        res.render('Client/main/welcomeProfile',{valueCookie:req.session.currentClient})
    } else {
        newArchitect = Architect.create({
            /*common*/ businessInformation:{firstName,lastName,email,extraEmail,passwordHash,mobileNumber,
                        officeNumber,rfc,address,country,city,zipCode,fiscalName,commercialName},      
            /*archiExclusuve*/ socialInformation:{bioStory,webPage,facebook,
                                instagram,twitter,tiktok}
        })
        console.log('Se creó una nueva empresa', {newArchitect});
        req.session.currentClient = newArchitect;
        res.render('Architect/main/welcomeProfile',{valueCookie:req.session.currentClient})
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

router.post('/login', async(req,res,next)=>{
    const {userSign} = req.body
    const {email,password} = req.body
    console.log(userSign)
    console.log(email,password)
    if(email === '' || password === '') {
        res.render('login', {errorMessage:"Por favor llena todos los campos."})
    };
    
      try{
          if(userSign === 'client'){
            let clientLogin =  await Client.findOne({email})
            console.log(clientLogin.signUpInfo)
            if (!clientLogin) {
                res.render('login',{errorMessage:'El usuario no fue encontrado, por favor verifica la información.'})
                return
            } else if (bcrypt.compareSync(password,clientLogin.signUpInfo.passwordHash)) {
            req.session.currentClient = clientLogin;
            res.rendirect('/client-main');
        } else {
            res.render('login', {errorMessage:'Contraseña incorrecta, por favor verifica.'})
        }}   
    } catch (error) {
        next(error);
    }
    
        
    /*} else {
        try{ architectLogin = await Architect.findOne({email})
        console.log(architectLogin.businessInformation)
            if (!architectLogin) {
                res.render('login',{errorMessage:'El usuario no fue encontrado, por favor verifica la información.'})
                return;
            } else if (bcrypt.compareSync(password,architectLogin.businessInformation.passwordHash)) {
            req.session.currentArchitect = architectLogin;
            res.redirect('/architect-main');
        } else {
            res.render('login', {errorMessage:'Contraseña incorrecta, por favor verifica.'})
        }

    } catch (error) {
    next(error);
} }*/

});




//Exportación
module.exports = router