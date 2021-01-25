<template>
   <div class="dashboard-container">
     <nav>
         <h3>
             Jumga
         </h3>
     </nav>
       <div v-if="showaddProduct" class="addProduct">
            <div>
                <div class="decide">
                     <img src="https://s2.svgbox.net/hero-outline.svg?ic=x" height="40" width="40" alt="cancel" @click.stop="showaddProduct=false">
                     <h4>Add More!!!</h4>
                </div>
                <input type="number" :min="qty" v-model="qty">
                <img v-if="updating" src="https://s2.svgbox.net/loaders.svg?ic=tail-spin" height="30" width="30" alt="updating">
                <button v-if="!updating" @click="updateProduct()">UPDATE</button>
            </div>
        </div>
        <loader v-if="gettingShop"/>
        <div class="content" v-if="!gettingShop && !showaddProduct">
        <div class="banner">
            <div class="detail">
               <h2 class="title">{{shop.name}}</h2>
               <p class="subtitle">
                   {{shop.description}}
                </p>
                <div class="phone">
                       <img src="https://s2.svgbox.net/hero-outline.svg?color=66C9FF&ic=phone" width="18px" height="18px" alt="phone">
                       <p>{{shop.phone}}</p>
                </div>
                <div class="phone">
                       <img src="https://s2.svgbox.net/hero-outline.svg?color=66C9FF&ic=phone" width="18px" height="18px" alt="phone">
                       <p>{{shop.address}}</p>
                </div>
           </div>
           <div class="right">
                <div class="balance">
                        <p>Balance</p>
                        <p>₦{{shop.balance}}</p>
                </div>
                <button @click="$router.push(addProductRoute)">ADD PRODUCT</button>
           </div>
           
     </div>
     <div class="product-container" v-if="!gettingShop && !showaddProduct">
         <product v-for="(product,index) in shop.products" :key="index" :avi="product.displayPicture" v-on:productclick="hold(index,product)" :qty="product.qty" :name="product.name" :price="product.price"/>
     </div>
     </div>
    
   </div>
</template>

<script>
import product from "@/components/product.vue";
import loader from "@/components/loader.vue";
export default {
    name:"Shop",
    data(){
        return{
          qty:1,
          i:0,
          showaddProduct:false,
          updating:false,
          gettingShop:true,
          productID:'',  
          addProductRoute:'',  
          shop:{},
        }
    },
    components:{
        product,loader
    },
    methods:{
        hold(index,product){
            this.i=index;
            this.qty=product.qty;
            this.productID=product._id;
            this.showaddProduct=true;
            console.log(product._id);
        },
        addProduct(){
              if(shop.isApproved){
                  this.$router.push(`/newProduct/${this.addProductRoute}`);
              }else{
                  this.$router.push('/payment');
              }
        },
        updateProduct(){
            this.updating=true;
            this.$http.put(`http://localhost:3000/products/${this.productID}`,{qty:this.qty})
            .then(res=>{
                this.updating=false;
                this.shop.products.splice(this.i,1,res.data);
                this.addProduct=false;
                this.showaddProduct=false;
            })
        }
    },
    created(){
          this.$http.get('http://localhost:3000/auth/status')
         .then(res=>{
             if(res.data.loggedIn){
                 this.$http.get('http://localhost:3000/shops/myShop')
                 .then(res=>{
                     this.gettingShop=false;
                     this.shop=res.data;
                     console.log(this.shop);
                     this.addProductRoute=`/newProduct/${this.$route.params.cc}/${this.shop._id}`;
                 })
             }else{
                this.$router.push('/seller/login');
             }
         })
         .catch(err=>{
             console.log(err.message);
         })
    }
}
</script>

<style scoped>
div.dashboard-container{
    background: #ffffff;
    border: transparent 1px solid;
}
nav{
    padding: 10px 50px;
    margin-bottom: 10px;
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    background: #ffffff;
}
h3{
    color: #005B94;
    font-size: 2rem;
    line-height: 130%;
}
div.addProduct div.decide{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
div.content{
    width: 60%;
    margin: auto;
    padding: 20px 30px;
    margin-top: 70px;
    position: relative;
    background: #E5E5E5;
}
div.banner{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 33px;
    flex-wrap: wrap;
}
div.detail{
    width: 45%;
}
h2.title{
    font-size: 2.5rem;
    font-weight: 700;
    color: #005B94;
    line-height: 125%;
    margin-bottom: 0px;
}
p.subtitle{
    margin-bottom: 13px;
}
p.subtitle, div.phone p{
    font-size: 1rem;
}
div.phone{
    display: flex;
    align-items: center;
    margin: 15px 0px;
}
div.phone img{
    margin-right: 10px;
}
div.right{
    width: 25%;
}
div.balance{
    height: 100px;
    width: 100%;
    background: #E5E5E5;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 0px;
}
div.balance p:nth-child(2){
     font-size: 1.5rem;
     font-weight: 700;
     color: #219653;
}
div.balance p:nth-child(1){
     font-size: 1rem;
     color: #00253C;
     margin-bottom: 3px;
}
div.product-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
button{
    height: 40px;
    width: 100%;
    outline: none;
    border: none;
    color: #ffffff;
    font-size: 1rem;
    background: #66C9FF;
    cursor: pointer;
}
button:hover{
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
}
div.addProduct{
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
}
div.addProduct input{
    height: 40px;
    width: 100%;
    padding: 10px;
    margin: 20px 0px;
}
div.addProduct div:nth-child(1){
    width: 70%;
    padding: 10px;
}
div.product h4{
    text-align: center;
}
div.product button{
    width: 70%;
    display: block;
    margin: auto;
    background: chartreuse;
    height: 40px;
    cursor: pointer;
}

@media only screen and (max-width: 720px) {
        nav{
            padding: 10px 15px;
            margin-bottom: 10px;
        }
        div.content{
            width: 90%;
            padding: 5px 10px;
        }
        div.detail{
            width: 100%;
            order: 1;
        }
        div.right{
            width: 40%;
            margin-left: auto;
            margin-bottom: 20px;
            order: 0;
        }
        h2.title{
            font-size: 2rem;
        }
        p.subtitle{
            font-size: 0.85rem;
            line-height: 140%;
            margin-bottom: 15px;
        }
        div.phone{
            width: 40%;
        }
        div.phone p{
            font-size: 0.85rem;
            line-height: 140%;
        }
        div.addProduct div{
            width: 80%;
        }
}

</style>