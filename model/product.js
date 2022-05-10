const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = Schema({
    name: {
        type: String,
        require: [true, "Name is required"]
    },
    description: {
        type: String,
        require: [true, "Description is required"]
    },
    price: {
        type: Number,
        require: [true, "Price is required"]
    },
    stock: {
        type: Number,
        default:0
    },
    sold: {
        type: Number,
        default:0
    },
    photos: [
        {
            id: {
                type: String
            },
            secure_url: {
                type: String
            }
        }],
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Seller'
    },
    ratings:{
        type:Number,
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:Schema.ObjectId,
                ref:'User',
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                default:''
            }
        }
    ]
});



module.exports = mongoose.model('Product', productSchema);