const express=require('express');
const router=express.Router();
const Shop=require('../models/shop');
const Product = require('../models/product');
const Item = require('../models/item');
const Auth=require('../middleware/authware');

router.get('/myShop',Auth.isLoggedIn,(req,res)=>{
     Shop.findOne({owner:req.user._id})
     .populate([
         {
           path:'products',
           model:'Product'
         },
         {
           path:'owner',
           model:'User'
         }
     ])
    .exec(function(err,foundShop){
        if(err){
            return res.send('error');
        }else{
            res.json(foundShop);
        }
    })
});

router.put('/:shopID',Auth.isLoggedIn,Auth.isItYours(Shop,'shopID'),Auth.areYouApproved,(req,res)=>{
    Shop.findById(req.params.shopID)
    .populate([
        {
          path:'product',
          model:'Product'
        },
        {
          path:'owner',
          model:'User'
        }
    ])
    .exec(function(err,foundShop){
        if(err){
            res.send('error');
        }else{
            Product.create(req.body,function(err,newProduct){
                if(err){
                    return res.send('err');
                }else{
                    newProduct.shop=foundShop._id;
                    newProduct.owner=req.user._id;
                    newProduct.save();
                    foundShop.products.push(newProduct);
                    foundShop.save();
                }
            })
            res.json(foundShop);
        }
    })
})

router.put('/:shopID/approve',Auth.isLoggedIn,Auth.isItYours(Shop,'shopID'),(req,res)=>{
    Shop.findOne({owner:req.user._id})
    .populate([
        {
          path:'product',
          model:'Product'
        },
        {
          path:'owner',
          model:'User'
        }
    ])
    .exec(function(err,foundShop){
        if(err){
            return res.send('err');
        }else{
            foundShop.isApproved=true;
            foundShop.save();
            res.json(foundShop);
        }
    })
})


module.exports=router;