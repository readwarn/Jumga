const express=require('express');
const router=express.Router();
const User=require('../models/user');
const Auth=require('../middleware/authware')

router.get('/currentUser',Auth.isLoggedIn,(req,res)=>{
    User.findById(req.user._id,function(err,foundUser){
        if(err){
            res.send('errr')
        }else{
            res.json(foundUser);
        }
    })
})

router.get('/',(req,res)=>{
    User.find({},(err,users)=>{
        if(err){
            return res.send('error');
        }else{
            res.json(users);
        }
    })
})

module.exports=router;