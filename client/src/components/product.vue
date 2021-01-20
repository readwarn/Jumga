<template>
     <div class="product-card">
            <div class="product-image">
                <img src="../assets/product.svg" alt="">
            </div>
            <div class="details">
                <p>{{name}}</p>
                <p>₦{{price}}</p>
                <p v-if="qty">X{{qty}}</p>
            </div>
       </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:['name','price','qty']
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
    padding: 7px;
    border: olivedrab 1px solid;
}
div.details p{
    font-size: 0.9rem;
    line-height: 133%;
}
div.details p:nth-child(1){
    margin-bottom: 5px;
    font-size: 0.85rem;
    color: #00253C;
}
div.details p:nth-child(2){
    color: #219653;
    font-size: 1rem;
    font-weight: 700;
}
div.details p:nth-child(3){
    text-align: right;
}

@media only screen and (max-width: 720px) {
     div.product-card{
        margin-right: 10px;
        width: 225px;
     }
}
</style>