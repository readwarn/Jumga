<template>
     <div class="approval-container" id="app">
        <div class="loader" v-if="verifying">
             <img src="https://s2.svgbox.net/loaders.svg?ic=elastic-spinner" width="38" height="38" alt="loading">
             <p>Verifying payment</p>
        </div>
        <nav> 
            <a href="http://localhost:8080"><h3>Jumga</h3></a>
        </nav>
        <div class="success feedback" v-if="!failure && !verifying">
            <p class="info">Your payment was succesful and your order will be shipped soon.</p>
            <img src="../assets/dispatch.svg" alt="ok">
            <router-link :to="{name:'Market', params:{id:param}}"><button>Continue Shopping</button></router-link>
        </div>
        <div class="failure feedback" v-if="failure && !verifying">
            <p class="info">{{error}}</p>
            <img src="https://s2.svgbox.net/illlustrations.svg?ic=pirahna" alt="failed">
            <router-link :to="{name:'Market', params:{id:param}}"><button>Continue Shopping</button></router-link>
        </div> 
 </div>
</template>

<script>
export default {
      name:"Approval",
      data(){
        return{ 
           failure:true,
           verifying:true,
           paymentID:'',
           orderID:'',
           amount:8000,
           error:'',
           param:'ng'
        }
    },
    methods:{
        updateOrder(){
              this.$http.put(`http://localhost:3000/orders/${this.orderID}`)
              .then(res=>{
                  let cc = res.data.country.substring(0, 2);
                  this.param = cc.toLowerCase();
              })
        },
        verifyPayment(paymentID){
            this.$http.get(`http://localhost:3000/flutter/verify/${paymentID}`)
            .then(res=>{
                if(res.data.status==="success"){
                     this.amount=res.data.data.amount;
                     if(res.data.data.charged_amount<this.amount){
                         this.error=`You paid ${res.data.data.charged_amount} instead of ${this.amount}`
                         this.verifying=false;
                     }else{
                        this.updateOrder();
                        this.failure=false;
                        this.verifying=false;
                        this.error="";
                    }
                }
                else{
                    this.error="Incomplete Payment!!!"
                    this.verifying=false;
                }
            })
        }
    },
    created(){
       this.paymentID = this.$route.params.paymentID;
       this.orderID   = this.$route.params.orderID;
       if(this.paymentID!==null){
           this.verifyPayment(this.paymentID); 
       }else{
           this.$router.push('/buyer/login')
           this.verifying=false;
           this.error = "Invalid Transaction";
       }
    }
}
</script>

<style scoped>
a{
    text-decoration: none;
    color: #005B94;
    width: 100%;
    height: 40px;
}
div.approval-container{
    height: 100%;
}
nav{
    padding: 10px 50px;
    border-bottom: 1.5px solid #005B94;
}
h3{
    color: #005B94;
    font-size: 2rem;
    line-height: 130%;
}
div.feedback{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto;
}
div.feedback img{
    width: 20%;
    height: 250px;
    display: block;
    margin: auto;
}
p.info{
    font-size: 1.5rem;
    line-height: 128%;
    text-align: center;
    color: #00253C;
    margin: auto;
    margin-bottom: 14px;
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
div.loader{
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    text-align: center;
}
@media only screen and (max-width: 720px) {
    p.info{
       font-size: 1.2rem;
    }
    div.feedback{
        width: 90%;
        margin: auto;
    }
    div.feedback img{
        width: 80%;
        height: 250px;
    }
    nav{
        padding: 10px 15px;
        margin-bottom: 10px;
    }
}
    
</style>