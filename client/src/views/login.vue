<template>
   <div class="login-container" v-if="($route.params.id==='seller')||($route.params.id==='buyer')">
         <nav><router-link to="/"><h3>Jumga</h3></router-link></nav>
         <div class="welcome">
               <h3>Welcome back,</h3>
               <h4>Sign in to continue.</h4>
         </div>
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
                     this.$http.post(`auth/${this.$route.params.id}/login`,user)
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
   display: flex;
   justify-content: space-between;
   align-items: flex-start;
   flex-wrap: wrap;
}
nav{
    padding: 10px 50px;
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
    border: 1.5px solid #005B94;
    border-radius: 8px;
    padding: 25px;
    margin-top: 10%;
    margin: auto;
}
div.welcome{
    margin-top: 65px;
    width: 40%;
    padding: 10% 20px;
    height: calc(100vh - 67px);
}
div.welcome h3{
    font-size: 3rem;
}
div.welcome h4{
    font-size: 2.2rem;
    color: #66C9FF;
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
        margin-top: 0px;
        width: 90%;
    }
    div.welcome{
        width: 100%;
        height: auto;
        padding: 10px 20px;
    }
    div.welcome h3{
        font-size: 2.2rem;
    }
    div.welcome h4{
        font-size: 1.5rem;
    }
}
</style>