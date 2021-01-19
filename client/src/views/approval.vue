<template>
   <div class="approval-container">
          <nav>
              <h3>Jumga</h3>
          </nav>
          <img src="../assets/dispatch.svg" alt="payment">
          <p class="info">Your accout has been approved and a dispatch rider has been assigned to you.</p>
          <button>Proceed to dashboard</button>
   </div>
</template>

<script>
export default {
      name:"Approval",
      data(){
          return{
            
          }
      }
}
</script>

<style scoped>
    div.approval-container{
        height: 100%;
    }
    nav{
        padding: 10px 50px;
    }
    h3{
        color: #005B94;
        font-size: 2rem;
        line-height: 130%;
    }
    img{
        width: 60%;
        height: 50%;
        display: block;
        margin: auto;
        margin-bottom: 37px;
    }
    p.info{
        font-size: 1.1rem;
        line-height: 128%;
        width: 60%;
        text-align: center;
        color: #00253C;
        margin: auto;
        margin-bottom: 15px;
    }
    button{
        height: 40px;
        width: 200px;
        background: #66C9FF;
        color: #ffffff;
        outline:none;
        border: none;
        display: block;
        margin: auto;
        margin-bottom: 15px;
    }
    button:hover{
         box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    }

    @media only screen and (max-width: 720px) {
        p.info{
            width: 75%;
        }
        img{
            height: 43%;
        }
        nav{
            padding: 10px 15px;
            margin-bottom: 10px;
        }
    }
</style>