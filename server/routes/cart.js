const express=require('express');
const router=express.Router();
const Cart=require('../models/cart');
const Item=require('../models/item');
const Auth = require('../middleware/authware');


router.post('/',(req,res)=>{
    Cart.create({
      country:'NG',
      owner:req.user._id,
    },function(err,cart){
        res.json(cart);
    })
})


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

router.put('/:cartID/:itemID',Auth.isLoggedIn, Auth.isItYours(Cart,'cartID'),(req,res)=>{
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
        }
        else{
           //push a new item into the cart
           // Check if the item is in the cart already
           let found=false;
           foundCart.items.forEach(item => {
               if(item._id.equals(req.body._id)){
                   found=true;
               }
           });
    
           Item.findById(req.params.itemID,function(err,foundItem){
               if(err){
                   res.send('error')
               }else{
                   foundItem.quantity=foundItem.quantity + req.body.quantity;
                   foundItem.save();
                   if(!found){
                        foundCart.items.push(foundItem);
                        foundCart.save();
                   }
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
                    foundCart.items.pop(deletedItem);
                    foundCart.save();
                    res.json(foundCart);
                }
            })
        }
    })
});

module.exports=router;

