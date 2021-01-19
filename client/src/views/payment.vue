<template>
   <div class="payment-container">
          <nav>
              <h3>Jumga</h3>
          </nav>
          <img id="banner" src="../assets/payment.svg" alt="payment">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="email">
          <label for="cc">Change country</label>
          <select id="cc" v-model="country" @change="calc()">
              <option value="NG">Nigeria</option>
              <option value="GH">Ghana</option>
              <option value="KE">Kenya</option>
          </select>
          <p class="info">You are required to pay a token of <span>{{mid}}{{amount}}</span> for your account to be approved</p>
          <img v-if="loading" id="load" src="https://s2.svgbox.net/loaders.svg?ic=tail-spin" height="30" width="30" alt="updating">
          <button v-if="!loading" @click="makePayment()">Proceed with payment</button>
          <button @click="$router.push('/shops/myShop')">Go back home</button>
   </div>
</template>

<script>
export default {
      name:"Payment",
      data(){
          return{ 
            country:'NG',
            email:'yusufmosobalaje@gmail.com',
            loading:false,
            amount:8000,
            country:'NG',
            mid:'₦',
          }
      },
      methods:{
          calc(){
              if(this.country==='NG'){
                  this.amount=8000;
                  this.mid='₦';
                  this.country='NG';
              }
              else if(this.country==='GH'){
                  this.amount=100;
                  this.mid='₵'
                  this.country='GH';
              }else{
                  this.amount=2200;
                  this.mid='K'
                  this.country='KE';
              }
          },
          makePayment(){
                // wow Nigeria cuurency is soooo poor
               this.loading=true;
               const payment = {
                   amount:this.amount,
                   country:this.country,
                   email:this.email,
               }
               console.log(payment);
              this.$http.post('http://localhost:3000/flutter/approval/pay',payment)
             .then(res=>{
                 console.log(res.data);
                 window.location.href = res.data.flutterData.data.link;
                this.loading=false;
             })
          }
      },
      created(){
            this.$http.get('http://localhost:3000/auth/status')
           .then(res=>{
               if(!res.data.loggedIn){
                 this.$router.push('/seller/login');
               }
           })
      }
}
</script>

<style scoped>
    div.payment-container{
        height: 100%;
    }
    nav{
        padding: 10px 50px;
    }
    h3{
        color: #005B94;
        font-size: 2rem;
        line-height: 130%;
    }
    img#banner{
        width: 60%;
        height: 30%;
        display: block;
        margin: auto;
    }
    p.info{
        font-size: 1.1rem;
        line-height: 128%;
        width: 60%;
        text-align: center;
        color: #00253C;
        margin: 25px auto;
    }
    P.info span{
        color: #219653;
    }
    button{
        height: 40px;
        width: 200px;
        background: #66C9FF;
        color: #ffffff;
        outline:none;
        border: none;
        display: block;
        margin: auto;
        margin-bottom: 15px;
    }
    option{
        outline: none;
        border: none;
    }
    select{
        height: 40px;
        width: 200px;
        padding: 10px;
        display: block;
        margin: auto;
        background: #F2F2F2;
        color: #00253C;
        outline:none;
        border: none;
    }
    button:hover{
         box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    }
    label{
        font-size: 1rem;
        text-align: center;
        display: block;
        margin: auto;
        margin-bottom: 7px;
    }
    img#load{
        display: block;
        margin: auto;
        margin-bottom: 2px;
    }

    @media only screen and (max-width: 720px) {
        p.info{
            width: 75%;
        }
        img#banner{
            height: 43%;
        }
        nav{
            padding: 10px 15px;
            margin-bottom: 10px;
        }
    }
</style>