const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const cartSchema=new Schema({
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item'
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    country:String
})

module.exports=mongoose.model('Cart',cartSchema);