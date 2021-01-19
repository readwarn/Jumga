<template>
    <div class="buttons">
         <button class="minus" :disabled="disable" @click="$emit('minusclick')">−</button>
         <img v-if="disable" src="https://s2.svgbox.net/loaders.svg?ic=tail-spin" height="30" width="30" alt="updating">
         <button class="plus" :disabled="disable" @click="$emit('plusclick')">+</button>
    </div>
</template>

<script>
export default {
    props:['disable']
}
</script>

<style>
 div.buttons{
     display: flex;
     justify-content: space-between;
     align-items: center;
     width: 150px;
     height: 35px;
 }
 div.buttons button{
     width: 30%;
     height: 100%;
     outline: none;
     border: none;
     cursor: pointer;
     color: #ffffff;
     font-size: 1.3rem;
 }
 div.buttons button:hover{
     box-shadow: 0px 1px 1px 0px rgba(102,96,102,1);
 }
 div.buttons button.plus{
     background: #66C9FF;
 }
 div.buttons button.minus{
     background: #219653;
 }
 div.buttons button:disabled{
     background: rgb(90, 88, 88);
     cursor: not-allowed;
 }

</style>