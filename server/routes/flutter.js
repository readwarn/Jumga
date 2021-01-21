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
        res.json(response.data);
    })
    .catch(err=>{
        res.json(err.message);
    })
})

router.post('/subaccounts',(req,res)=>{
     axios.post('https://api.flutterwave.com/v3/subaccounts',req.body)
    .then(response=>{
        if(response){
            res.json(response.data);
        }else{
            res.json({
                status:"error",
                message:'error no reponse'
            });
        }
    })
    .catch((error) => {
        if(error){
            res.json(error.response.data);
        }else{
            res.json({
                status:"error",
                message:'erorr no erorr message'
            });
        }
    });
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
                        "tx_ref":`"ref${ref}"`,
                        "amount":`"${req.body.amount}"`,
                        "subaccounts":`"${req.body.subaccount}"`,
                        "currency":`"${req.body.country}"`,
                        "redirect_url":"https://priceless-hoover-4e3061.netlify.app/",
                        "payment_options":"card",  
                        "customer":{
                        "email":`"${req.user.email}"`,
                        "phonenumber":"0802344528",
                        "name":`"${req.user.username}"`
                        },
                        "customizations":{
                        "title":"Jumga Payments",
                        "description":"Order payment",
                        "logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTzdZrEq6KW91xIEdiMZYXni9GfHo9pFFIAg&usqp=CAU"
                        }
                    }    
                 }
                 axios.post('https://api.flutterwave.com/v3/payments',pay)
                .then(response=>{
                    if(response){
                        res.json({
                            flutterData:response.data,
                            ref:ref
                        });
                    }else{
                        res.json({
                            status:"error",
                            message:'Error Occured'
                        });
                    }
                })
                .catch(err=>{
                    if(err){
                        res.json(err.message);
                    }else{
                        res.json({
                            status:"error",
                            message:'Error Occured'
                        });
                    }
                })

    }) //end of payment creation
})

router.post('/approval/pay',(req,res)=>{
    let pay={}; let ref=''; let payload={
          amount:100,
          country:'NG'
    };
    Payment.create({
          for:'Approval',
          amount:req.body.amount,
          paidBy:req.user._id,
          date:Date.now()
        }
        ,function(err,newPayment){
        if(err){
            return res.send('err');
        }else{
           ref=newPayment._id.toString();
             
    }
    console.log(req.user.username);
    const amt=200; const cc='NGN'; 
    axios.post('https://api.flutterwave.com/v3/payments',
    {
        "tx_ref":"hooli-tx-1920bddddbtytty",
        "amount":`${amt}`,
        "currency":`${cc}`,
        "redirect_url":"https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
        "payment_options":"card",
        "customer":{
           "email":`${req.user.email}`,
           "phonenumber":"07066741302",
           "name":`${req.user.username}`
        },
        "customizations":{
           "title":"Jumga Payments",
           "description":"Pay your store approval fee and start enjooying Jumga seamless services",
           "logo":"https://s2.svgbox.net/hero-outline.svg?color=219653&ic=shopping-bag"
        }
     })
    .then(response=>{
        if(response){
            res.json({
                flutterData:response.data,
                ref:ref
            });
        }
        else{
            res.json({
                status:"error",
                message:'Error occured'
            });
        }
    })
    .catch(err=>{
        if(err){
            res.json({
                err:err,
                status:"error",
                message:err.message
            });
        }else{
            res.json({
                status:"error",
                message:'Error occured'
            });
        }
    });
   
    })//end of payment ceation 

})


module.exports=router;