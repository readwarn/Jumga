<template>
   <div class="login-container" v-if="($route.params.id==='seller')||($route.params.id==='buyer')">
         <nav><h3>Jumga</h3></nav>
         <div class="content">
             <p class="error">{{error}}</p>
             <label for="username">Username</label>
             <input type="text" name="username" id="username" v-model="user.username">
             <label for="pass">Password</label>
             <input type="text" name="pass" id="pass" v-model="user.password">
             <img v-if="loading" src="https://s2.svgbox.net/loaders.svg?ic=tail-spin" height="30" width="30" alt="updating">
             <button v-if="!loading" @click="login(user)">LOGIN</button>
             <p id="huh">Don't have an account? <router-link :to="registerRoute">Register</router-link></p>
         </div>
   </div>
</template>

<script>
export default {
      name:"Login",
      data(){
          return{
              error:'',
              loading:false,
              registerRoute:'/register/buyer',
              user:{
                  username:'',
                  password:''
              }
          }
      },
      methods:{
          login(user){
              if(this.user.username==='' || this.user.password===''){
                   this.error='Fill all details'
              }else{
                     this.loading=true;
                     this.$http.post(`http://localhost:3000/auth/${this.$route.params.id}/login`,user)
                    .then(res=>{
                        this.loading=false;
                        if(res.data.loggedIn){
                            if(this.$route.params.id==='seller'){
                                this.$router.push('/shops/myShop');
                            }else{
                                this.$router.push('/markets');
                            }
                        }else{
                              if(!res.data.isSeller){
                                  this.error="Invalid Details"
                              }else{
                                  this.error=res.data.message;
                              }
                        }
                    })
                    .catch(err=>{
                        console.log(err.message);
                    })
              }
          }
      },
      created(){
           this.registerRoute=`/${this.$route.params.id}/register`;
      }
}
</script>

<style scoped>
div.login-container{
   height: 100%;
}
nav{
    padding: 10px 50px;
    margin-bottom: 10px;
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
}
h3{
    color: #005B94;
    font-size: 2rem;
    line-height: 130%;
}
div.content{
    width: 50%;
    margin: auto;
    border: 1px solid black;
    padding: 25px;
    margin-top: 80px;
}
p.error{
    color: red;
    margin-bottom: 7px;
}
label{
    font-size: 0.85em;
    margin-bottom: 7px;
}
input,button{
    border: none;
    outline: none;
    height: 40px;
    padding: 15px;
    display: block;
    margin: auto;
}
input{
    width: 100%;
    margin-bottom: 20px;
    background: #F0F8FC;
}
a{
    text-decoration: none;
    color:#66C9FF;
}
button{
    margin-bottom: 5px;
    padding: 0;
    width: 60%;
    background: #66C9FF;
}
p#huh{
    margin-top: 17px;
    text-align: center;
}
@media only screen and (max-width: 720px) {
    nav{
        padding: 10px 15px;
        margin-bottom: 10px;
    }
    div.content{
        width: 95%;
    }
}
</style>