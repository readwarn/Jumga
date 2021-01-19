<template>
     <div class="market-container">
          <nav>
              <h3>
                  Jumga
              </h3>
          </nav>
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
                     <product v-for="(product,index) in products" :key="index" :name="product.name" :price="product.price" v-on:productclick="$router.push(`/market/${this.params.id}/products/${product._id}`)"/>
                </div>
          </div>
     </div> 
</template>

<script>
import product from "@/components/product.vue";
import loader from '../components/loader.vue';
export default {
     name:'Market',
     components:{
        product,loader
     },
     data(){
         return{
              loading:true,
              products:[1,3,4,5,5,5,5,5,5]
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
                       this.loading=false;
                       this.products=res.data;
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
nav{
    padding: 10px 15px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1.5px solid #005B94;
    background: #ffffff;
}
h3{
    color: #005B94;
    font-size: 2rem;
    line-height: 130%;
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
    justify-content: center;
    align-items: center;
    background: url('../assets/deal.svg');
    background-size: contain;
    height: 25%;
    margin-top: 62px;
    margin-bottom: 30px;
}
div.banner h3{
    color: #ffffff;
}

 @media only screen and (max-width: 720px) {
    nav{
        padding: 10px 15px;
    }
    div.content{
        width: 98%;
    }
}
</style>