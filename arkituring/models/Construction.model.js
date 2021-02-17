const {Schema,model} = require('mongoose');

const constructionSchema = new Schema({
    projectName:{       
        type:String,
        required:true
    },
    totalSquareMeters:{
        type:Number,
        required:true,
    },
    terrainImages:String,
    address:{
        type:String,
    },
    limitatiosLaws:{
        type:String,
    },
    pinterstAPI:String,
    specificRequest:String,
    renderImg:String,
    conceptStep:{
        type:String,
    },
    designStep:{ 
    },
    constructionStep:{
        type:String,
    },
    
    client:[{type: Schema.Types.ObjectId, ref: 'Client'}],
    architects:[{type: Schema.Types.ObjectId, ref: 'Architect'}]
    
})



module.exports = model('Construction', constructionSchema)
  /* {
        terrainInfo:{
            totalSquareMeters:{
                type:Number,
                required:true,
            },
            address:{
                mapLocalization:{
                    ////google maps selector for country and city
                },
                street:{
                    type:String
                },
                neighborhood:{
                    type:String
                },
                extNo:{
                    type:Number
                },
                intNo:{
                    type:Number
                },
                zipCode:{
                    type:Number
                }

            },

            limitatiosLaws:{
                pduInfo:String,
                residentialInfo:String,
            },
            terrainImages:[String],
        },
        designClientReq:{
            pinterstAPI:String,
            specificRequest:{ ///si avanzo poner listas para numero de hab etc
                type:String
            }
        },
        projectSteps:{
            
        }

    },
    {
        timestamps:true
    }*/