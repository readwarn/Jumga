<template>
   <div class="onboard-container">
         <nav>
           <h3>Jumga</h3>
         </nav>
         <section class="left">
               <h2>Speed your business growth online.</h2>
               <p class="subtitle">Get across to people in Nigeria, Ghana, Kenya and UK easily. Join Jumga!</p>
               <ul>
                   <li> <img src="../assets/Subtract.svg" alt="bullet"> <p>Earn more money</p></li>
                   <li> <img src="../assets/Subtract.svg" alt="bullet"> <p>Communication is easy</p></li>
                   <li> <img src="../assets/Subtract.svg" alt="bullet"> <p>You are given a dispatch rider</p> </li>
                   <li> <img src="../assets/Subtract.svg" alt="bullet"> <p>You are in control</p></li>
                   <li> <img src="../assets/Subtract.svg" alt="bullet"> <p>It is entirely online, no need for meeting</p></li>
               </ul>
               <div class="button-box">
                      <button  @click="$router.push('/seller/register')">GET STARTED</button>
                      <button  @click="$router.push('/seller/login')">LOGIN</button>
               </div>
         </section>
         <section class="right">
            
         </section>
   </div>
</template>

<script>
export default {
      name:"Onboard",
      data(){
          return{
              name:'Onboard'
          }
      }
}
</script>

<style scoped>
    div.onboard-container{
       background: #FFFFFF;
       height: 100%;
       min-height: 100%;
       padding: 0px 0px 0px 100px; 
       display: flex;
       flex-wrap: wrap;
       justify-content: space-between;
    }
    nav{
        position: absolute;
        padding: 10px 0px;
        width: calc(100% - 100px);
    }
    section.left{
        width: 44%;
        margin-top: 80px;
    }
    section.right{
        width: 54%;
        background: url('../assets/rafiki.svg');
        background-size: 100% 100%;
        margin-top: 80px;
    }
    h3{
        color: #005B94;
        font-size: 2rem;
        line-height: 130%;
    }
    h2{
        color: #005B94;
        font-size: 2.4rem;
        line-height: 130%;
        margin-bottom: 1rem;
    }
    p.subtitle{
        line-height: 135%;
        font-size: 17px;
        font-feature-settings: "liga" off;
        margin-bottom: 1.5rem;
        color: #005B94;
    }
    ul{
        list-style: none;
        margin-bottom: 1.5rem;
        color: #828282;
    }
    ul li{
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    li img{
        width: 18px;
        height: 18px;
        margin-right: 10px;
    }
    div.button-box{
        display: flex;
        width: 250px;
        justify-content: space-between;
    }
    div.button-box button{
        outline: none;
        border: none;
        color: #ffffff;
        width: 120px;
        height: 40px;
        cursor: pointer;
    }
    div.button-box button:hover{
       box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    }
    div.button-box button:nth-child(1){
        background: #219653;
    }
    div.button-box button:nth-child(2){
        background: #66C9FF;
    }

    @media only screen and (max-width: 900px) {
        div.onboard-container{
            padding: 0px 0px 30px 30px;
        }
        section.right{
            width: 75%;
            height: 40%;
            order: 0;
        }
        section.left{
            width: 95%;
            order: 1;
            margin-top: 0px;
            padding-bottom: 30px;
        }
        nav{
             width: calc(100% - 33px);
        }
    }

</style>