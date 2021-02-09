<template>
     <div class="container">
          <nav>
              <h3>Jumga</h3>
          </nav>
          <div class="upload">
            <router-link to="/shops/myShop">&#60; back</router-link>
            <label for="file" class="file">
                <img :src="product.displayPicture" alt="loader" id="bg">
                <loader v-if="uploading" />
                <div>
                    <input type="file" name="file" id="file" @change="uploadProductImage">
                    <img src="../assets/Cloud.svg" alt="">
                    <p v-if="!uploaded">Click to choose image</p>
                </div>
            </label>
            <label for="name">Product name</label>
            <input type="text" id="name" v-model="product.name">
            <label for="desc">Product Description</label>
            <textarea name="desc" id="desc" cols="30" rows="10" v-model="product.description"></textarea>
            <div class="input-box">
                <div>
                    <label for="qty">Quantity</label> 
                    <input type="number" min="1" id="qty" v-model="product.qty">
                </div>
                <div>
                    <label for="price">Price</label> 
                    <input type="number" min="0" id="price" v-model="product.price">
                </div>
            </div>
            <label for="del">Delivery fee</label>
            <input type="number" id="del" v-model="product.delivery">
            <p class="error">{{error}}</p>
            <div class="input-box">
                 <router-link to="/shops/myShop"><button>CANCEL</button></router-link>
                 <img v-if="loading" src="https://s2.svgbox.net/loaders.svg?ic=tail-spin" height="30" width="30" alt="updating">
                 <button v-if="!loading"  @click="addProduct()">ADD AND PROCEED</button>
            </div>
        </div>
     </div>
</template>

<script>
import Loader from '../components/loader.vue';
export default {
     name:"newProduct",
     components:{Loader},   
     data(){
       return{
           error:'',
           loading:false,
           fieldsVerified:false,
           uploading:false,
           uploaded:false,
           product:{
               name:'',
               delivery:100,
               price:1,
               displayPicture:'https://www.publicdomainpictures.net/pictures/30000/velka/plain-white-background.jpg',
               description:'',
               qty:1
           }
       }
     },
     created(){
            this.$http.get('auth/status')
           .then(res=>{
               if(!res.data.loggedIn){
                 this.$router.push('/seller/login');
               }
           })
     },
     methods:{
         verifyProductField(){
             this.fieldsVerified=false;
             const fields=['name','delivery','price','displayPicture','description','qty'];
             for(let i=0;i<fields.length;i++){
                 if(this.product[fields[i]]===''){
                     this.error=`Please fill the product ${fields[i]}`;
                     return;
                 }
             }
             this.error='';
             this.fieldsVerified=true;
         },
         addProduct(){
              this.verifyProductField();
              if(this.fieldsVerified){
                     this.loading=true;
                     this.product.price = parseFloat(this.product.price);
                     this.product.qty   = parseInt(this.product.qty);
                     this.product.country = this.$route.params.cc;
                     this.$http.put(`shops/${this.$route.params.id}`,this.product)
                    .then(res=>{ 
                    this.loading=false;     
                    this.product={
                        name:'',
                        price:'',
                        displayPicture:'https://www.publicdomainpictures.net/pictures/30000/velka/plain-white-background.jpg',
                        description:'',
                        qty:1
                    }
                    if(!res.data.isApproved){
                        this.$router.push(`/payment/${this.$route.params.cc.toString()}/${this.$route.params.id.toString()}`);
                    }
              });
              }
         },
         uploadProductImage(e){
            const image = e.target.files[0];
            if(image.size<150000){
                this.uploading=true;
                const formData = new FormData();
                formData.append('file', image);
                formData.append('upload_preset', 'qv83yxtp');
                fetch('https://api.cloudinary.com/v1_1/dmigpnpar/image/upload', {
                method: 'POST',
                body: formData,
                })
                .then(response => response.json())
                .then((data) => {     
                 this.product.displayPicture=data.secure_url;
                 this.error="";
                 this.uploading=false;
                 this.uploaded=true;
                })
                .catch(err => console.error(err));
            }else{
                this.error='File size is too big';
            }
      }
     }
}
</script>

<style scoped>
     div.container{
         height: 100%;
     }
    nav{
        padding: 10px 50px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        border-bottom: 1.5px solid #005B94;
        background: #ffffff;
        z-index: 10;
    }
    h3{
        color: #005B94;
        font-size: 2rem;
        line-height: 130%;
    }
    div.upload{
        width: 45%;
        margin: auto;
        padding-bottom: 50px;
        margin-top: 70px;
    }
    div.upload a{
        color: #005B94;
        text-decoration: none;
    }
    label.file{
        margin: 5px 0px 20px 0px;
        height:120px;
        border:1.5px dashed #66C9FF;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: 100% 100%;
        background-position: center;
        position: relative;
    }
    label.file input{
        display: none;
    }
    label.file img{
        margin-bottom: 10px;
    }
    img#bg{
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    p.error{
        font-size: 0.85rem;
        color: red;
        margin-bottom: 10px;
    }
    label{
        margin-bottom: 10px;
        display: block;
    }
    textarea,input{
        margin-bottom: 17px;
    }
    input,select,button{
        height: 40px;
    }
    input,select,textarea{
        width: 100%;
        background: #F0F8FC;
        outline: none;
        border: none;
        margin-bottom: 17px;
        padding:0px 15px; 
    }
    input:hover,select:hover{
        border: #F0F8FC 1px solid;
    }
    button{
        width: 150px;
        outline: none;
        border: none;
        cursor: pointer;
    }
    div.input-box button:nth-child(1){
        background: #F2F2F2;
        color: #00253C;
    }
    div.input-box button:nth-child(2){
        background: #66C9FF;
        color: #ffffff;
    }
    button:hover{
         box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    }
    div.input-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 17px;
    }
    div.input-box div{
        width: 40%;
    }
    div.input-box input{
        margin-bottom: 0;
    }
    @media only screen and (max-width: 720px) {
        nav{
            padding: 10px 15px;
            margin-bottom: 10px;
        }
        div.upload{
           width: 85%;
        }
        button{
            width: 120px;
            font-size: 0.7rem;
        }
    }
</style>