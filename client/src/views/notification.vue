<template>
   <div class="notification-container">
          <p>{{name}}</p>
   </div>
</template>

<script>
export default {
      name:"Notification",
      data(){
          return{
              name:'Notification'
          }
      }
}
</script>

<style scoped>
    div.notification-container{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>