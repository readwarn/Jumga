var express=require('express');
var router=express.Router();
var Product=require('../models/product');
var Shop=require('../models/shop');
var Auth=require('../middleware/authware');

router.get('/:cc',(req,res)=>{
     Product.find({country:req.params.cc})
    .populate('owner')
    .exec(function(err,products){
        if(err){
            res.send('error');
        }else{
            res.json(products);
        }
    });
});

router.get('/my/products',Auth.isLoggedIn,Auth.areYouApproved,(req,res)=>{
    Product.find({owner:req.user._id},function(err,products){
          if(err){
              res.send('error');
          }else{
              res.json(products);
          }
    })
})

router.post('/',Auth.isLoggedIn,(req,res)=>{
    Product.create(req.body,function(err,product){
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

router.get('/:productID',(req,res)=>{
    Product.findById(req.params.productID)
    .populate('shop')
    .exec(function(err,product){
        if(err){
            res.send('error');
        }
        else{
            res.json(product);
        }
    })
})

router.put('/:productID',Auth.isItYours(Product,'productID'),(req,res)=>{
      Product.findById(req.params.productID,function(err,foundProduct){
          if(err){
              res.send('error');
          }else{
              foundProduct.qty=req.body.qty;
              foundProduct.save();
              res.json(foundProduct);
          }
      })
})

router.delete('/:productID',Auth.isItYours(Product,'productID'),(req,res)=>{
    Product.findByIdAndDelete(req.params.productID,function(err,deletedProduct){
        if(err){
            res.send('error')
        }else{
            res.json(deletedProduct);
        }
    })
})

module.exports=router;

