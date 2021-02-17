const mongoose const mongoose = require('mongoose')
const Client = require('../models/Client.model')

const DB_NAME = ''

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true

})

const clients =  signUpInfo:{ 
                firstName: Juan,
                
                lastName: Perez,
                   
                email: {
                    type:String,
                    required: [true,"Por favor agrega un correo electrónico, con este iniciarás sesión"],
                    unique:true,
                    lowercase:true,
                    trim:true,
                    match:[/^\S+@\S+\.\S+$/,"Porfavor usa un mail valido"]
                },
                extraEmail: {
                    type:String,
                    
                    lowercase:true,
                    trim:true,
                    match:[/^\S+@\S+\.\S+$/,"Porfavor usa un mail valido"]
                },
                passwordHash:{
                    type:String,
                    required:[true,'Por favor agrega una contraseña']
                },
                phoneCountry:{
                    //banderitas con el prefijo internacional
                },
                mobileNumber:{
                    type:String,
                    required:[true,"Agregue un número de teléfono válido"]
                },
                officeNumber:{
                    type:String,
                   
                },
                rfc:{
                    type:String,
                },
                address:{
                    type:String,
                    required:[true,'Por favor agregue su dirección actual']
                },
                country:{
                    type:String,
                    required:[true,'Por favor agregue su país']
                },
                city:{
                    type:String,
                    required:[true,'Por favor agregue el nombre de su ciudad']
                },
                zipCode:{
                    type:String,/// filtrar por el selccionador de google maps?
                    required:[true,'Por favor agregue su código postal']
                },
             }
        