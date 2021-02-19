const {Schema,model} = require('mongoose');


const clientSchema = new Schema(
    {////INFORMACCION DE INSCRIPCION
       
                firstName: {
                    type:String,
                    trim:true,
                    required: [true, "Por favor completa todos los datos"],
                },
                lastName: {
                    type:String,
                    trim:true,
                    required: [true, "Por favor completa todos los datos"],  
                },
                email: {
                    type:String,
                    required: [true,"Por favor agrega un correo electrónico, con este iniciarás sesión"],
                    unique:true,
                    lowercase:true,
                    trim:true,
                    match:[/^\S+@\S+\.\S+$/,"Porfavor usa un correo electrónico válido"]
                },
                passwordHash:{
                    type:String,
                    required:[true,'Por favor agrega una contraseña']
                },
                mobileNumber:{
                    type:String,

                },
                address:{
                    type:String,

                },
                country:{
                    type:String,

                },
                city:{
                    type:String,
                    required:[true,'Por favor agregue el nombre de su ciudad']
                },
                zipCode:{
                    type:String,/// filtrar por el selccionador de google maps?
                    required:[true,'Por favor agregue su código postal']
                },
                projects:[{type: Schema.Types.ObjectId, ref: 'Construction'}],
                userType:{
                    type:String,
                    default:'client'
                },
                activeClient:{
                    type:String,
                    default:'activeClient'
                }             
    },
    {
        timestamps:true
    }
)

module.exports = model('Client', clientSchema);