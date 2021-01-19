const User = require('../models/user');
const Shop = require('../models/shop');


module.exports={
    isLoggedIn:(req,res,next)=>{
        if(!req.isAuthenticated()) {
            res.json({
                isLoggedIn:false,
            });
        }
        else{
            return next();
        }
    },
   isSeller:(req,res,next)=>{
       User.findOne({username:req.body.username},function(err,user){
           if(!user || !user.isSeller){
                res.json({
                    isSeller:false,
                });
           }else{
                return next();
           }
       })
   },
   isItYours:(item,id)=>{
        return (req,res,next)=>{
            item.findById(req.params[id],function(err,foundItem){
                if(err){
                    res.send('error');
                }else{
                if(foundItem.owner.equals(req.user._id)){
                    return next();
                }
                else{
                    res.send('You cant edit whats not yours');
                }
                }
            })
         }
   },
   areYouApproved:(req,res,next)=>{
       Shop.findOne({owner:req.user._id},function(err,foundShop){
           if(err){
               res.json({
                   approved:false
               })
           }else{
               if(foundShop.isApproved){
                   return next();
               }else{
                   res.json({
                       approved:false
                   })
               }
           }
       })
   }
}