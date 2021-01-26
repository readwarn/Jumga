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
            product:{},
            currency:'NGN'
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
                  console.log(res.data);
                  this.carting=false;
                  console.log('adding');
                  this.$router.push(`/cart/${this.$route.params.cc}`);
              })
        },
        updateItem(item){
             this.carting=true;
             this.$http.put(`http://localhost:3000/items/${item._id}`,{increment:this.units})
            .then(res=>{
                console.log('updating');
                this.carting=false;  
                this.$router.push(`/cart/${this.$route.params.cc}`);
            })     
        },
        inCart(product,cart){
            cart.items.forEach(item => {
                if(item.product._id.toString()===product._id.toString()){
                    this.item=item;
                    return;
                }
            })
        },
        addToCart(){
              if(this.item===''){
                  this.updateCart()
              }else{
                  this.updateItem(this.item);
              }
        },
        buynow(){
            if(this.address.length<18){
                 this.error='Fill the address a proper address so we wont lose your order';
                
            }else{
                  const cost =(this.product.price * this.units) + this.product.delivery;
                  const sellerCharge = this.product.price * this.units * 0.975;
                  const dispatchCharge = this.product.delivery * 0.8;
         const pay={
                "amount":cost,
                "country":this.currency,
                "address":this.address,
                "products":[{
                    id:this.product._id,
                    quantity:this.units
                }],
                "subaccount":[
                    {
                        "id":this.product.shop.accountID,
                        "transaction_charge_type":"flat_subaccount",
                        "transaction_charge":sellerCharge
                    },
                    {
                        "id":'RS_A75DF63E1A4BF2757823E93F91279AB3',
                        "transaction_charge_type":"flat_subaccount",
                        "transaction_charge":dispatchCharge
                    }
                ]
            }
            this.buying=true;
            this.$http.post('http://localhost:3000/flutter/pay',pay)
            .then(res=>{
                if(res.data.status==="success"){
                    window.location.href = res.data.data.link;
                }else{
                    this.error = 'error making payment';
                    this.buying=false;
                }
            })
            }
        }
    },
    created(){
             // Decide currency
            if(this.$route.params.cc==='ng'){
                this.currency==='NGN'
            }else if(this.$route.params.cc==='gh'){
                this.currency==='GHS'
            }else{
                this.currency==='KES'
            }

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
                          this.inCart(this.product,this.cart);
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