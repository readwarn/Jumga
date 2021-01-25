const express=require('express');
const router=express.Router();
const Cart=require('../models/cart');
const Item=require('../models/item');
const Auth = require('../middleware/authware');

router.get('/:cc/myCart',Auth.isLoggedIn,(req,res)=>{
      Cart.findOne({owner:req.user._id,country:req.params.cc})
     .populate(
        {
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
        },
    )
    .exec(function(err,foundCart){
      if(err){
          res.send('err');
      }else{
          res.json(foundCart);
      }
    })
})

router.put('/:cartID',Auth.isLoggedIn, Auth.isItYours(Cart,'cartID'),(req,res)=>{
    Cart.findById(req.params.cartID,(err,foundCart)=>{
        if(err){
            return res.send();
        }else{
            Item.create({
                owner:req.user._id,
                product:req.body.product._id,
                shop:req.body.product.shop._id,
                country:req.body.product.country,
                quantity:req.body.increment
            },function(err,newitem){
                if(err){
                    return res.send('error');
                }else{
                    foundCart.items.push(newitem);
                    Cart.populate(foundCart, {path:"items",populate:[{path:"product",model:"Product"},{path:"shop",model:"Shop"}]}, function(err, foundcart) {
                        if(err){
                            return res.send('error');
                        }else{
                            foundcart.save();
                            res.json(foundcart);
                        }
                    });
                }
            })
        }
                
    })
})

router.delete('/:itemID',Auth.isLoggedIn,Auth.isItYours(Item,'itemID'),(req,res)=>{
    Item.findByIdAndDelete(req.params.itemID,function(err,deletedItem){
        if(err){
            res.send('error');
        }else{
            Cart.findOne({owner:req.user._id})
                .populate(
                    {
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
                    },
                )
                .exec(function(err,foundCart){
                if(err){
                    res.send('error');
                }else{
                    foundCart.save();
                    res.json(foundCart);
                }
            })
        }
    })
});

router.delete('/emptyCart/:cartID',Auth.isLoggedIn,Auth.isItYours(Cart,'cartID'),(req,res)=>{
     Cart.findById(req.params.cartID)
     .populate(
        {
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
        },
      )
     .exec(function(err,foundCart){
         if(err){
             return res.send('error');
         }else{
             foundCart.items.forEach(item => {
                 Item.findByIdAndDelete(item._id,function(err,deletedItem){
                      if(err){
                           return res.send('error');
                      }
                 })
             });
             foundCart.save();
             res.json(foundCart);
         }
     })
})

module.exports=router;

