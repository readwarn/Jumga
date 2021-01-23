<template>
     <div class="market-container">
          <navbar :profile="profile" @profileclick="profile=!profile" :cc="$route.params.id" :item="cart.items.length" v-if="!loading" />
          <loader v-if="loading" />
          <div class="banner">
                <h3>AMAZING DEALS THIS FRIDAY</h3>
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
    background: url('https://s2.svgbox.net/illlustrations.svg?ic=ironman');
    background-size: 100% 100%;
    height: 25%;
    margin-top: 65px;
    margin-bottom: 30px;
    border: 1px solid black;
    padding: 0 150px;
}
div.banner h3{
    color: #070707;
    font-size: 1.5rem;
}

 @media only screen and (max-width: 720px) {
    div.content{
        width: 98%;
    }
    div.banner{
        border:  1px solid purple;
        background-size:80% 80%;
        background-repeat: no-repeat;
        background-position: 150% center;
        padding: 0px 0px 0px 10px;
    }
    div.banner h3{
    font-size: 1rem;
    text-align: left;
   }        
  }
</style>