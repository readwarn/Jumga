var express=require('express');
var router=express.Router();
const Item=require('../models/item');
const Auth=require('../middleware/authware')

router.put('/:itemID',Auth.isItYours(Item,'itemID'),(req,res)=>{
   Item.findByIdAndUpdate(req.params.itemID,req.body.item,function(err,uptadedItem){
       if(err){
           res.send('error');
       }else{
           res.json(uptadedItem);
       }
   })
})

module.exports=router;