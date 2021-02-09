<template>
    <div class="buttons" :style="{width:width +'%'}">
         <button class="minus" :disabled="disable" @click="$emit('minusclick')">−</button>
         <img v-if="disable" src="https://s2.svgbox.net/loaders.svg?ic=tail-spin" height="30" width="30" alt="updating">
         <button v-if="!disable">{{value}}</button>
         <button class="plus" :disabled="disable" @click="$emit('plusclick')">+</button>
    </div>
</template>

<script>
export default {
    props:['disable','value','width']
}
</script>

<style>
 div.buttons{
     display: flex;
     justify-content: space-between;
     align-items: center;
     height: 30px;
 }
 div.buttons input{
     width:33.33%;
     height: 100%;
 }
 div.buttons button{
     width: 33.33%;
     height: 100%;
     outline: none;
     border: 1px solid black;
     cursor: pointer;
     color: #ffffff;
     background: gainsboro;
     font-size: 1.3rem;

 }
 div.buttons button:hover{
     box-shadow: 0px 1px 1px 0px rgba(102,96,102,1);
 }

 div.buttons button:disabled{
     background: rgb(231, 229, 229);
     cursor: not-allowed;
 }

</style>