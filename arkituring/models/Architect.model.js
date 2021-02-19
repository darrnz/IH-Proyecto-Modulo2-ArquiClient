const {Schema, model} = require('mongoose');

const archiSchema = new Schema(
    {
                commercialName:{
                    type:String,
                    trim:true, 
                    required: [true, "Agrega tu nombre comercial, puedes copiar tu primer nombre"],  
                },
                logoImg:String,
                firstName: {
                    type:String,
                    trim:true,
                },
                lastName: {
                    type:String,
                    trim:true,
                },
                email: {
                    type:String,
                    requiered: [true,"Por favor agrega un correo electrónico, con este iniciarás sesión"],
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
                }, 
                rfc:{
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
                    
                },
                zipCode:{
                    type:String,/// filtrar por el selccionador de google maps?
                 
                },
            bioStory:String,
            webPage:String,
            facebook:String,
            instagram:String,
            twitter:String,
            promPrjId:[{type: Schema.Types.ObjectId, ref: 'PromoPrj'}],
            projectConstId:[{type: Schema.Types.ObjectId, ref: 'Construction'}],

            userType:{
                type:String,
                default:'architect'}
            
        },                        
        {
            timestamps:true         
        }
)

module.exports = model('Architect', archiSchema)