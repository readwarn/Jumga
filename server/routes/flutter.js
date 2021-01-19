const express=require('express');
const router=express.Router();
const axios = require('axios');
const Payment = require('../models/payment');
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer FLWSECK-dc89177da0b292ff069cf0011a74ada3-X`

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
        res.json(response.data);
    })
    .catch(err=>{
        res.json(err.message);
    })
})

router.post('/subaccounts',(req,res)=>{
    axios.post('https://api.flutterwave.com/v3/subaccounts',req.body)
    .then(response=>{
        res.json(response.data);
    })
    .catch(err=>{
        res.json(err.message);
    })
})

router.post('/pay',(req,res)=>{
    pay = {
        tx_ref:'hhdhhdbhdhh',
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
    axios.post('https://api.flutterwave.com/v3/payments',pay)
    .then(response=>{
        res.json(response.data);
    })
    .catch(err=>{
        res.json(err.message);
    })
})

router.post('/approval/pay',(req,res)=>{
    let txref; let pay;
  
    Payment.create(req.body,function(err,newPayment){
        if(err){
            return res.send('err');
        }else{
           newPayment.paidBy=req.user._id;
           txref=newPayment._id;
    pay = {
            tx_ref:'hhdhhdbhdhh',
            amount:"100",
            currency:"NGN",
            redirect_url:"https://priceless-hoover-4e3061.netlify.app/",
            payment_options:"card",
            customer:{
               email:req.user.username,
               phonenumber:"07066741320",
               name:req.user.username
            },
            customizations:{
               title:"Approval Payment",
               description:"Pay your Jumga approval fee to enjoy of top tier service",
               logo:"https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c3RvcmV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
            }
        }
    }      
     //end of payment ceation  
    
    })

    axios.post('https://api.flutterwave.com/v3/payments',pay)
    .then(response=>{
        res.json(response.data);
    })
    .catch(err=>{
        res.json(err.message);
    })
})


module.exports=router;