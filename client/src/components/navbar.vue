<template>
<div>
   <nav> 
        <router-link :to="homeLink"> 
            <div class="brand">
                <h3>Jumga</h3>
                <img src="https://s2.svgbox.net/hero-outline.svg?color=219653&ic=shopping-bag" height="30" width="30" alt="brand">
            </div>
        </router-link>
        <div class="info">
             <div class="user" @click.stop="$emit('profileclick')">
                   <img src="https://s2.svgbox.net/hero-outline.svg?color=005B94&ic=user" height="25" width="25" alt="right">
                   <p>{{user.username}}</p>
                   <img :class="{'rotate':profile}" id="caret" src="https://s2.svgbox.net/octicons.svg?color=005B94&ic=chevron-right" height="14" width="14" alt="right">
             </div>
             <div class="profile" v-if="profile">
                <router-link :to="cartLink">My Order</router-link>
                <button @click="logout()">LOG OUT</button>
            </div>
             <router-link :to="cartLink">
                 <div class="cart">
                        <img src="https://s2.svgbox.net/hero-outline.svg?color=005B94&ic=shopping-cart" width="35" height="35" alt="cart">
                        <div>
                            <p>{{item}}</p>
                        </div>
                 </div>
             </router-link>
        </div>
    </nav>
</div>
    
</template>

<script>
export default {
    name:"Navbar",
    props:['cc','item','profile'],
    data(){
        return{
            cartLink:'/cart/ng',
            homeLink:'/markets/ng',
            user:{
                username:""
            }
        }
    },
    created(){
         this.$http.get('users/currentUser')
        .then(res=>{
            this.user=res.data;
        })
        this.cartLink=`/cart/${this.cc}`;
        this.homeLink=`/markets/${this.cc}`;
    },
    methods:{
        logout(){
            this.$http.get('auth/logout');
            this.$router.push('/buyer/login');
        }
    }
}
</script>

<style scoped>
nav{
    padding: 10px 35px;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
h3{
    color: #005B94;
    font-size: 2rem;
    line-height: 130%;
    margin-right: 5px;
}
div.brand{
    cursor: pointer;
}
div.brand,div.info{
    display: flex;
    align-items: center;
}
div.info{
  position: relative;
}
div.cart{
    width: 40px;
    height: 40px;
    position: relative;
}
div.cart div{
    width: 21px;
    height: 21px;
    background: #219653;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: #ffffff;
    transform: translate(18px,-3px);
}
a{
    text-decoration: none;
}
div.user{
    display: flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
}
div.user img.rotate{
    transform: rotate(90deg);
     transition: transform 0.3s linear;
}
div.user img#caret{
    transition: transform 0.3s ease-in-out;
}
div.user img:nth-child(1){
    margin-right: 4px;
}
div.profile{
    width: 180px;
    padding: 10px;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    position: absolute;
    transform: translate(-70px,50px);
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    background: #ffffff;
}

div.profile a{
    color: #005B94;
    font-size: 0.9rem;
    margin-bottom: 17px;
}
div.profile a:hover{
    color: #219653;
}
div.profile button{
    background: #219653;
    height: 33px;
    outline: none;
    border: none;
    cursor: pointer;
    width: 100%;
    color: #ffffff;
}
div.profile button:hover{
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
}

@media only screen and (max-width: 720px) {
nav{
    padding: 10px 15px;
}
h3{
    font-size: 1.7rem;
}
div.brand img{
    width: 23px;
    height: 23px;
}
div.user img:nth-child(1){
    width: 20px;
    height: 20px;
}
div.cart img{
    width: 30px;
    height: 30px;
}
}

</style>