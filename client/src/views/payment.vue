<template>
   <div class="payment-container">
          <nav>
              <h3>Jumga</h3>
          </nav>
          <loader v-if="gettingShop" />
          <p>{{error}}</p>
          <p class="info">You are required to pay a token of <span>{{mid}}{{amount}}</span> for your account to be approved</p>
          <img id="banner" src="../assets/payment.svg" alt="payment">
          <label for="cc">Change country</label>
          <select id="cc" v-model="country" @change="calc()">
              <option value="ngn">Nigeria</option>
              <option value="ghs">Ghana</option>
              <option value="kes">Kenya</option>
          </select>
          <img v-if="loading" id="load" src="https://s2.svgbox.net/loaders.svg?ic=tail-spin" height="30" width="30" alt="updating">
          <button v-if="!loading" @click="makePayment()">Proceed with payment</button>
          <button @click="$router.push('/shops/myShop')">Go back home</button>
   </div>
</template>

<script>
import loader from '../components/loader.vue';
export default {
      name:"Payment",
      components:{loader},
      data(){
          return{ 
            country:'NGN',
            gettingShop:true,
            email:'yusufmosobalaje@gmail.com',
            loading:false,
            amount:8000,
            error:"",
            country:'ngn',
            mid:'₦',
            shop:''
          }
      },
      methods:{
          calc(){
              // decides currency for payment charge
              // decides the currency symbol too
              if(this.country==='ngn'){
                  this.amount=8000;
                  this.mid='₦';
                  this.country='ngn';
              }
              else if(this.country==='ghs'){
                  this.amount=100;
                  this.mid='₵'
                  this.country='ghs';
              }else{
                  this.amount=2200;
                  this.mid='K'
                  this.country='kes';
              }
          },
          makePayment(){
                // wow Nigeria currency is soooo poor
               this.loading=true;
               const payment = {
                   "amount":this.amount,
                   "country":this.country,
                   "email":this.email,
               }
              this.$http.post(`flutter/approval/${this.$route.params.id}`,payment)
             .then(res=>{
                 if(res.data.status==="success"){
                      window.location.href = res.data.data.link;
                 }
                 this.error='error making payment';
                 this.loading=false;
             })
          }
      },
      created(){
            this.$http.get('auth/status')
           .then(res=>{
               if(!res.data.loggedIn){
                 this.$router.push('/seller/login');
               }else{
                  this.$http.get('shops/myShop')
                 .then(res=>{
                     this.gettingShop=false;
                     this.shop=res.data;
                     if(this.shop.isApproved){
                         this.$router.push('/shops/myShop');
                     }
                 })
               }
           })
      }
}
</script>

<style scoped>
        div.payment-container{
            height: 100%;
            overflow: hidden;
        }
        nav{
        padding: 10px 50px;
        margin-bottom: 10px;
        box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #ffffff;
    }
    h3{
        color: #005B94;
        font-size: 2rem;
        line-height: 130%;
    }
    img#banner{
        width: 60%;
        height: 25%;
        display: block;
        margin: 30px auto;
    }
    p.info{
        font-size: 1.2rem;
        line-height: 128%;
        width: 60%;
        text-align: center;
        color: #00253C;
        margin: 85px auto 0px auto;
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
    select,input{
        height: 40px;
        width: 30%;
        padding: 10px;
        display: block;
        margin: auto;
        margin-bottom: 20px;
        background: #F2F2F2;
        color: #00253C;
        outline:none;
        border: none;
    }
    button:hover{
         box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    }
    label{
        font-size: 0.85rem;
        width: 30%;
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
        div.payment-container{
            overflow: scroll;
            padding-bottom: 20px;
        }
        p.info{
            font-size: 1rem;
        }
        img#banner{
            height: 33%;
        }
        select,input,label{
            width: 80%;
        }
        label{
            font-size: 0.8rem;
        }
        nav{
            padding: 10px 15px;
            margin-bottom: 10px;
        }
    }
</style>