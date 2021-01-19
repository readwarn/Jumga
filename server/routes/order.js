const express=require('express');
const router=express.Router();
const Order=require('../models/order');
const Auth = require('../middleware/authware')

router.post('/',Auth.isLoggedIn,(req,res)=>{
    Order.create(req.body,function(err,newOrder){
        if(err){
            res.send('erorr');
        }else{
            newOrder.owner=req.user._id;
            newOrder.save();
            res.json(newOrder);
        }
    });
    req.body.cart.items.foreach(item=>{
        item.product.qty=item.product.qty - item.quantity;
        item.product.save();
    })

})

router.get('/:cc/myOrder',Auth.isLoggedIn,(req,res)=>{
    Order.find({
        country:req.params.cc,
        owner:req.user._id
    })
    .populate({
        path:'cart',
        populate:{
            path:'items',
            populate:{
                path:'product',
                model:'User'
            }
        }
    })
    .exec(function(err,foundOrder){
        if(err){
            return res.send('error');
        }else{
            res.json(foundOrder);
        }
    })
})

router.delete('/:orderID',Auth.isItYours(Order,'orderID'),(req,res)=>{
    Order.findByIdAndDelete(req.params.orderID,function(err,deletedOrder){
        if(err){
            return res.send('error');
        }else{
            res.json(deletedOrder);
        }
    })
})



module.exports=router;

