<template>
    <div class="order-box">
            <navbar v-if="!loading" :cc="$route.params.id" :item="cart.items.length" />
            <loader v-if="loading" />
            <div class="content" v-if="!loading && !empty && !showAddress">
                <div class="item heading">
                    <div class="item-box heading">
                        <p>Item Details</p>
                    </div>
                    <div class="item-tags heading">
                         <div class="field heading">
                             <p>Quantity</p>
                         </div>
                         <div class="field heading">
                             <p>Price</p>
                         </div>
                         <div class="field heading">
                             <p>Delivery</p>
                         </div>
                         <div class="field heading">
                             <p>Subtotal</p>
                         </div>
                    </div>
                </div>
                <div class="item" v-for="(item,index) in cart.items" :key="index">
                    <div class="item-box">
                        <img :src="item.product.displayPicture" class="avi" alt="product">
                        <div class="detail">
                            <div class="delete" v-if="!deleting" @click="deleteItem(item)">
                                 <p>Seller: <span>{{item.shop.name}}</span></p>
                                 <img src="https://s2.svgbox.net/hero-outline.svg?color=red&ic=trash" height="20" width="20" alt="delete">
                            </div>
                            <router-link :to="itemRoute(item)">{{item.product.name}}</router-link>
                            <img id="load" v-if="deleting" src="https://s2.svgbox.net/loaders.svg?ic=tail-spin" height="30" width="30" alt="updating">
                        </div>
                    </div>
                    <div class="item-tags">
                        <div class="qty field">
                            <update-item-button width="143" :value="item.quantity" v-on:minusclick="decreaseItem(item,index)" :disable="updating" v-on:plusclick="increaseItem(item,index)" />
                            <p class="subtitle">Quantity</p>
                        </div>
                        <div class="price field">
                            <p>₦{{item.product.price}}</p>
                            <p class="subtitle">Price</p>
                        </div>
                        <div class="delivery field">
                            <p>₦{{item.product.delivery}}</p>
                            <p class="subtitle">Delivery</p>
                        </div>
                        <div class="subtotal field">
                            <p>₦{{(item.product.delivery)+(item.product.price*item.quantity)}}</p>
                            <p class="subtitle">Subtotal</p>
                        </div>
                    </div>
                </div>
                <div class="total" v-if="!empty">
                    <p>Total</p>
                    <h4>₦{{total}}</h4>
                </div>
                <div class="total" v-if="!empty">
                         <router-link :to="route">
                             <button class="a">CONTINUE SHOPPING</button>
                         </router-link>
                         <button class="b" @click="showAddress=true">CHECKOUT</button>
                </div>
            </div>
             <div class="emptyCart" v-if="empty">
                    <img src="../assets/empty.svg" alt="cart">
                     <h3>Empty Cart</h3>
                     <router-link :to="route">
                         <button>CONTINUE SHOPPING</button>
                     </router-link>
            </div>
             <div class="address-popup" v-if="showAddress">
                        <div> 
                            <h4>Pay ₦{{(total + delivery)}}</h4>
                            <p v-if="address!==''">Your Order costs {{(total + delivery)}} and will be shipped to {{address}}</p>
                            <label for="address">Address</label>
                            <textarea name="add" id="address" cols="30" v-model="address" rows="10"></textarea>
                            <button @click="checkout()" >PAY NOW</button>
                        </div>
            </div>
    </div>
</template>

<script>
import loader from '../components/loader.vue'
import navbar from '../components/navbar.vue';
import UpdateItemButton from '../components/updateItemButton.vue';
export default {
    name:"Order",
    components:{loader, UpdateItemButton, navbar},
    data(){
        return{
            route:'markets/ng',
            empty:false,
            loading:true,
            updating:false,
            showAddress:false,
            deleting:false,
            address:'Ibadan',
            units:1,
            delivery:0,
            updating:false,
            cart:'',
            total:0,
        }
    },
    methods:{
         itemRoute(item){
              return `/market/${this.$route.params.id}/products/${item._id.toString()}`
         },
         decreaseItem(item,index){
             console.log('decreasing');
             if(this.units===1){
                this.error='You really want to order 0 item? lol';
            }else{
                this.units-=1;
                this.updateItem(item,index);
                this.error='';
            }
         },
         increaseItem(item,index){
            if(this.units===item.product.qty){
               this.error='Not enough product from seller';
            }else{
                this.units+=1;
                this.updateItem(item,index);
                this.error='';
             }
         },
         updateItem(item,index){
                  console.log(this.units);
                  this.updating=true;
                  this.$http.put(`http://localhost:3000/items/${item._id}`)
                 .then(res=>{
                    this.updating=false;
                    this.cart.items.splice(index,1,res.data);
                })
         },
         deleteItem(item){
             this.deleting=true;
             this.$http.delete(`http://localhost:3000/items/${item._id}/${this.cart._id}`)
            .then(res=>{
                 this.deleting=false;
                 this.cart=res.data;
                  if(this.cart.items.length===0){
                           this.empty=true;
                  }
            })
         },
         createSubaccount(id,charge){
               return {
                    id:id,
                    transaction_charge_type:"flat_subaccount",
                    transaction_charge:charge
               }
         },
         checkout(){
         if(this.address.length<50){
              this.error='Write a proper address so we wont lose your order'
         }
         else{
               let subs=[];
               this.cart.items.forEach((item,index) => {
               const newSub = this.createSubaccount(item.shop.accountID,(item.product.price*item.quantity*0.975));
               if(index===0){
                   subs.push(newSub);
               }else{
                  if(subs.find((sub)=>{sub.id===newSub.id})){
                      const oldsub=find((sub)=>{sub.id===item.shop.accountID});
                      const oldIndex=subs.indexOf(oldsub);
                      const newCharge=oldsub.transaction_charge + newSub.transaction_charge;
                      const updatedSub = this.createSubaccount(oldsub.id, newCharge);
                      subs.splice(oldIndex,1,updatedSub);
                  }else{
                      subs.push(newSub);
                  }
               }
          });
          const cost = this.total + this.delivery;
          const dispatch = this.createSubaccount('RS_9F16F4F847387A9808A177EC80DB969F',this.delivery*0.8);
          subs.push(dispatch);
          let currency='NGN';
          if(this.$route.params.id==='ng'){
              currency==='NGN'
          }else if(this.$route.params.id==='gh'){
              currency==='NGN'
          }else{
              currency==='NGN'
          }

          const pay={
                amount:cost,
                country:currency,
                subaccount:subs
           }
           this.$http.post('http://localhost:3000/flutter/pay',pay)
          .then(res=>{
               window.location.href = res.data.flutterData.data.link;
          })
         }
        },
    },
    created(){
         this.route=`/markets/${this.$route.params.id}`;
         this.$http.get('http://localhost:3000/auth/status')
           .then(res=>{
               if(!res.data.loggedIn){
                 this.$router.push('/buyer/login');
               }else{
                   this.$http.get(`http://localhost:3000/carts/${this.$route.params.id}/myCart`)
                  .then(res=>{
                       console.log(res.data);
                       this.loading=false;
                       this.cart=res.data;
                       if(this.cart.items.length===0){
                           this.empty=true;
                       }else{
                            this.cart.items.forEach(item => {
                            this.total+=((item.product.price * item.quantity) + item.product.delivery);
                            this.delivery+=item.product.delivery;
                       });
                       }
                });
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
div.content{
    width: 70%;
    margin: auto;
    margin-top: 65px;
    position: relative;
    padding-bottom:50px;
}

div.item{
    display: flex;
    flex-wrap: wrap;
    background: #ffffff;
    border: black 1px solid;
    margin-bottom: 17px;
}
div.item.heading{
    background: #FFFFF3;
    padding: 7px;
    border: 1px solid black;
    margin-bottom: 10px;
}
div.item-box{
    display: flex;
    align-items: center;
    width: 45%;
    padding: 15px;
    font-weight: 700;
    font-size: 1rem;
}
div.item-box.heading{
     padding: 0px;
}
div.item-box img.avi{
    width: 34%;
    height: 120px;
    margin-right:26px;
}
div.detail{
   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: column;
} 
div.detail p{
    color: rgb(124, 121, 121);
    font-size: 0.75rem;
    margin-right: 10px;
}
div.detail p span{
    color: #219653;   
}
div.detail a{
    text-decoration: none;
    display: block;
    font-size: 1rem;
    color: black;
}
div.detail a:hover{
    color: #219653;
}
div.delete{
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom:14px;
    width: 100%;
}

div.delete:hover{
    filter: brightness(0.8);
}

div.field{
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: black;
    padding-top:15px;
    width: 25%;
}
div.field.heading{
    padding-top: 0px;
    color: #00253C;
    font-size: 1rem;
    background: none;
}
div.item-tags{
    width: 45%;
    display: flex;
    flex-wrap: wrap;
    width: 55%;
}
div.qty input{
    height: 40px;
    width: 60%;
    padding: 10px;
    display: block;
    margin: 10px auto 0px auto;
}
div.total{
    display: flex;
    align-items: center;
    margin: 20px 0px;
    font-size: 1.2rem;
}
button{
    height: 40px;
    outline: none;
    border: none;
    cursor: pointer;
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 700;
    width: 20%;
    background: #005B94;
}

button:hover{
   box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
}
div.total a{
    display: block;
    width: 20%;
    margin-right:15px;
}
div.total button.a{
    background: #66C9FF;
    width: 100%;
}
div.total button.b{
    background: #219653;
}
div.total p{
    margin-bottom: 0;
    font-size: 1.1rem;
}
div.total h4{
    font-size: 1.35rem;
    font-weight: 700;
    margin-left: 8px;
}
p.subtitle{
    display: none;
}
div.address-popup{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
div.address-popup div{
    width: 35%;
    padding: 10px;
    border: 1px solid black;
}
div.address-popup div h4{
    color: #219653;
    font-size: 2rem;
    margin-bottom: 15px;
    width: 100%;
}
div.address-popup textarea{
    display: block;
    width: 100%;
    margin-bottom: 20px;
}
div.address-popup div label{
    margin:20px 0px 5px 0px;
    display: block;
    font-size: 1rem;
}
div.address-popup div button{
    height: 40px;
    border: none;
    outline: none;
    color: #ffffff;
    cursor: pointer;
    width: 60%;
    display: block;
    margin: auto;
}
div.address-popup div button:hover{
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
}
div.emptyCart{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: #66C9FF;
    font-size: 1.5rem;
    text-align: center;
    margin-top: 75px;
}

div.emptyCart img{
    height: 200px;
    width: 45%;
    display: block;
    margin: auto;
}
@media only screen and (max-width: 720px) {
nav{
    padding: 10px 15px;
}
div.content{
    width: 95%;
}
div.item-tags,div.item-box{
    width: 100%;
}
div.item.heading{
    display: none;
}
div.item-box{
    margin-bottom: 12px;
}
div.field{
    padding-top: 0px;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px;
    font-size: 1rem;
    text-align: center;
}

div.qty input{
    width: 80%;
}
p.subtitle{
    display: block;
    font-size: 0.8rem;
    font-weight: 400;
    margin-top: 5px;
}
div.total button,div.total a{
    width: 33%;
}
div.address-popup div{
    width: 90%;
}
div.address-popup div h4{
    font-size: 1.4rem;
}
div.emptyCart{
    font-size: 1.1rem;
}
div.emptyCart img{
    width: 75%;
}
div.emptyCart button{
    width: 35%;
}
}

</style>