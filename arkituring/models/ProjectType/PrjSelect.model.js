const {Schema,model} = require('mongoose');

const projectsSchema = new Schema(
    {
        projectType:{
            type:String,
            enum:['Remodelación','Proyecto/Construcción','Diseño Interiores']
        }
    }
)