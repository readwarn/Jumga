var express=require('express');
var router=express.Router();
const Shop=require('../models/shop');
const Product = require('../models/product');
const Auth=require('../middleware/authware');

router.get('/myShop',Auth.isLoggedIn,(req,res)=>{
    Shop.findOne({owner:req.user._id})
    .populate({
        path:'products',
        model:Product
    })
    .exec(function(err,foundShop){
        if(err){
            return res.send('error');
        }else{
            res.json(foundShop);
        }
    })
});

router.put('/:shopID',Auth.isLoggedIn,Auth.isItYours(Shop,'shopID'),(req,res)=>{
    Shop.findById(req.params.shopID,function(err,foundShop){
        if(err){
            res.send('error');
        }else{
            Product.create(req.body,function(err,newProduct){
                if(err){
                    return res.send('err');
                }else{
                    foundShop.products.push(newProduct);
                    foundShop.save();
                }
            })
            res.json(foundShop);
        }
    })
})



module.exports=router;