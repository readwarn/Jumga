const express=require('express');
const router=express.Router();
const axios = require('axios');
const Payment = require('../models/payment');
const Auth =require('../middleware/authware');
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = process.env.SECRET_KEY_LIVE;

router.get('/banks/:code',(req,res)=>{
    axios.get(`https://api.flutterwave.com/v3/banks/${req.params.code}`)
    .then(result=>{
       res.json(result.data);
    })
    .catch(err=>{
        res.json(err.message);
    })
});

router.post('/accounts/verify',(req,res)=>{     
    axios.post('https://api.flutterwave.com/v3/accounts/resolve',req.body)
    .then(response=>{
        console.log(response);
        res.json(response.data);
    })
    .catch(err=>{
        res.json(err.message);
    })
})

router.post('/subaccounts',(req,res)=>{
    axios.post('https://api.flutterwave.com/v3/subaccounts',req.body)
    .then(response=>{
        res.send('OKEY');
        return console.log(response);
    })
    .catch((error) => console.log(error));
})

router.post('/pay',Auth.isLoggedIn,(req,res)=>{
    let pay={}; let ref='';
    Payment.create({
            for:"Order",
            amount:req.body.amount,
            paidBy:req.user._id,
            date:Date.now()
         }
        ,function(err,newPayment){
         if(err){
             return res.send('error');
         }else{
             newPayment.paidBy=req.user._id;
             newPayment.save();
             ref=newPayment._id.toString();
                    pay = {
                            tx_ref:newPayment._id.toString(),
                            amount:req.body.amount,
                            subaccounts:req.body.subaccount,
                            currency:req.body.country,
                            redirect_url:"https://priceless-hoover-4e3061.netlify.app/",
                            payment_options:"card",
                            customer:{
                            email:req.user.username,
                            phonenumber:"07066741320",
                            name:req.user.username
                            },
                            customizations:{
                            title:"Order Payment",
                            description:"Your order will be shipped as soon as payment is confirmed",
                            logo:"https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c3RvcmV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
                            }
                        }    
                 }
                console.log(pay);
                axios.post('https://api.flutterwave.com/v3/payments',pay)
                .then(response=>{
                    res.json({
                        flutterData:response.data,
                        ref:ref
                    });
                })
                .catch(err=>{
                    res.json(err.message);
                })

    }) //end of payment creation
})

router.post('/approval/pay',(req,res)=>{
    let pay={}; let ref='';
  
    Payment.create({
          for:'Approval',
          amount:req.body.amount
        }
        ,function(err,newPayment){
        if(err){
            return res.send('err');
        }else{
           newPayment.paidBy=req.user._id;
           newPayment.save();
           ref=newPayment._id.toString();
    pay = {
            tx_ref:ref,
            amount:req.body.amount,
            currency:req.body.country,
            redirect_url:"https://priceless-hoover-4e3061.netlify.app/",
            payment_options:"card",
            customer:{
               email:req.body.email,
               phonenumber:"07066741320",
               name:req.user.username
            },
            customizations:{
               title:"Approval PaymenT",
               description:"Pay your Jumga approval fee to enjoy of top tier service",
               logo:"https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c3RvcmV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
            }
        }
    }
    console.log(pay.currency, typeof pay.currency);
    axios.post('https://api.flutterwave.com/v3/payments',pay)
    .then(response=>{
        res.json({
            flutterData:response.data,
            ref:ref
        });
    })
    .catch(err=>{
        res.json(err.message);
    });
    })//end of payment ceation 

})


module.exports=router;