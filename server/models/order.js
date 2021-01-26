const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const orderSchema=new Schema({
    items:[
     {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item'
    }],
    date:Date,
    status:String,
    delivered:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    address:String,
    country:String
})

module.exports=mongoose.model('Order',orderSchema);