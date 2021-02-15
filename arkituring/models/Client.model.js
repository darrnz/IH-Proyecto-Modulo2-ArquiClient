const {Schema,model} = requiere('moongose');


const clientSchema = new Schema(
    {////INFORMACCION DE INSCRIPCION
        signUpInfo:{
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
                    match:[/^\S+@\S+\.\S+$/,"Porfavor usa un mail valido"]
                },
                passwordHash:{
                    type:String,
                    required:[true,'Por favor agrega una contraseña']
                },
                phoneCountry:{
                    //banderitas con el prefijo internacional
                },
                phoneNumber:{
                    type:Number,
                    required:[true,"Agregue un número de teléfono válido"]
                },
                rfc:{
                    type:String,
                },
                addressActual:{
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
        projectsInfo:{
            projectConstId:[{type: Schema.Types.ObjectId, ref: 'Construction'}],
            projectRemodtId:[{type: Schema.Types.ObjectId, ref: 'Remodelation'}],
            projectInteriorId:[{type: Schema.Types.ObjectId, ref: 'InteriorDesign'}]
        }
    },
    {
        timestamps:true
    }
)

module.exports = model('Client', clientSchema);