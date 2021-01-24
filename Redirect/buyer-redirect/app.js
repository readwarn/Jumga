const app = new Vue({
    el:"#app",
    data(){
        return{
           failure:true,
           verifying:true,
           paymentID:'',
           amount:8000,
           error:''
        }
    },
    methods:{
        verifyPayment(paymentID){
            axios.get(`http://localhost:3001/flutter/verify/${paymentID}`)
            .then(res=>{
                if(res.data.status==="success"){
                    this.amount=res.data.data.amount;
                    if(res.data.data.charged_amount<this.amount){
                         this.error=`You paid ${res.data.data.charged_amount} instead of ${this.amount}`
                         this.verifying=false;
                    }else{
                        this.failure=false;
                        this.verifying=false;
                        this.error="";
                    }
                }
                else{
                    this.error="Incomplete Payment!!!"
                    this.verifying=false;
                }
            })
        }
    },
    created(){
       const urlParams = new URLSearchParams(window.location.search);
       this.paymentID = urlParams.get('transaction_id');
       if(this.paymentID!==null){
           this.verifyPayment(this.paymentID);
           console.log('ID',this.paymentID); 
       }else{
           this.verifying=false;
           this.error = "Invalid Transaction";
       }
    }
})