const {Schema,model} = require('mongoose');

const promoprojSchema = new Schema(
    {
        name:{
            type:String,
            trim:true,
            required: [true, "Por favor completa todos los datos"],
            unique:true,
            required:true,
            trim:true,
        },
        localization:{ ///Rev opcion de selec google maps
            type:String,
            required:true
        },
        finishConstrYear:{
            type:Number,
            min:4,
            required:true
        },
        images:['String']
    },
    {
        timestamps:true   
    }
)

module.exports = model('PromoPrj', promoprojSchema)