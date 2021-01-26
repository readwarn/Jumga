const router=require('express').Router();
const passport=require('passport');
const User = require('../models/user');
const Cart = require('../models/cart');
const Shop = require('../models/shop');
const Authware = require('../middleware/authware');
const config=require('../config/auth_config');

router.post('/:seller/register', function (req,res,next){
     User.findOne({username:req.body.username}).then((user)=>{
         if(user){
           return res.json({message:'Username is already taken',loggedIn:false});
         }
         else{
           User.create({
                username:req.body.username,
                password:req.body.password,
                isSeller:req.params.seller==='seller',
                email:req.body.email
           },function(err,newUser){
             if(err){
               return res.send('error');
             }else{
              Cart.create({},function(err,newCart){
                if(err){
                  return res.send('error');
                }else{
                  newCart.owner=newUser._id;
                  newCart.country=req.body.country;
                  newCart.save();
                  newUser.save();
                }
                if(newUser.isSeller){
                    Shop.create({
                      name:req.body.shopname,
                      description:req.body.shopDescription,
                      phone:req.body.phone,
                      address:req.body.address,
                      country:req.body.country,
                      accountID:req.body.shopID,
                      balance:0,
                      owner:newUser._id
                    })
                }
              });
             }
            passport.authenticate('local', function(err, user, info) {
              if (err) { return next(err) }
              if (!user) {
                return res.json({ message: info.message, loggedIn:false })
              }
              req.login(user, function(err) {
                if (err) { return next(err); }
                return res.json({loggedIn:true});
              });
            })(req, res, next);
          })
         }
     });
})

router.post('/seller/login',Authware.isSeller,function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.json({ message: info.message, loggedIn:false })
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({loggedIn:req.isAuthenticated()});
    });
  })(req, res, next);
});

router.post('/buyer/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) {
        return res.json({ message: info.message, loggedIn:false })
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({loggedIn:req.isAuthenticated()});
      });
    })(req, res, next);
  });

  router.get('/status',(req,res)=>{
    res.json({
      loggedIn:req.isAuthenticated()
    });
  })

  router.get('/logout',(req,res)=>{
    req.logout();
    res.json({
      loggedIn:false
    })
  });

module.exports=router;