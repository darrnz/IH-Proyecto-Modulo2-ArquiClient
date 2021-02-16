const {Schema, model} = require('mongoose');

const archiSchema = new Schema(
    {
        businessInformation:{
                commercialName:{
                    type:String,
                    trim:true,
                    unique:true
                },
                logoImg:String,
                firstName: {
                    type:String,
                    trim:true,
                    //requiered: [true, "Por favor completa todos los datos"],
                    
                },
                lastName: {
                    type:String,
                    trim:true,
                    requiered: [true, "Por favor completa todos los datos"],
                
                },
                email1: {
                    type:String,
                    requiered: [true,"Por favor agrega un correo electrónico, con este iniciarás sesión"],
                    unique:true,
                    lowercase:true,
                    trim:true,
                    match:[/^\S+@\S+\.\S+$/,"Porfavor usa un mail valido"]
                },
                email2: {
                    type:String,
                    unique:true,
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
                fiscalName:{
                    type:String,
                    trim:true,
                    unique:true
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
             },
        socialInformation:{
            bioStory:String,
            webPage:String,
            facebook:String,
            instagram:String,
            twitter:String,
            tiktok:String
        },

        promotionPrj:{
            promPrjId:[{type: Schema.Types.ObjectId, ref: 'PromoPrj'}]
        },
        localProjects:{
            projectConstId:[{type: Schema.Types.ObjectId, ref: 'Construction'}],
            projectRemodtId:[{type: Schema.Types.ObjectId, ref: 'Remodelation'}],
            projectInteriorId:[{type: Schema.Types.ObjectId, ref: 'InteriorDesign'}]
        }

    },
        {
            timestamps:true
        }
)

module.exports = model('Architect', archiSchema)