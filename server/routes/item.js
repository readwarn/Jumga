const express=require('express');
const router=express.Router();
const Item=require('../models/item');
const Cart=require('../models/cart');
const Product=require('../models/product');
const Auth=require('../middleware/authware');
const product = require('../models/product');

router.put('/:itemID',Auth.isLoggedIn,Auth.isItYours(Item,'itemID'),(req,res)=>{
   Item.findById(req.params.itemID)
    .populate([
        {
          path:'product',
          populate:{
            path:'shop',
            model:'Shop'
           }
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

router.get('/:itemID',Auth.isItYours(Item,'itemID'),(req,res)=>{
    Item.findById(req.params.itemID)
    .populate([
        {
          path:'product',
          populate:{
            path:'shop',
            model:'Shop'
        }
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

router.post('/:productID',Auth.isLoggedIn,(req,res)=>{
    Item.create({
        owner:req.user._id,
        product:req.params.productID,
        shop:req.body._id
    },function(err,item){
        if(err){
            return res.send('error');
        }else{
            Item.findById(item._id).populate([
                {
                   path:'product',
                   populate:{
                       path:'shop',
                       model:'Shop'
                   }
                },
                {
                    path:'shop',
                    model:'Shop'
                }
            ]).exec((err,popitem)=>{
                if(err){
                   return res.send('err');
                }else{
                   res.json(popitem);
                }
            })
        }
    })
        
})

router.delete('/:itemID/:cartID',Auth.isLoggedIn,Auth.isItYours(Item,'itemID'),(req,res)=>{
    Item.findByIdAndDelete(req.params.itemID,(err,deletedItem)=>{
          if(err){
              return res.send('error');
          }else{
             Cart.findById(req.params.cartID)
             .populate({
                 path:'items',
                 model:'Item'
             })
             .exec(function(err,foundCart){
                 if(err){
                    return res.send('error');
                 }else{
                    foundCart.items.pop(deletedItem);
                    foundCart.save();
                    res.json(foundCart);
                 }
             })
          }
    })
})

module.exports=router;