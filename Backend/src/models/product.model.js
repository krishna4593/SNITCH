import mongoose  from "mongoose";


const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        amount:{
            type:Number,
            required:true
        },

            currency:{
                type:String,
                required:true,
                enum:['INR', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'],
                default:'INR'
            }
        
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    images:[{
        ImageUrl:{
            type:String,
            required:true
        }
    }]

})

const productModel = mongoose.model('Product', productSchema);

export default productModel;

