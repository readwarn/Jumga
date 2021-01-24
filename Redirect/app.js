const express = require('express');
const axios = require('axios');
const dot =require('dotenv');
dot.config();
axios.defaults.headers.common['Authorization'] = process.env.SECRET_KEY_TEST;

const app = express();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

  app.get('/flutter/verify/:paymentID',(req,res)=>{
    axios.get(`https://api.flutterwave.com/v3/transactions/${req.params.paymentID}/verify`)
    .then(response=>{
          if(response){
              res.json(response.data);
          }
    })
    .catch(err=>{
       if(err){
           res.json(err.response.data);
       }
    })
})

app.listen(3001,function(){
    console.log('redirect server running');
});