const express=require('express');
const router=express.Router();
const Order=require('../models/order');
const Auth = require('../middleware/authware')

router.get('/:cc/myOrder',Auth.isLoggedIn,(req,res)=>{
    Order.find({
        country:req.params.cc,
        owner:req.user._id
    })
    .populate({
        path:'items',
        populate:{
            path:'product',
            populate:{
                path:'shop',
                model:'Shop'
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

router.delete('/:orderID',Auth.isLoggedIn,Auth.isItYours(Order,'orderID'),(req,res)=>{
    Order.findByIdAndDelete(req.params.orderID,function(err,deletedOrder){
        if(err){
            return res.send('error');
        }else{
            res.json(deletedOrder);
        }
    })
})

router.get('/:orderID',(req,res)=>{
    Order.findById(req.params.orderID)
    .populate({
        path:'items',
        populate:{
            path:'product',
            populate:{
                path:'shop',
                model:'Shop'
            }
        }
    })
    .exec(function(err,order){
        if(err){
             return res.send('error');
        }else{
            res.json(order);
        }
    })
})

router.put('/:orderID',Auth.isLoggedIn,Auth.isItYours(Order,'orderID'),(req,res)=>{
    console.log('logedin? ',req.isAuthenticated())
    Order.findById(req.params.orderID)
    .populate({
        path:'items',
        populate:{
            path:'product',
            populate:{
                path:'shop',
                model:'Shop'
            }
        }
    })
    .exec(function(err,order){
        if(err){
            return res.send('error');
        }else{
            order.status='Paid';
            // The quantity of each product in the order is updated (reduced according to units ordered). And the seller account balance is updated too.
            order.items.forEach((item,index) => {
                item.product.shop.balance+= item.product.price * item.quantity * 0.975;
                item.product.qty=item.product.qty - item.quantity;
                item.product.save();
                if (index === (order.items.length-1)){
                  item.product.shop.save();
                }
            });
            order.save();
            res.json(order);
        }  
    })
})

module.exports=router;

