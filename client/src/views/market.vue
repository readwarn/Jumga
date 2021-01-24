<template>
     <div class="market-container">
          <navbar :profile="profile" @profileclick="profile=!profile" :cc="$route.params.id" :item="cart.items.length" v-if="!loading" />
          <loader v-if="loading" />
          <div class="banner" v-if="!loading">
                 <div>
                      <h3>AMAZING DEALS</h3>
                      <img src="https://s2.svgbox.net/illlustrations.svg?ic=ironman" alt="hero">
                      <h3>THIS FRIDAY.</h3>
                 </div>
          </div>
          <div class="content" v-if="!loading">
                <label for="search">Search for a product</label>
                <div class="input-box">
                    <img src="https://s2.svgbox.net/hero-outline.svg?color=BDBDBD&ic=search" width="18px" height="18px" alt="">
                    <input type="text" id="search">
                </div>
                <div class="product-container">
                     <product v-for="(product,index) in products" :key="index" :avi="product.displayPicture" @productclick="renderItem(product)"  :price="product.price" :name="product.name" />
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
              profile:false,
              cart:'',
              itemRoute:'',
              products:[]
         }
     },
     methods:{
         renderItem(product){
             this.$router.push(`/market/${this.$route.params.id}/items/${product._id.toString()}`);
         }
     },
     created(){
             this.$http.get('http://localhost:3000/auth/status')
            .then(res=>{
               if(!res.data.loggedIn){
                 this.$router.push('/buyer/login');
               }else{
                    this.$http.get(`http://localhost:3000/products/${this.$route.params.id}`)
                   .then(res=>{
                       this.products=res.data;
                       this.$http.get(`http://localhost:3000/carts/${this.$route.params.id}/myCart`)
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
div.market-container{
    height: 100%;
}
div.content{
    width: 80%;
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
  }
</style>