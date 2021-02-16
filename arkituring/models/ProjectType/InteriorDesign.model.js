const {Schema,model} = require('mongoose');

const interiosDesignSchema = new Schema(
    {
        porpertyInfo:{
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

            areaToRedesign:{
                areaDescription:{
                    type:String,
                    required:true
                },
                imagesActual:[String],
                includeFurniture: Boolean
            },

        },
        designClientReq:{
            pinterstAPI:String,
            photosWebAndSocial:String,
            uploadedImgaes:[String],
            specificRequest:{ ///si avanzo poner listas para numero de hab etc
            type:String
            }
    },
    },
    {
        timestamps:true
    }
)

module.exports = model('InteriorDesign', constructionSchema)