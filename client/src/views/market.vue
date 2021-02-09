<template>
     <div class="market-container" @click="profile=false">
          <navbar :profile="profile" @profileclick="profile=!profile" :cc="$route.params.id" :item="cart.items.length" v-if="!loading && !empty" />
          <loader v-if="loading" />
          <div class="empty" v-if="empty && !loading">
                 <div>
                        <router-link to="/markets">&#60; back</router-link>
                        <p>Ooops! No products yet. Check back later</p>
                        <img src="../assets/empty-shop.svg" alt="">
                 </div>
          </div>
          <div class="banner" v-if="!loading && !empty">
                 <div>
                      <h3>Amazing Deals</h3>
                      <img src="https://s2.svgbox.net/illlustrations.svg?ic=ironman" alt="hero">
                      <h3>This Friday.</h3>
                 </div>
          </div>
          <div class="content" v-if="!loading && !empty">
                <label for="search">Search for a product</label>
                <div class="input-box">
                    <img src="https://s2.svgbox.net/hero-outline.svg?color=BDBDBD&ic=search" width="18px" height="18px" alt="">
                    <input type="text" id="search">
                </div>
                <div class="product-container">
                     <product v-for="(product,index) in products" :key="index" :carting="carting" :avi="product.displayPicture" @cartclick="addToCart(product)" @productclick="renderItem(product)"  :price="product.price" :name="product.name" />
                </div>
          </div>
     </div> 
</template>

<script>
import product from "@/components/product.vue";
import loader from '../components/loader.vue';
import Navbar from '../components/navbar.vue';

export default {
     name:'Market',
     components:{
        product,loader,Navbar
     },
     data(){
         return{
              loading:true,
              empty:false,
              profile:false,
              item:false,
              cart:'',
              itemRoute:'',
              carting:false,
              products:[],
              pids:[],
         }
     },
     methods:{
         renderItem(product){
             // render an item based on product clicked
             this.$router.push(`/market/${this.$route.params.id}/items/${product._id.toString()}`);
         },
         inCart(product,cart){
            let inside = false;
            cart.items.forEach((item,i)=>{
                 if(i===undefined){
                      return false;
                 }
                 else{ 
                     if(item.product._id==product._id){
                         this.item=item;
                         inside = true;
                    }  
                 }
                })     
          return inside;
         }, 
         updateItem(item){
                this.carting=true;
                this.$http.put(`items/${item._id}`,{increment:1})
                .then(res=>{
                    this.carting=false;  
                })
         },
         updateCart(product){
               this.carting=true;
               this.$http.put(`carts/${this.cart._id}`,{
                   product:product,
                   increment:1
               })
              .then(res=>{
                  this.cart = res.data;
                  this.carting=false;
              })
         },
         addToCart(product){
             // before an item is added to the cart, it is checked whether its in the cart already
             // if yes, the item quantity is updated,
             // if no, the item will be added
             if(this.inCart(product,this.cart)){
                this.updateItem(this.item);
             }else{
                 this.updateCart(product);
             }
         }
     },
     created(){
             this.$http.get('auth/status')
            .then(res=>{
               if(!res.data.loggedIn){
                 this.$router.push('/buyer/login');
               }else{
                    this.$http.get(`products/${this.$route.params.id}`)
                   .then(res=>{
                           if(res.data.length>0){
                                 this.products=res.data;
                                 this.$http.get(`carts/${this.$route.params.id}/myCart`)
                                .then(res=>{
                                 this.cart=res.data;
                                 this.loading=false;
                           })
                        }
                        else{
                            this.loading=false;
                            this.empty=true;     
                        }
                   })
               }
           })
     }
}
</script>

<style scoped>
div.market-container{
    height: 100%;
}
div.content{
    width: 95%;
    height: 100%;
    margin: auto;
}
label{
    width: 70%;
    font-size: 0.8rem;
    margin: auto;
    margin-bottom: 7px;
    display: block;
}
div.input-box{
    width: 70%;
    margin: auto;
    display: flex;
    align-items: center;
    padding: 15px;
    height: 40px;
    margin-bottom: 30px;
    background: #F2F2F2;
}
input{
    display: block;
    height: 40px;
    width: 100%;
    border: none;
    outline: none;
    margin-left: 15px;
    background: transparent;
    font-size: 0.9rem;
}
div.product-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
div.banner{
    display: flex;
    align-items: center;
    background-color:#E5E5E5;
    height: 25%;
    margin-top: 67px;
    margin-bottom: 30px;
}
div.banner h3{
    color: #070707;
    font-size: 1.5rem;
}
div.banner div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 35%;
    height: 84%;
    margin: auto;
}
div.banner div img{
    height: 100%;
}
div.empty{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
div.empty a{
    text-decoration: none;
    font-size: 1.3rem;
}
div.empty p{
    font-size: 2rem;
    text-align: center;
    margin: 7px 0px 0px 0px;
}
div.empty img{
    width: 60%;
    display: block;
    margin: auto;
    height: 75%;
}
div.empty div{
    width: 90%;
    height: 75%;
}

@media only screen and (max-width: 720px) {
    div.content{
        width: 98%;
    }
    div.banner{
        background-size:80% 80%;
        background-position:center;
    }
    div.banner div{
        width: 75%;
    }
    div.banner h3{
    font-size: 1rem;
    text-align: left;
    }
    div.empty a{
    font-size: 0.9rem;
    }
    div.empty p{
        font-size: 1.5rem;
    }        
  }
</style>