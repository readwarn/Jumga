const express=require('express');
const router=express.Router();
const Item=require('../models/item');
const Auth=require('../middleware/authware');

router.put('/:itemID',Auth.isItYours(Item,'itemID'),(req,res)=>{
   Item.findById(req.params.itemID)
    .populate([
        {
          path:'product',
          model:'Product'
        },
        {
           path:'shop',
           model:'Shop'
        }
    ])
    .exec(function(err,uptadedItem){
       if(err){
           return res.send('error');
       }else{
           uptadedItem.quantity=req.body.quantity;
           uptadedItem.save();
           res.json(uptadedItem);
       }
   })
})

router.get('/product/:productID',(req,res)=>{
    Item.findOne({product:req.params.productID})
    .populate([
        {
          path:'product',
          model:'Product'
        },
        {
           path:'shop',
           model:'Shop'
        }
    ])
    .exec(function(err,foundItem){
        if(err){
            return res.send('err');
        }else{
            res.json(foundItem);
        }
    })
})

module.exports=router;