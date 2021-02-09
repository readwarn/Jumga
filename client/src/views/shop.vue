<template>
   <div class="dashboard-container">
     <nav>
         <router-link :to="homeRoute"><h3>Jumga</h3></router-link>
          <div @click="logout()">
              <p>LogOut</p>
              <img  src="https://s2.svgbox.net/materialui.svg?color=005B94&ic=logout" width="20" height="20" alt="logout">
          </div>
     </nav>
       <div :class="{'fade-away':showaddProduct}"  class="addProduct">
            <div class="add-content">
                <div class="decide">
                     <h4>Add More {{updateProductName}}</h4>
                     <img src="https://s2.svgbox.net/hero-outline.svg?ic=x" alt="cancel" @click.stop="showaddProduct=false">
                </div>
                <input type="number" :min="qty" v-model="qty">
                <img v-if="updating" src="https://s2.svgbox.net/loaders.svg?ic=tail-spin" height="30" width="30" alt="updating">
                <button v-if="!updating" @click="updateProduct()">UPDATE</button>
            </div>
        </div>
        <loader v-if="gettingShop"/>
        <div class="content" v-if="!gettingShop">
            <div class="banner">
                <div class="detail">
                        <h2 class="title">{{shop.name}} <img :src="check" height="30" width="30" alt=""></h2>
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
                        <button @click="addProduct()">ADD PRODUCT</button>
                </div>
           </div>
                <p class="title">Products</p>
                <div class="product-container" v-if="!gettingShop && !showaddProduct">
                    <product v-for="(product,index) in shop.products" :key="index" :avi="product.displayPicture" @productclick="hold(index,product)" :qty="product.qty" :name="product.name" :price="product.price"/>
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
          country:'ng',
          updateProductName:'',
          check:'https://s2.svgbox.net/hero-outline.svg?color=005B94&ic=badge-check',
          showaddProduct:false,
          updating:false,
          homeRoute:'',
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
            this.updateProductName=product.name;
            this.productID=product._id;
            this.showaddProduct=true;
        },
        addProduct(){
              if(this.shop.isApproved){
                  this.$router.push(`${this.addProductRoute}`);
              }else{
                  this.$router.push(`/payment/${this.shop._id.toString()}`);
              }
        },
        logout(){
            this.$http.get('auth/logout')
            .then(res=>{
                if(!res.data.loggedIn){
                   this.$router.push('/seller/login');
                }
            })
        },
        updateProduct(){
            //add more product [stock-up]
            this.updating=true;
            this.$http.put(`products/${this.productID}`,{qty:this.qty})
            .then(res=>{
                this.updating=false;
                console.log(res.data);
                this.shop.products.splice(this.i,1,res.data);
                this.addProduct=false;
                this.showaddProduct=false;
            })
        }
    },
    created(){
          this.$http.get('auth/status')
         .then(res=>{
             if(res.data.loggedIn){
                 this.$http.get('shops/myShop')
                 .then(res=>{
                     this.gettingShop=false;
                     this.shop=res.data;
                     this.addProductRoute=`/newProduct/${this.shop.country}/${this.shop._id.toString()}`;
                     this.homeRoute=`/markets/${this.shop.country}`;
                     // decide the badge of the store based on if it is approved or not
                     if(this.shop.isApproved){
                            this.check = `https://s2.svgbox.net/hero-outline.svg?color=005B94&ic=badge-check`
                     }else{
                            this.check = `https://s2.svgbox.net/hero-outline.svg?color=red&ic=ban`
                     }
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
    min-height: 100%;
    background: #E5E5E5;
}
nav{
    padding: 10px 30px;
    margin-bottom: 10px;
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    background: #ffffff;
}
nav a{
    text-decoration: none;
}
nav div{
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #005B94;
}
nav div p{
   margin-right: 8px;
}
h3{
    color: #005B94;
    font-size: 2rem;
    line-height: 130%;
}
div.content{
    width: 90%;
    margin: auto;
    margin-top: 62px;
    padding: 15px 0px;
    position: relative;
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
    background: #ffffff;
    border: #66C9FF 0.5px solid;
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
}
button{
    height: 33px;
    width: 80%;
    margin:10px auto 0px auto;
    display: block;
    outline: none;
    border: none;
    border-radius: 4px;
    color: #ffffff;
    font-size: 0.85rem;
    background: #66C9FF;
    cursor: pointer;
}
button:hover{
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
}
div.addProduct{
    height: 100vh;
    width:100%;
    background: rgba(192, 189, 189, 0.65);
    margin: auto;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    z-index: -4;
    transition: opacity ease-in-out 0.4s;
}
div.addProduct.fade-away{
     opacity: 1;
     z-index: 10;
}
div.addProduct div.add-content{
    width: 35%;
    height: 40%;
    background: #E5E5E5;
    padding: 18px;
    border-radius: 4px;
}
div.addProduct div.add-content div.decide{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #00253C;
    font-size: 1.4rem;
}
div.addProduct div.add-content div.decide img{
    width: 37px;
    height: 37px;
    cursor: pointer;
}
div.addProduct input{
    height: 40px;
    width: 100%;
    padding: 10px;
    margin: 20px 0px;
}
div.product button{
    width: 70%;
    display: block;
    margin: auto;
    background: chartreuse;
    height: 40px;
    cursor: pointer;
}
p.title{
    color: #005B94;
    font-size: 1.1rem;
    margin-bottom: 10px;
    font-weight: 700;
}
@media only screen and (max-width: 720px) {
        nav{
            padding: 10px 15px;
            margin-bottom: 10px;
        }
        div.content{
            width: 95%;
        }
        div.detail{
            width: 100%;
            order: 1;
        }
        div.right{
            width: 60%;
            margin:20px 0 20px auto;
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
        div.product-container{
            justify-content: center;
        }
        div.addProduct div.add-content{
            width: 80%;
            height: 35%;
        }
}

</style>