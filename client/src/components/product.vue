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
                     <img src="https://s2.svgbox.net/materialui.svg?color=5b5f5f&ic=add_shopping_cart" v-if="!carting" height="30" width="30"  alt="cart">
                     <img src="https://s2.svgbox.net/loaders.svg?color=5b5f5f&ic=elastic-spinner" alt="loader" v-if="carting"  height="30" width="30">
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
     width: 250px;
     padding: 5px;
     background: #ffffff;
     cursor: pointer;
     border: 1px solid #00253C;
     margin-bottom: 25px;
     margin-right: 25px;
 }
 div.product-card:hover{
     box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
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
    border: #00253C 1px solid;
}
div.details p{
    font-size: 0.9rem;
    line-height: 133%;
}
div.details button{
    height: 80%;
    width: 20%;
    padding: 5px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    outline: none;
    background-color:#E5E5E5;
}

div.details button:hover{
    box-shadow: 0px 1px 1.5px 0px rgba(102,96,102,1);
}
div.details p.one{
    margin-bottom: 5px;
    font-size: 0.85rem;
    color: #00253C;
}
div.details p.two{
    color: #219653;
    font-size: 1rem;
    font-weight: 700;
}


@media only screen and (max-width: 400px) {
     div.product-card{
        margin-right: 10px;
        width: 280px;
     }
}
</style>