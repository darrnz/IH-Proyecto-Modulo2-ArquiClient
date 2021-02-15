const {Schema, model} = require('mongoose');

const archiSchema = new Schema(
    {
        businessInformation:{
                commecialBusinessName:{
                    type:String,
                    trim:true,
                    unique:true
                },
                logoImg:String,
                firstName: {
                    type:String,
                    trim:true,
                    requiered: [true, "Por favor completa todos los datos"],
                    unique:true
                },
                lastName: {
                    type:String,
                    trim:true,
                    requiered: [true, "Por favor completa todos los datos"],
                    unique:true
                },
                emailNum1: {
                    type:String,
                    requiered: [true,"Por favor agrega un correo electrónico, con este iniciarás sesión"],
                    unique:true,
                    lowercase:true,
                    trim:true,
                    match:[/^\S+@\S+\.\S+$/,"Porfavor usa un mail valido"]
                },
                emailNum2: {
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
                    type:Number,
                    required:[true,"Agregue un número de teléfono válido"]
                },
                officeNumber:{
                    type:Number,
                    required:[true,"Agregue un número de teléfono válido"]
                },
                rfc:{
                    type:String,
                },
                fisalName:{
                    type:String,
                    trim:true,
                    unique:true
                },
                businessAddress:{
                    type:String,
                    required:[true,'Por favor agregue su dirección actual']
                },
                country:{
                    ///usar un selccionador de google maps
                },
                city:{
                    //usar un seleccionador de google maps
                },
                zipCode:{
                    type:String,/// filtrar por el selccionador de google maps?
                    required:[true,'Por favor agregue su código postal']
                },
             },
        socialInformation:{
            bioStoty:String,
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