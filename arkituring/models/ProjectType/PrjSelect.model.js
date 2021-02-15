const {Schema,model} = requiere('moongose');

const projectsSchema = new Schema(
    {
        projectType:{
            type:String,
            enum:['Remodelación','Proyecto/Construcción','Diseño Interiores']
        }
    }
)