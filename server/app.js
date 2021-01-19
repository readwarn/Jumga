const express = require('express');
const dot =require('dotenv');
dot.config();
const bodyParser=require('body-parser');
const passport=require('passport');
const mongoose=require('mongoose');
const auth=require('./routes/auth');
const order=require('./routes/order');
const cart=require('./routes/cart');
const item=require('./routes/item');
const user=require('./routes/user');
const shop=require('./routes/shop');
const flutter=require('./routes/flutter');
const product=require('./routes/product');
const app = express();
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false});
mongoose.connection.on('connected', function(){
  console.log('connected to DB');
});
mongoose.connection.on('error', function(){console.log('eror')})
.then(() => {
   
})
.catch(err => { 
  console.error('App starting error:', err.stack);
  process.exit(1);
});
app.use(bodyParser.json());
app.set('trust proxy', 1)
app.use(require('express-session')({
  secret:'hello circuit world',
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge: 24 * 60 * 60 * 1000,
    sameSite:"lax",
    // secure:true
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.get('/',(req,res)=>{
     res.send('home');
})

app.use('/orders', order);
app.use('/carts', cart);
app.use('/items', item);
app.use('/products',product);
app.use('/users', user);
app.use('/flutter', flutter);
app.use('/auth', auth);
app.use('/shops', shop);


app.listen(3000,function(){
    console.log('server running on port 3000');
});