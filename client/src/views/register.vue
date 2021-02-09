<template>
   <div class="register-container" v-if="($route.params.id==='seller') ||($route.params.id==='buyer')">
           <nav>
            <router-link to="/"><h3>Jumga</h3></router-link>
           </nav>
            <div class="welcome">
                <h3>Create an Account,</h3>
                <h4>Introduce yourself.</h4>
           </div>
           <div class="info">
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
                        <div class="huh">
                            <p id="huh">Already have an account? <router-link :to="loginRoute">Login</router-link></p>
                            <button v-if="$route.params.id==='buyer' && !logging" @click="registerBuyer()">SIGN UP</button>
                            <button @click="showDetail('store')" v-if="$route.params.id==='seller'">Next</button>
                        </div>
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
                        <select id="bank" v-model="userBankCode">
                            <option v-for="(bank,index) in banks" :key="index" :value="bank.code">
                                {{bank.name}}
                            </option>
                        </select>
                        <button id="ve" class="classified" @click="verifyBank()" :disabled="verifying">Verify Account</button>
                        <img v-if="logging" id="load" src="https://s2.svgbox.net/loaders.svg?color=66C9FF&ic=spinner" alt="loader" width="32" height="32">
                        <button v-if="!logging" class="classified" :disabled="!bankVerified && !creating" @click="createsubaccount()">Sign Up</button>
                </div>
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
         getBanks(){
             // fetch banks based on country, using the flutter api
             // No endpoint to fetch UK banks, so it was excluded
             this.$http.get(`flutter/banks/${this.country}`).then(res=>{
                    this.banks=res.data.data;
                    this.bankLoading=false;
             })
         },
         createsubaccount(){
              // a subaccount account is created for the shop owner
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
               this.error='';
               this.$http.post('flutter/subaccounts',
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
                       this.seller.shopID=res.data.data.subaccount_id;
                       this.detailsVerified=true;
                       this.registerSeller();
                  }else{
                      this.error=res.data.message;
                  }
              })
              .catch(err=>{
                  console.log(err.message);
              })
         },
         verifyBank(){
             // verifies bank account details provided
             const bank = {
                   "account_number":`${this.accountNumber}`,
                   "account_bank":`${this.userBankCode}`
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
             this.$http.post('flutter/accounts/verify',bank)
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
         registerSeller(){
             this.logging=true;
                    this.$http.post(`auth/seller/register`,this.seller)
                    .then(res=>{
                    this.logging=false;
                    if(!res.data.loggedIn){
                         this.error=res.data.message;
                        }else{
                             this.$router.push(`/shops/myShop`);
                        }
                    })
                    .catch(err=>{
                     console.log('register error block',err.message);
                    })
         },
         registerBuyer(){
                 this.buyerFields = false;
                 this.verifyBuyerField();
             if(this.buyerFields){
                    console.log('reg starting');
                    this.logging=true;
                    this.$http.post(`auth/buyer/register`,this.seller)
                    .then(res=>{
                    this.logging=false;
                    if(!res.data.loggedIn){
                         this.error=res.data.message;
                        }else{
                            this.$router.push(`/markets/${this.seller.country}`);
                        }
                    })
                    .catch(err=>{
                     console.log('register error block',err.message);
                    })
             }
         },
      },
      created(){
             this.loginRoute=`/${this.$route.params.id}/login`;
             this.$http.get(`/flutter/banks/NG`).then(res=>{
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
       display: flex;
       flex-wrap: wrap;
       justify-content: space-between;
       padding-bottom: 30px;
    }
    nav{
       padding: 10px 50px;
       box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
       position: fixed;
       width: 100%;
       z-index: 10;
       background: #ffffff;
    }
    a{
        text-decoration: none;
    }
    h3{
        color: #005B94;
        font-size: 2rem;
        line-height: 130%;
    }
    div.welcome{
        margin-top: 65px;
        width: 40%;
        padding: 10% 20px;
        height: calc(100vh - 67px);
    }
    div.welcome h3{
        font-size: 3rem;
    }
    div.welcome h4{
       font-size: 2.2rem;
       color: #66C9FF;
    }
    div.info{
        margin-top: 100px;
        width: 60%;
    }
    div.steps{
        display: flex;
        width: 90%;
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
        background: #66C9FF;
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
        width: 90%;
        padding: 40px 0px 20px 0px;
        margin:auto;
        position: relative;
        border: #005B94 1.5px solid;
        border-radius: 8px;
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
        width: 23%;
        height: 40px;
        display: block;
        margin-left: auto;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        outline: none;
        background: #005B94;
        color: #ffffff;
    }
    div.details button:hover{
       box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    }
    div.details button.classified{
       width: 50%;
       margin: auto;
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
    div.huh{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    button:disabled{
        filter: brightness(0.5);
        cursor: not-allowed;
    }
    button#ve{
        margin-bottom: 10px;
    }
    img#load{
        display: block;
        margin: auto;
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
            div.welcome{
                width: 100%;
                height: auto;
                padding: 10px 20px;
            }
            div.welcome h3{
                font-size: 2.2rem;
            }
            div.welcome h4{
                font-size: 1.5rem;
            }
            div.info{
                margin-top: 15px;
                width: 100%;
            }
     }
    
</style>