const express=require('express');
const router=express.Router();
const Product=require('../models/product');
const Shop=require('../models/shop');
const Item=require('../models/item');
const Auth=require('../middleware/authware');

router.get('/:cc',(req,res)=>{
     Product.find({country:req.params.cc})
    .populate([
        {
            path:'owner',
            model:'User' 
        },
        {
            path:'shop',
            model:'Shop'
        }
    ])
    .exec(function(err,products){
        if(err){
            res.send('error');
        }else{
            res.json(products);
        }
    });
});

router.get('/my/products',Auth.isLoggedIn,(req,res)=>{
    Product.find({owner:req.user._id})
    .populate([
        {
            path:'owner',
            model:'User' 
        },
        {
            path:'shop',
            model:'Shop'
        }
    ])
    .exec(function(err,products){
          if(err){
              res.send('error');
          }else{
              res.json(products);
          }
    })
})

router.post('/',Auth.isLoggedIn,Auth.areYouApproved,(req,res)=>{
    Product.create(req.body)
    .populate([
        {
            path:'owner',
            model:'User' 
        },
        {
            path:'shop',
            model:'Shop'
        }
    ])
    .exec(function(err,product){
        if(err){
            res.send('error')
        }else{   
        Shop.findOne({owner:req.user._id},function(err,shop){
                 if(err){
                     return res.send(err);
                 }else{
                     product.shop=shop._id;
                     product.owner=req.user._id;
                     product.save();
                     res.json(product);
                 }
             })
          
        }
    })
})

router.get('/this/:productID',(req,res)=>{
    Product.findById(req.params.productID)
    .populate([
        {
            path:'owner',
            model:'User' 
        },
        {
            path:'shop',
            model:'Shop'
        }
    ])
    .exec(function(err,product){
        if(err){
            res.send('error');
        }
        else{
            res.json(product);
        }
    })
})

router.put('/:productID',Auth.isLoggedIn,Auth.isItYours(Product,'productID'),(req,res)=>{
       Product.findById(req.params.productID)
      .populate([
        {
            path:'owner',
            model:'User' 
        },
        {
            path:'shop',
            model:'Shop'
        }
      ])
      .exec(function(err,foundProduct){
          if(err){
              res.send('error finding prooduct');
          }else{
              foundProduct.qty=req.body.qty;
              foundProduct.save();
              res.json(foundProduct);
          }
      })
})

router.delete('/:productID',Auth.isItYours(Product,'productID'),(req,res)=>{
    Product.findByIdAndDelete(req.params.productID)
    .populate([
        {
            path:'owner',
            model:'User' 
        },
        {
            path:'shop',
            model:'Shop'
        }
    ])
    .exec(function(err,deletedProduct){
        if(err){
            res.send('error')
        }else{
            res.json(deletedProduct);
        }
    })
})

module.exports=router;

