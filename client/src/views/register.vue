<template>
   <div class="register-container" v-if="($route.params.id==='seller') ||($route.params.id==='buyer')">
           <nav>
               <h3>Jumga</h3>
           </nav>
           <div class="steps" v-if="$route.params.id==='seller'">
               <div class="step">
                      <div class="step-index" @click="showDetail('seller')">
                           <p>1</p>
                      </div>
                      <p class="step-name">Seller’s Details</p>
               </div>
               <div class="rule">

               </div>
                <div class="step">
                      <div class="step-index" @click="showDetail('store')">
                           <p>2</p>
                      </div>
                      <p class="step-name">Store Details</p>
               </div>
               <div class="rule">

               </div>
               <div class="step">
                      <div class="step-index"  @click="showDetail('bank')">
                           <p>3</p>
                      </div>
                      <p class="step-name">Bank account</p>
               </div>
           </div>
           <div class="details" v-if="userDetail">
                <p class="error">{{error}}</p>
                <label for="username">Username</label>
                <input type="text" id="username" v-model="seller.username">
                <label for="password">Password</label>
                <input type="text" id="password" v-model="seller.password">
                <label for="username">Email</label>
                <input type="email" id="email" v-model="seller.email">
                <label for="country">Country</label>
                <select  id="country" v-model="seller.country">
                    <option value="ng">Nigeria</option>
                    <option value="gh">Kenya</option>
                    <option value="ke">Ghana</option>
                </select>
                <img v-if="logging" src="https://s2.svgbox.net/loaders.svg?color=66C9FF&ic=spinner" alt="loader" width="32" height="32">
                <button v-if="$route.params.id==='buyer' && !logging" @click="register($route.params.id)">SIGN UP</button>
                <button @click="showDetail('store')" v-if="$route.params.id==='seller'">Next</button>
                <p id="huh">Already have an account? <router-link :to="loginRoute">Login</router-link></p>
           </div>
            <div class="details" v-if="storeDetail">
                <label for="storeName">Store Name</label>
                <input type="text" id="storeName" v-model="seller.shopname">
                <label for="description">Store Description</label>
                <textarea  id="description" cols="30" rows="10" v-model="seller.shopDescription"></textarea>
                <label for="phone">Phone</label>
                <input type="text" id="phone" v-model="seller.phone">
                <label for="add">Address</label>
                <input type="text" id="add" v-model="seller.address">
                <button @click="showDetail('bank')">Next</button>
           </div>
           <div class="details" v-if="accountDetail">
                <p class="error">{{error}}</p>
                <p class="info">{{accountName}}</p>
                <div class="loader bank" v-if="verifying">
                       <p>Verifying bank</p>
                       <img src="https://s2.svgbox.net/loaders.svg?ic=three-dots" alt="loader" width="32" height="32">
                </div>
                 <div class="loader bank" v-if="bankLoading">
                       <p>Loading bank select another country to refresh</p>
                       <img src="https://s2.svgbox.net/loaders.svg?ic=three-dots" alt="loader" width="32" height="32">
                </div>
                <div class="loader bank" v-if="creating">
                       <p>Creating account id</p>
                       <img src="https://s2.svgbox.net/loaders.svg?ic=three-dots" alt="loader" width="32" height="32">
                </div>
                <label for="account">Account Number</label>
                <input type="text" id="account" v-model="accountNumber">
                <label for="country">Country</label>
                <select id="country" v-model="country" @change="getBanks()">
                    <option value="ng">Nigeria</option>
                    <option value="gh">Ghana</option>
                    <option value="ke">Kenya</option>
                </select>
                <label for="bank" >Bank</label>
                <select id="bank" v-model="userBankCode" @change="console(userBankCode)">
                    <option v-for="(bank,index) in banks" :key="index" :value="bank.code">
                         {{bank.name}}
                    </option>
                </select>
                <button id="ve" @click="verifyBank()" :disabled="verifying">Verify Account</button>
                <img v-if="logging" src="https://s2.svgbox.net/loaders.svg?color=66C9FF&ic=spinner" alt="loader" width="32" height="32">
                <button :disabled="!bankVerified && !creating" @click="register($route.params.id)">Sign Up</button>
           </div>
   </div>
</template>

<script>
export default {
      name:"Register",
      data(){
          return{
              seller:{
                 username:'',
                 password:'',
                 shopname:'',
                 email:'yusufmosobalaje@gmail.com',
                 shopDescription:'',
                 country:'',
                 phone:'',
                 address:'',
                 shopID:'RS_9F16F4F847387A9808A177EC80DB969F',
              },
              loading:true,
              accountName:'',
              accountDetail:false,
              userDetail:true,
              storeDetail:false,
              bankLoading:true,
              fieldsVerified:false,
              bankVerified:false,
              detailsVerified:false,
              verifying:false,
              creating:false,
              logging:false,
              buyerFields:false,
              cc:'NG',
              country:'NG',
              accountNumber:'',
              banks:[{
                  name:'Reselect Country',
                  code:'234'
              }],
              error:'',
              errorField:'',
              userBankCode:'',
              loginRoute:'/register/buyer'
          }
      },
      methods:{
         showDetail(detail){
                    if(detail==='seller'){
                        this.userDetail=true;
                        this.storeDetail=false;
                        this.accountDetail=false;
                    }else if(detail==='store'){
                        this.userDetail=false;
                        this.storeDetail=true;
                        this.accountDetail=false;
                    }else{
                        this.userDetail=false;
                        this.storeDetail=false;
                        this.accountDetail=true;
                    }
         },
         console(data){
              console.log(data);
         },
         getBanks(){
             this.$http.get(`http://localhost:3000/flutter/banks/${this.country}`).then(res=>{
                    this.banks=res.data.data;
                    this.bankLoading=false;
             })
         },
         createsubaccount(){
              this.creating=true;
              const sub = {
                        account_bank: this.userBankCode,
                        account_number: this.accountNumber,
                        business_name: this.seller.shopname,
                        business_mobile:this.seller.phone,
                        business_email:this.seller.email,
                        country:this.country,
                        split_value: 0.975
               }
               console.log(sub);
               this.error='';
               this.$http.post('http://localhost:3000/flutter/subaccounts',
                    {
                        "account_bank": `${sub.account_bank}`,
                        "account_number": `${sub.account_number}`,
                        "business_name": `${sub.business_name}`,
                        "business_email": `${sub.business_email}`,
                        "business_mobile": `${sub.business_mobile}`,
                        "country": `${sub.country}`,
                        "split_value": 0.975
                    })
              .then(res=>{
                  this.creating=false;
                  if(res.data.status==='success'){
                       this.shopID=res.data.data.subaccount_id;
                       this.detailsVerified=true;
                  }else{
                      this.error=res.data.message;
                  }
              })
              .catch(err=>{
                  console.log(err.message);
              })
         },
         verifyBank(){
             const bank = {
                   account_number: this.accountNumber,
                   account_bank: this.userBankCode
             }
             if(this.accountNumber===""){
                 this.error="Input Account Number";
                 return;
             }
             if(this.userBankCode===''){
                 this.error="Select a bank";
                 return;
             }
             this.accountName='';
             this.error='';
             this.verifying=true;
             this.$http.post('http://localhost:3000/flutter/accounts/verify',bank)
             .then(res=>{
                   this.verifying=false;
                   if(res.data.message){
                       if(res.status="success"){
                            this.error='';
                            this.accountName=`Account Name: ${res.data.data.account_name}`;
                            this.bankVerified=true;
                       }else{
                           this.error=res.data.message;
                       }
                   }else{
                       this.error="Error occured! Try again";
                   }
             })
             .catch(err=>{
                 this.error=err.message;
             })
         },
         verifyBuyerField(){
               const fields=['username','password'];
               for(let i=0;i<fields.length;i++){
                 if(this.seller[fields[i]]===''){
                     this.error=`Please fill your ${fields[i]}`;
                     console.log(`Please fill your ${fields[i]}`)
                     return;
                 }
             }
             this.error='';
             this.buyerFields=true;
         },
         verifySellerField(){
             const fields=['username','password','shopname','shopDescription','phone','address'];
             for(let i=0;i<fields.length;i++){
                 if(this.seller[fields[i]]===''){
                     if(fields[i]==='username' || fields[i]==='password'){
                         this.error=`Please go to step 1 to fill your ${fields[i]}`;
                     }else{
                        this.error=`Please go to step 2 to fill your ${fields[i]}`;
                     }
                     return;
                 }
             }
             this.error='';
             this.fieldsVerified=true;
         },
         verifyDetails(){
                this.verifySellerField();
                if(this.fieldsVerified){
                    this.verifyBank();
                }
               if(this.bankVerified){
                  this.createsubaccount();
               }
         },
         register(user){
             let condition=false;
             if(user==='seller'){
                 this.verifySellerField();
               if(this.fieldsVerified){
                 this.createsubaccount();
                 condition=this.detailsVerified;
               }
             }
             else if(user==='buyer'){
                 this.verifyBuyerField();
                 condition=this.buyerFields;
             }
             if(!condition){
                    console.log('reg starting')
                    this.logging=true;
                    this.$http.post(`http://localhost:3000/auth/${user}/register`,this.seller)
                    .then(res=>{
                    this.logging=false;
                    if(!res.data.loggedIn){
                         this.error=res.data.message;
                        }else{
                        if(user==='seller'){
                             this.$router.push('/shops/myShop');
                        }else{
                            this.$router.push(`/markets/${this.seller.country}`);
                        }
                        }
                    })
                    .catch(err=>{
                     console.log('rgister error block',err.message);
                    })
             }
         },
      },
      created(){
             this.loginRoute=`/${this.$route.params.id}/login`;
             this.$http.get(`http://localhost:3000/flutter/banks/NG`).then(res=>{
                    if(res.data.length>0){
                        this.banks=res.data.data;
                        this.bankLoading=false;
                        this.error='';
                        console.log(res.data);
                    }
             });
      }
}
</script>

<style scoped>
    div.register-container{
       background: #ffffff;
    }
    nav{
       padding: 10px 50px;
       box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    }
    nav h3{
        color: #005B94;
        font-size: 2rem;
        line-height: 130%;
    }
    div.steps{
        display: flex;
        width: 70%;
        margin: auto;
        margin-bottom: 20px;
        margin-top: 20px;
        align-items: center;
        position: relative;
    }
    div.step{
        width: 33.33%;
    }
    div.step-index{
        width: 45px;
        height: 45px;
        margin: auto;
        border-radius: 100%;
        background: #66C9FF;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        cursor: pointer;
    }
    div.step-index:hover{
         box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    }
    div.step-index p{
        font-weight: 700;
        font-size: 1.2rem;
    }
    div.rule{
        height: 1.5px;
        background: gray;
        position: absolute;
        width: calc(33.33% - 45px);
        transform: translate(calc(50% + 45px), -7px);
        /* My favourite css line ever */
    }
    div.steps div.rule:nth-child(2){
        transform: translate(calc(150% + 90px), -7px);
    }
    p.step-name{
        text-align: center;
        font-size: 0.85rem;
    }
    div.details{
        width: 50%;
        padding: 40px 0px 20px 0px;
        margin:auto;
        position: relative;
        border: black 1px solid;
        padding: 30px;
    }
    label{
        font-size: 0.9rem;
        margin-bottom: 5px;
    }
    div.details input,div.details select{
        height: 40px;
    }
    div.details input, div.details textarea, div.details select{
        width: 100%;
        margin-bottom:25px;
        padding: 0px 15px;
        outline: none;
        background: #F0F8FC;
        border: 1.5px solid transparent;
        display: block;
    }
    div.details textarea{
        padding-top: 15px;
    }
    div.details input:focus, div.details textarea:focus{
        border-color: #000000;
    }
    div.details button{
        width: 40%;
        height: 40px;
        display: block;
        border: none;
        cursor: pointer;
        outline: none;
        margin: auto;
        background: #66C9FF;
        color: #ffffff;
    }
    div.details button:hover{
       box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    }
    div.loader.bank{
        margin-bottom: 0px;
    }
    div.loader p{
        font-size: 0.8rem;
        margin-right: 10px;
    }
    div.loader{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom:25px;
    }
    option{
        height: 40px;
        border: 1px solid red;
    }
    p.error{
        color: red;
        margin-bottom: 10px;
        font-size: 1rem;
    }
    p.info{
        color: #219653;
        font-size: 1rem;
        font-weight: 700;
        line-height: 135%;
        margin-bottom: 10px;
    }
    p#huh{
        margin-top: 17px;
        text-align: center;
    }
    button:disabled{
        filter: brightness(0.5);
        cursor: not-allowed;
    }
    button#ve{
        margin-bottom: 10px;
    }
    @media only screen and (max-width: 720px) {
            div.steps{
                width: 95%;
            }
            div.details{
                width: 95%;
            }
            nav{
                padding: 10px 15px;
                margin-bottom: 10px;
            }
            p.info,p.error{
               font-size: 0.8rem;
            }
     }
    
</style>