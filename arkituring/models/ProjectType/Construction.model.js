const {Schema,model} = require('mongoose');

const constructionSchema = new Schema(
    {
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
            ownership:{
                //es necesario?
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
            conceptStep:{},
            designStep:{},
            constructionStep:{}
        }

    },
    {
        timestamps:true
    }
)

module.exports = model('Construction', constructionSchema)