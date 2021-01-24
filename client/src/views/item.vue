<template>
     <div class="item-container">
         <navbar :cc="$route.params.cc" :item="cart.items.length" v-if="!loading" />
         <loader v-if="loading" />
         <div class="content"  v-if="!loading">
               <div class="product-container">
                      <img :src="product.displayPicture" alt="product">
                      <div class="details">
                          <h4>{{product.name}}</h4>
                          <p class="price">₦{{product.price}}</p>
                          <p class="del">Delivery fee ₦{{product.delivery}}</p>
                          <label id="mb" for="qty">Units</label>
                          <update-item-button :value="units" :width="50" v-on:minusclick="decreaseItem()" :disable="updating" v-on:plusclick="increaseItem()" />
                          <p class="error">{{error}}</p>
                          <label for="address">Address</label>
                          <textarea id="address" cols="30" rows="6" v-model="address"></textarea>
                          <div class="input-box">
                              <button @click="addToCart()" v-if="!carting">ADD TO CART</button>
                              <img v-if="buying || carting" id="load" src="https://s2.svgbox.net/loaders.svg?ic=tail-spin" height="30" width="30" alt="updating">
                              <button v-if="!buying" @click="buynow()">BUY NOW</button>
                          </div>
                          <p>Sold by <span id="seller">{{product.shop.name}}</span></p>
                      </div>
            </div>
            <p class="title">Product Description</p>
            <p>{{product.description}}</p>
         </div>
     </div>
</template>

<script>
import loader from '../components/loader.vue';
import Navbar from '../components/navbar.vue';
import UpdateItemButton from '../components/updateItemButton.vue';
export default {
  components: { loader, UpdateItemButton, Navbar },
    name:"Item",
    data(){
        return{
            loading:true,
            units:1,
            address:'Ibadan',
            updating:false,
            carting:false,
            cart:'',
            item:'',
            buying:false,
            error:'',
            inCart:false,
            product:{},
        }
    },
    methods:{
        increaseItem(){
            if(this.units===this.product.qty){
               this.error='Not enough product from seller';
            }else{
                this.units+=1;
            }
        },
        decreaseItem(){
            if(this.units===1){
                this.error='You want to order 0 item? lol';
            }else{
                this.units-=1;
            }
        },
        updateCart(){
               this.carting=true;
               this.$http.put(`http://localhost:3000/carts/${this.cart._id}`,{
                   product:this.product,
                   increment:this.units
               })
              .then(res=>{
                  this.carting=false;
                  console.log(res.data);
              })
        },
        addToCart(){
             this.cart.items.forEach(item => {
                 if(item.product._id.toString()===this.product._id.toString()){
                         this.$http.put(`http://localhost:3000/items/${item._id}`,{
                         increment:this.units
                  })
                 .then(res=>{
                     console.log(res.data);
                     this.$router.push(`/cart/${this.$route.params.cc}`);
                     return;
                 })
                 }
             });
             this.$http.put(`http://localhost/carts/${this.cart._id}`,{
                 product:this.product,
                 increment:this.units
             })
             .then(res=>{
                 this.cart=res.data;
                 this.$router.push(`/cart/${this.$route.params.cc}`)
             })
        },
        buynow(){
            if(this.address===''){
                 this.error='Fill the address';
                
            }else{
                  const cost =(this.product.price * this.units) + this.item.product.delivery;
                  let currency='NGN';
          if(this.$route.params.cc==='ng'){
              currency==='NGN'
          }else if(this.$route.params.cc==='gh'){
              currency==='NGN'
          }else{
              currency==='NGN'
          }
            const pay={
                amount:cost,
                country:currency,
                subaccount:[
                    {
                        id:this.item.product.shop.accountID,
                        transaction_charge_type:"flat_subaccount",
                        transaction_charge:`${this.item.product.price*this.units*0.975}`
                    },
                    {
                        id:'RS_BF90AF968D5DFF286579ECD2B3EB1994',
                        transaction_charge_type:"flat_subaccount",
                        transaction_charge:`${this.item.product.delivery*0.8}`
                    }
                ]
            }
            this.buying=true;
            this.$http.post('http://localhost:3000/flutter/pay',pay)
            .then(res=>{
                this.buying=false;
                window.location.href = (res.data.flutterData.data.link);
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
                  this.$http.get(`http://localhost:3000/products/this/${this.$route.params.id}`)
                  .then(res=>{
                      this.product=res.data;
                       this.$http.get(`http://localhost:3000/carts/${this.$route.params.cc}/myCart`)
                      .then(res=>{
                          this.cart=res.data;
                          this.loading=false;
                      })
                  })
               }
           })
    }
}
</script>

<style scoped>
img#load{
    display: block;
    margin: auto;
}
div.item-container{
    height: 100%;
}
p{
    color: black;
    line-height: 150%;
    font-weight: 500;
    font-size: 0.8rem;
}
p#mb{
    margin-bottom: 15px;
}
label#mb{
    margin-bottom: 5px;
}
input#qty{
    margin-top: 5px;
}
div.content{
    width: 70%;
    margin:auto;
    background: gainsboro;
    padding: 20px;
    margin-top: 63px; 
}
div.product-container{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    border: 1px solid black;
    background: #fffff5;
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
    margin-bottom: 10px;
}
p.del{
    margin-bottom: 20px;
}
p.price{
    color: #219653;
    font-weight: 700;
    font-size: 1.1rem;
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
    display: block;
    margin-top: 25px;
}
input{
    width: 100px;
    height: 40px;
    padding: 10px;
    margin-bottom: 5px;
}
div.input-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
}
div.input-box img{
    width: 30px;
    height: 30px;
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
    width: 98%;
    padding-bottom: 40px;
}
div.product-container img{
    width: 100%;
    margin-bottom: 15px;
}
div.product-container{
    padding:25px 10px;
}
div.details{
    width: 100%;
}
}
</style>