const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const paymentSchema=new Schema({
    for:String,
    amount:Number,
    paidBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    date:Date
})

module.exports=mongoose.model('Payment',paymentSchema);