<template>
     <div class="product-card" @click="$emit('productclick')">
            <div class="product-image">
                <img :src="avi" alt="">
            </div>
            <div class="details">
                <div>
                    <p class="one">{{name}}</p>
                    <p class="two">₦{{price}}</p>
                </div>
                <button v-if="!qty" @click.stop="$emit('cartclick')">
                     <p v-if="!carting">Cart</p>
                     <img src="https://s2.svgbox.net/loaders.svg?color=5b5f5f&ic=elastic-spinner" alt="loader" v-if="carting"  height="17" width="17">
                </button>
                <p class="three" v-if="qty">{{qty}} Units</p>
            </div>
       </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:['name','price','qty','avi','carting'],
}
</script>

<style scoped>
 div.product-card{
     width: 245px;
     padding: 5px;
     background: #ffffff;
     cursor: pointer;
     margin-bottom: 25px;
     margin-right: 25px;
     box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
     border-radius: 3px;
 }
 div.product-card:hover{
     background: #fcfafa;
 }
 div.product-image{
     height: 230px;
 }
div.product-image img{
     height: 100%;
     width: 100%;
}
div.details{
    width: 100%;
    padding: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
div.details p{
    font-size: 0.9rem;
    line-height: 133%;
}
div.details button{
    height: 80%;
    width: 25%;
    padding: 8px;
    cursor: pointer;
    box-shadow: 0px 1px 1.5px 0px rgba(102,96,102,1);
    border-radius: 2px;
    outline: none;
    border: none;
    background: none;
}

div.details button:hover{
    border: 1.4px solid #219653;
}
div.details p.one{
    margin-bottom: 5px;
    font-size: 0.95rem;
    color: #00253C;
}
div.details p.two{
    color: #219653;
    font-size: 1rem;
    font-weight: 700;
}


@media only screen and (max-width: 600px) {
     div.product-card{
        margin-right: 10px;
        width: 200px;
     }
}
</style>