const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxLength:[8,"price cannot be more than 99999999"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
            type:String,
            required:true 
        },
        url:{
            type:String,
            required:true 
        }
    }
    ],
    category:{
        type:String,
        required:[true,"please enter product category"]
    },
    Stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxLength:[4,"stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            Comment:{
                type:Number,
                required:true                
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})






module.exports = mongoose.model("Product",productSchema);