<template>
   <div class="payment-container" v-if="!loading">
          <nav>
              <h3>Jumga</h3>
          </nav>
          <loader v-if="loading" />
          <img src="../assets/payment.svg" alt="payment">
          <p class="info">You are required to pay a token of ₦8,000 for your account to be approved</p>
          <button @click="makePayment()">Proceed with payment</button>
          <button @click="$router.push('/shops/myShop')">Go back home</button>
   </div>
</template>

<script>
import Loader from '../components/loader.vue';
export default {
      name:"Payment",
      components:{
       Loader
      },
      data(){
          return{ 
            loading:true, 
            payment:{
                amount:20,
                for:'Approval of store',
                date:Date.now(),
            }
          }
      },
      methods:{
          makePayment(){
             this.$http.post('http://localhost:3000/flutter/approval/pay',this.payment)
             .then(res=>{

             })
          }
      },
      created(){
            this.$http.get('http://localhost:3000/auth/status')
           .then(res=>{
               if(!res.data.loggedIn){
                 this.$router.push('/seller/login');
               }else{
                   this.$http.get('http://localhost:3000/users/currentUser')
                   .then(res=>{
                       this.loading=false;
                   })
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
    img{
        width: 60%;
        height: 50%;
        display: block;
        margin: auto;
    }
    p.info{
        font-size: 1.1rem;
        line-height: 128%;
        width: 60%;
        text-align: center;
        color: #00253C;
        margin: auto;
        margin-bottom: 15px;
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
    button:hover{
         box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    }

    @media only screen and (max-width: 720px) {
        p.info{
            width: 75%;
        }
        img{
            height: 43%;
        }
        nav{
            padding: 10px 15px;
            margin-bottom: 10px;
        }
    }
</style>