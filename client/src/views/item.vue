<template>
     <div class="item-container">
         <nav>
             <h3>Jumga</h3>
         </nav>
         <loader v-if="loading" />
         <div class="content"  v-if="!loading">
               <p class="error">{{error}}</p>
              <div class="product-container">
                      <img src="../assets/product.svg" alt="product">
                      <div class="details">
                          <h4>The all-time lavendar perfume 200oz</h4>
                          <p class="price">₦3000</p>
                          <p>Delivery fee ₦1000</p>
                          <label for="qty">Units</label>
                          <input type="number" min="1" name="qty" id="qty" v-model="units">
                          <label for="address">Address</label>
                          <textarea id="address" cols="30" rows="6"></textarea>
                          <div class="input-box">
                              <button @click="updateCart()">ADD TO CART</button>
                              <button>BUY NOW</button>
                          </div>
                          <p>Sellers shop <span id="seller">Elledennie fragrances</span></p>
                      </div>
            </div>
            <p class="title">Product Description</p>
            <p> Perfumery, as the art of making perfumes, 
                began in ancient Mesopotamia, Egypt, the Indus Valley Civilization and possibly 
                Ancient China. It was further refined by the Romans and the Arabs. ... 
                On the Indian subcontinent, perfume and perfumery existed in the Indus civilization (3300 BC – 1300 BC). 
                The word perfume is used today to describe scented mixtures and is derived from the Latin word, "per fumus," meaning through smoke. 
                The word Perfumery refers to the art of making perfumes. Perfume was further refined by the Romans, the Persians and the Arabs.
           </p>
         </div>
     </div>
</template>

<script>
import loader from '../components/loader.vue';
export default {
  components: { loader },
    name:"Item",
    data(){
        return{
            cart:'',
            loading:true,
            units:1,
            product:'',
            error:''
        }
    },
    methods:{
        updateCart(){
              const item={
                  product:this.$route.params.id,
                  quantity:this.units
              }
              this.$http.put(`http://localhost:3000/carts/${this.cart._id}`,item)
              .then(res=>{
                  console.log(res.data);
                  this.$router.push(`/markets/${this.$route.params.cc}`); 
              })
        },
        buynow(){
            if(this.address===''){
                 this.error='Fill the address';
                
            }else{
                  const cost =(this.product.price * this.units) + this.product.delivery;
            const pay={
                amount:cost,
                country:this.$route.params.cc,
                subaccount:[
                    {
                        id:this.product.shop.accountID,
                        transaction_charge_type:"flat_subaccount",
                        transaction_charge:`${this.product.price*this.units*0.975}`
                    },
                    {
                        id:'RS_BF90AF968D5DFF286579ECD2B3EB1994',
                        transaction_charge_type:"flat_subaccount",
                        transaction_charge:`${this.product.delivery*0.8}`
                    }
                ]
            }
            this.$http.post('http://localhost:3000/flutter/pay',pay)
            .then(res=>{
                console.log(res.data);
            })
            }
        }
    },
    created(){
            this.$http.get('http://localhost:3000/auth/status')
           .then(res=>{
               if(!res.data.loggedIn){
                 this.$router.push('/buyer/login');
               }else{
                    this.$http.get(`http://localhost:3000/carts/${this.$route.params.cc}myCart`)
                   .then(res=>{
                       this.loading=false;
                       this.cart=res.data;
                   })
                   this.$http.get(`http://localhost:3000/products/${this.$route.params.id}`)
                   .then(res=>{
                       this.product=res.data;
                   })
               }
           })
    }
}
</script>

<style scoped>
div.item-container{
    height: 100%;
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
p{
    color: black;
    line-height: 150%;
    font-weight: 500;
    font-size: 0.8rem;
}
div.content{
    width: 70%;
    margin:auto;
    margin-top: 80px; 
}
div.product-container{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    background: #E5E5E5;
    padding: 25px;
}
div.product-container img{
    width: 40%;
    height: 300px;
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
}
div.details{
    width: 40%;
}
p.error{
    color: red;
}
span#seller{
    color: #00253C;
    font-size: 1rem;
}
h4{
    color: #00253C;
    line-height: 29px;
    margin-bottom: 15px;
}
p.price{
    color: #219653;
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 15px;
}
p.title{
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 15px;
    border-bottom: 3px #66C9FF solid;
    color: #00253C;
}
label{
    font-size: 0.9rem;
    color: #00253C;
    margin-right: 15px;
    display: block;
}
input{
    width: 100px;
    height: 40px;
    padding: 10px;
    margin-bottom: 15px;
}
div.input-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
}
div.input-box button:nth-child(1){
    background: #66C9FF;
}
div.input-box button:nth-child(2){
    background: #219653;
}
button{
    width:40%;
    height: 40px;
    background: #66C9FF;
    color: #ffffff;
    outline:none;
    border: none;
    cursor: pointer;
}
button:hover{
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
}
@media only screen and (max-width: 720px) {
nav{
    padding: 10px 15px;
    margin-bottom: 10px;
}
div.content{
    width: 92%;
    padding-bottom: 40px;
}
div.product-container img{
    width: 100%;
    margin-bottom: 15px;
}
div.details{
    width: 100%;
}
}
</style>