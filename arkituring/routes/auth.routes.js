//Importaciones
const { Router } = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Client = require('../models/Client.model')
const Architect = require('../models/Architect.model')
const fileUploader = require('../confing/cloudinary.config');
const saltRounds = 10


//Rutas

//Rutas Signup - Client

router.get('/signup', (req,res,next) =>{
    res.render('signup')
})

router.post('/signup',fileUploader.single('logoImg') ,async(req,res,next)=> {
    const{userSign} = req.body
    console.log(userSign)
    const {
    /*common*/ firstName,lastName,email,password,mobileNumber,
                rfc,address,country,city,zipCode,      
    /*archiExclusuve*/ commercialName,fiscalName,bioStory,webPage,facebook,
                        instagram,twitter
    } = req.body

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
        res.status(500).render('signup',{errorMessage:'Por favor revisa tu contraseña, debe contener al menos 6 carácteres, incluuendo un número, una letra mayúscula y una letra minúscula'})
        return;
    }
    //pendiense revision de que contenidos van llenos
    let newClient;
    let newArchitect;

    try{
    const genSaltRounds = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password,genSaltRounds);
    if(userSign === 'client') {
        newClient = Client.create({
           firstName,lastName,email,passwordHash,mobileNumber,
                address,country,city,zipCode
            
        })
        console.log('Se creó un nuevo cliente', newClient);
        req.session.currentClient = newClient;
        res.render('Client/main/welcomeProfile',{
            valueCookie:req.session.currentClient
        })
    } else {
        newArchitect = Architect.create({
            /*common*/ firstName,lastName,email,passwordHash,mobileNumber,
                        rfc,address,country,city,zipCode,logoImg: req.file.path ,fiscalName,commercialName,      
            /*archiExclusuve*/ bioStory,webPage,facebook,
                                instagram,twitter
        })
        console.log('Se creó una nueva empresa', newArchitect);
        req.session.currentArquitect = newArchitect;
        res.render('Architect/main/welcomeProfile',{
            valueCookie:req.session.currentArquitect
        })
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
    console.log(email)
    console.log(password)
    if(email === '' || password === '') {
        res.render('login', {errorMessage:"Por favor llena todos los campos."})
    };


      try{
    let clientLogin;
    let architectLogin;
    
          if(userSign === 'client') {
           clientLogin =  await Client.findOne({email})
        console.log(clientLogin)
            if (!clientLogin) {
                res.render('login',{errorMessage:'El usuario no fue encontrado, por favor verifica la información.'})
                return;
            } else if (bcrypt.compareSync(password,clientLogin.passwordHash)) {
            req.session.currentClient = clientLogin;
            res.redirect('/client-main');
        } else {
            res.render('login', {errorMessage:'Contraseña incorrecta, por favor verifica.'})
        }    } 
     else {
       architectLogin = await Architect.findOne({email})
        console.log(architectLogin)
            if (!architectLogin) {
                res.render('login',{errorMessage:'El usuario no fue encontrado, por favor verifica la información.'})
                return;
            } else if (bcrypt.compareSync(password,architectLogin.passwordHash)) {
            req.session.currentArchitect = architectLogin;
            res.redirect('/architect-main');
        } else {
            res.render('login', {errorMessage:'Contraseña incorrecta, por favor verifica.'})
        }

    } }catch (error) {
    next(error);
} 



});

//LOGOUT
  router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });




//Exportación
module.exports = router