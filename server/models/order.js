const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const orderSchema=new Schema({
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    date:Date,
    open:Boolean,
    status:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    address:String,
    country:String
})

module.exports=mongoose.model('Order',orderSchema);