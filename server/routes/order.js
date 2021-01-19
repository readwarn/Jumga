var express=require('express');
var router=express.Router();
var Order=require('../models/order');
const Auth = require('../middleware/authware')

router.post('/',(req,res)=>{
    Order.create(req.body.order,function(err,newOrder){
        if(err){
            res.send('erorr');
        }else{
            newOrder.owner=req.user._id;
            newOrder.save();
            res.json(newOrder);
        }
    })
})

router.get('/:cc/myOrder',(req,res)=>{
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
            res.send('error');
        }else{
            res.json(foundOrder);
        }
    })
})

router.delete('/:orderID',Auth.isItYours(Order,'orderID'),(req,res)=>{
    Order.findByIdAndDelete(req.params.orderID,function(err,deletedOrder){
        if(err){
            res.send('error');
        }else{
            res.json(deletedOrder);
        }
    })
})



module.exports=router;

