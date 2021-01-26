const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const shopSchema=new Schema({
    name:String,
    description:String,
    address:String,
    phone:String,
    country:String,
    isApproved:{
        type:Boolean,
        default:false
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
    accountID:String,
    balance:Number,  
    owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }
})

module.exports=mongoose.model('Shop',shopSchema);