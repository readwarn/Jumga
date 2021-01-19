const express=require('express');
const router=express.Router();
const Cart=require('../models/cart');
const Item=require('../models/item');
const Auth = require('../middleware/authware');

router.get('/:cc/myCart',Auth.isLoggedIn,(req,res)=>{
     Cart.findOne({owner:req.user._id,country:req.params.cc})
    .populate({
        path:'items',
        populate:[
        {   
            path:'product',
            model:'Product'
        },
        {
            path:'shop',
            model:'Shop'
        }
    ]
    })
    .exec(function(err,foundCart){
      if(err){
          res.send('err')
      }else{
          res.json(foundCart)
      }
    })
})

router.put('/:cartID',Auth.isLoggedIn, Auth.isItYours(Cart,'cartID'),(req,res)=>{
    Cart.findById(req.params.cartID,function(err,foundCart){
        if(err){
            res.send('error');
        }
        else{
           //push a new item into the cart
           Item.create(req.body,function(err,newItem){
               if(err){
                   res.send('error')
               }else{
                   newItem.owner=req.user._id;
                   newItem.save();
                   foundCart.items.push(newItem);
                   foundCart.save();
                   res.json(foundCart);
               }
           }) 
        }
    })
})

router.delete('/:itemID',Auth.isItYours(Item,'itemID'),(req,res)=>{
    Item.findByIdAndDelete(req.params.itemID,function(err,deletedItem){
        if(err){
            res.send('error');
        }else{
            Cart.findOne({owner:req.user._id},function(err,foundCart){
                if(err){
                    res.send('errro');
                }else{
                    foundCart.items.pop(deletedItem);
                    foundCart.save();
                }
            })
        }
    })
})


module.exports=router;

