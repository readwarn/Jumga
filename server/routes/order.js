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
        path:'products',
        populate:{
            path:'id',
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
        path:'products',
        populate:{
            path:'id',
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
    console.log()
    Order.findById(req.params.orderID)
    .populate({
        path:'products',
        populate:{
            path:'id',
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
            let shopids=[];
            order.products.forEach((product,index) => {
                shopids.push(product.id.shop._id.toString());
                product.id.shop.balance+= product.id.price * product.quantity * 0.975;
                if(index===0 || !shopids.includes(product.id.shop._id.toString())){
                    product.id.shop.save();
                }
                product.id.qty=product.id.qty - product.quantity;
                product.id.save();
            });
            order.save();
            res.json(order);
        }  
    })
})


module.exports=router;

