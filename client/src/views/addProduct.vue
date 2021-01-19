<template>
     <div class="container">
          <nav>
              <h3>Jumga</h3>
          </nav>
          <div class="upload">
            <p>Add new product</p>
            <p>{{error}}</p>
            <label for="file" class="file" :style="{backgroundImage:product.displayPicture}">
                <input type="file" name="file" id="file" @change="uploadProductImage">
                <img src="../assets/Cloud.svg" alt="">
                <p>Browse files</p>
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
                    <input type="text" id="price" v-model="product.price">
                </div>
            </div>
            <label for="del">Delivery fee</label>
            <input type="number" id="del" v-model="product.delivery">
            <label for="country">Country</label>
             <select id="country" v-model="product.country">
                 <option value="NG">Nigeria</option>
                 <option value="GH">Ghana</option>
                 <option value="KE">Kenya</option>
             </select>
            <div class="input-box">
                 <button @click="$router.push('/shops/myShop')">CANCEL</button>
                 <button @click="addProduct()">ADD AND PROCEED</button>
            </div>
        </div>
     </div>
</template>

<script>
export default {
     name:"newProduct",
     data(){
       return{
           error:'',
           product:{
               name:'',
               delivery:100,
               price:'',
               displayPicture:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYwGRJNe1c9WCBU2aOwYqPwLf2uI0E8hD-Q&usqp=CAU',
               country:'',
               description:'',
               qty:1
           }
       }
     },
     created(){
            this.$http.get('http://localhost:3000/auth/status')
           .then(res=>{
               if(!res.data.loggedIn){
                 this.$router.push('/seller/login');
               }
           })
     },
     methods:{
         addProduct(){
             this.$http.put(`http://localhost/shops/${this.$route.params.id}`,this.product)
             .then(res=>{
                 console.log(res.data);
          this.product={
               name:'',
               price:'',
               displayPicture:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYwGRJNe1c9WCBU2aOwYqPwLf2uI0E8hD-Q&usqp=CAU',
               country:'',
               description:'',
               qty:1
          }
             });
         },
         uploadProductImage(e){
            const image = e.target.files[0];
            if(image.size<150000){
                const formData = new FormData();
                formData.append('file', image);
                formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
                fetch(this.CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
                })
                .then(response => response.json())
                .then((data) => {
                 this.product.displayPicture=data.secure_url;
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
        margin-top: 40px;
    }
    label.file{
        margin: 20px 0px;
        height:120px;
        border:1.5px dashed #66C9FF;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: 100% 100%;
        background-position: center;
    }
    label.file input{
        display: none;
    }
    label.file img{
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