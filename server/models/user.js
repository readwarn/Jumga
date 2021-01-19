const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    username:String,
    password:String,
    isSeller:Boolean,
})

module.exports=mongoose.model('User',userSchema);
