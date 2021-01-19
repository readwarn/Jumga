const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const productSchema=new Schema({
    name:String,
    description:String,
    price:Number,
    category:String,
    delivery:Number,
    displayPicture:String,
    qty:Number,
    country:String,
    owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    },
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shop'
    },
})

module.exports=mongoose.model('Product',productSchema);