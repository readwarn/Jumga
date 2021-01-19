const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const itemSchema=new Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shop'
    },
    country:String,
    quantity:Number
})

module.exports=mongoose.model('Item',itemSchema);