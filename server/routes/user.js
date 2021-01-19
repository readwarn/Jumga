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

module.exports=router;