<template>
   <div class="approval-container">
          <nav>
              <h3>Jumga</h3>
          </nav>
          <img src="../assets/dispatch.svg" alt="payment">
          <p class="info" v-if="$route.params.id==='seller'">Your accout has been approved and a dispatch rider has been assigned to you.</p>
          <p class="info" v-if="$route.params.id==='buyer'">Your payment was successful and your order has been shipped.</p>
          <button v-if="$route.params.id==='seller'" @click="$router.push('/shops/myShop')">Proceed to dashboard</button>
          <button v-if="$route.params.id==='buyer'" @click="$router.push('/markets')">Jumga</button>
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
    
    
</style>