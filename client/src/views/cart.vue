<template>
    <div class="order-box">
            <nav><h3>Jumga</h3></nav>
            <loader v-if="loading" />
            <div class="content" v-if="!loading">
                <div class="address-popup" v-if="showAddress">
                        <div> 
                            <h4>{{(total + delivery)}}</h4>
                            <label for="address">Address</label>
                            <textarea name="add" id="address" cols="30" v-model="address" rows="10"></textarea>
                            <button @click="checkout()" >PAY NOW</button>
                        </div>
                </div>
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
                            <p>Seller: {{item.shop.name}}</p>
                            <router-link to="/">{{item.product.name}}</router-link>
                            <img id="load" v-if="deleting" src="https://s2.svgbox.net/loaders.svg?ic=tail-spin" height="30" width="30" alt="updating">
                            <div class="delete" v-if="!deleting" @click="deleteItem(item)">
                                <img src="https://s2.svgbox.net/hero-outline.svg?color=red&ic=x" height="20" width="20" alt="delete">
                                <p>Remove</p>
                            </div>
                        </div>
                    </div>
                    <div class="item-tags">
                        <div class="qty field">
                            <update-item-button  v-on:minusclick="decreaseItem(item,index)" :disable="updating" v-on:plusclick="increaseItem(item,index)" />
                            <input type="number" id="units" v-model="units">
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
                <div class="total">
                    <p>Total</p>
                    <h4>₦1,000</h4>
                </div>
                <div class="total">
                      <button @click="$router.push(`/markets/${this.$route.params.id}`)">CONTINUE SHOPPING</button>
                      <button @click="showAddress=true">CHECKOUT</button>
                </div>

            </div>
    </div>
</template>

<script>
import loader from '../components/loader.vue'
import UpdateItemButton from '../components/updateItemButton.vue';
export default {
    name:"Order",
    components:{loader, UpdateItemButton},
    data(){
        return{
            loading:true,
            updating:false,
            showAddress:false,
            deleting:false,
            address:'Ibadan',
            units:1,
            updating:false,
            cart:'',
            total:1,
            delivery:2,
        }
    },
    methods:{
         decreaseItem(item,index){
             this.units-=1;
             this.updateItem(item,index);
         },
         increaseItem(item,index){
             this.units+=1;
             this.updateItem(item,index);
         },
         updateItem(item,index){
            if(this.units>item.product.qty){
                this.error='Not enough products from seller';
             }else{
                  this.updating=true;
                  this.$http.put(`http://localhost:3000/items/${item._id}`,{quantity:this.units})
                .then(res=>{
                    this.updating=false;
                    this.cart.items.splice(index,1,res.data);
                })
             }
         },
         deleteItem(item){
             this.deleting=true;
             this.$http.delete(`http://localhost:3000/items/${item._id}`)
            .then(res=>{
                 this.deleting=false;
                 this.cart=res.data;
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
          const pay={
                amount:cost,
                country:this.$route.params.id,
                subaccount:subs
           }
           this.$http.post('http://localhost:3000/flutter/pay',pay)
          .then(res=>{
              console.log(res.data);
          })
         }
        },
    },
    created(){
         this.$http.get('http://localhost:3000/auth/status')
           .then(res=>{
               if(!res.data.loggedIn){
                 this.$router.push('/buyer/login');
               }else{
                   this.$http.get(`http://localhost:3000/carts/${this.$route.params.id}/myCart`)
                  .then(res=>{
                      this.loading=false;
                      this.cart=res.data;
                  });
                  this.cart.items.forEach(item => {
                       this.total+=(item.product.price * item.quantity);
                       this.delivery+=(item.product.delivery);
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
nav{
    padding: 10px 15px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    background: #ffffff;
}
h3{
    color: #005B94;
    font-size: 2rem;
    line-height: 130%;
}
div.content{
    width: 70%;
    margin: auto;
    margin-top: 80px;
}
div.item{
    display: flex;
    flex-wrap: wrap;
    background: #F2F2F2;
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
    margin-right:8px;
}
div.detail{
   height: 100%;
   display: flex;
   flex-direction: column;
} 
div.detail p{
    color: #219653;
    font-size: 0.8rem;
    margin-bottom: 8px;
}
div.detail a{
    text-decoration: none;
    color: #005B94;
    font-size: 1rem;
}
div.detail a:hover{
    color: #219653;
}
div.delete{
    display: flex;
    align-items: center;
    margin-top:auto;
    cursor: pointer;
    width: 75px;
}
div.delete:hover{
    filter: brightness(0.8);
}
div.delete p{
    margin-left: 10px;
    margin-bottom: 0;
    font-size: 1rem;
    color: red;
}
div.field{
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    border-left: 1px solid #F2F2F2;
    background: #E5E5E5;
    color: #828282;
    padding-top:35px;
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
    width: 100%;
    margin: 20px 0px;
    font-size: 1.2rem;
}
div.total button{
    height: 40px;
    outline: none;
    border: none;
    cursor: pointer;
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 700;
    width: 20%;
}

div.total button:hover{
   box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
}
div.total button:nth-child(1){
    background: #66C9FF;
    margin-right: 15px;
}
div.total button:nth-child(2){
    background: #219653;
}
div.total p{
    margin-bottom: 0;
    font-size: 1.1rem;
    margin-right: 15px;
}
div.total h4{
    font-size: 1.35rem;
    font-weight: 700;
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
    height: 30%;
    padding: 10px;
}
div.address-popup div h4{
    color: #219653;
    font-size: 2rem;
    margin-bottom: 15px;
    width: 100%;
    text-align: right;
}
div.address-popup div label{
    margin-bottom: 5px;
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
div.total button{
    width: 33%;
}
div.address-popup div{
    width: 90%;
}
div.address-popup div h4{
    font-size: 1.4rem;
}
}

</style>