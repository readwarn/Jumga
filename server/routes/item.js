const express=require('express');
const router=express.Router();
const Item=require('../models/item');
const Cart=require('../models/cart');
const Auth=require('../middleware/authware');


router.put('/:itemID',Auth.isLoggedIn,Auth.isItYours(Item,'itemID'),(req,res)=>{
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
           uptadedItem.quantity=uptadedItem.quantity + req.body.increment;
           uptadedItem.save();
           res.json(uptadedItem);
       }
   })
})

router.get('/:productID',(req,res)=>{
    Item.findOne({product:req.params.productID})
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
        shop:req.body.shop,
        quantity:req.body.units
    },function(err,item){
        if(err){
            return res.send('error');
        }else{
            Item.findById(item._id,(err,popitem)=>{
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
    Item.findById(req.params.itemID,(err,foundItem)=>{
          if(err){
              return res.send('error');
          }else{
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
                    console.log('fo') 
                    foundCart.items.forEach((item,index)=>{
                         if(foundItem._id.equals(item._id)){
                            console.log('fOUNDitem ',item, ' index ',index);
                            foundCart.items.splice(index,1);
                            foundCart.save();   
                         }
                    })  
                    res.json(foundCart);
                 }
             })
          }
    })
})

module.exports=router;