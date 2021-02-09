<template>
    <div class="land">
        <nav><h3>Jumga</h3></nav>
        <div class="content">
              <section>
                <div class="banner">
                    <div class="detail">
                        <h4 class="title">
                            Buy and sell at affordable rates with Jumga.
                        </h4>
                        <p class="subtitle">
                            Jumga connects buyer and seller for seamless transaction.
                        </p>
                        <div class="input-box">
                             <button @click="$router.push('/onboard')">BE A SELLER</button>
                             <button @click="$router.push('/buyer/register')">GET STARTED</button>
                        </div>
                    </div>
                    <img id="land" src="../assets/land.svg" alt="land">
              </div>
              </section>
              <section>
                  <div class="tutor">
                      <h4 class="title">How does it work? </h4>
                      <div class="banner">
                           <div class="step">
                                <img src="../assets/step-one.svg" alt="one">
                                <p class="title">Create an account</p>
                                <p class="subtitle">Creating an account is pretty easy, 
                                 all you need is a company name and  a phone number
                                 </p>
                           </div>
                           <div class="step">
                                <img src="../assets/step-two.svg" alt="one">
                                <p class="title">Pay a little token</p>
                                <p class="subtitle">Before your account can be approved a payment of 8,000 is essential.
                                 </p>
                           </div>
                           <div class="step">
                                <img src="../assets/step-three.svg" alt="one">
                                <p class="title">Dispatch rider</p>
                                <p class="subtitle">A dispatch rider would be assigned to your business. Making delivery seamless.
                                 </p>
                           </div>
                      </div>
                </div>
            </section>
            <section>
                <div class="flutter">
                      <h4 class="title">How does it work? </h4>
                      <div class="banner">
                            <div class="img-box">
                                  <img src="../assets/flutter.svg" alt="">
                            </div>
                            <div class="keys">
                                <p class="subtitle">With the <a href="https://developer.flutterwave.com/docs">Flutterwave v3 API Endpoints</a>, payments across platforms is seamless</p>
                                <div class="list">
                                        <img src="https://s2.svgbox.net/hero-outline.svg?color=219653&ic=check-circle" width="7px" height="7px" alt="check">
                                        <p>Jumga gets a 2.5% commission</p>
                                </div>
                                <div class="list">
                                        <img src="https://s2.svgbox.net/hero-outline.svg?color=219653&ic=check-circle" width="7px" height="7px" alt="check">
                                        <p>For the delivery fee, The disptach rider gets 80% of the fee and jumga gets 20%</p>
                                </div>
                            </div>
                      </div>
              </div>
            </section>
       </div>

    </div>
</template>

<script>
export default {
    name:"Land"
}
</script>

<style scoped>
div.land{
    height: 100%;
}
nav{
    background: #ffffff;
    padding: 10px 50px;
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
h3{
    color: #005B94;
    font-size: 2rem;
    line-height: 130%;
}
div.content{
    width: 80%;
    height: 100%;
    margin: auto;
    margin-top: 80px;
}
section{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 45px;
}
div.banner{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}
div.detail{
    width:45%;
}
h4.title{
    color: #00253C;
    font-size: 2rem;
    line-height: 130%;
    text-align: center;
}
p.subtitle{
    font-size: 0.9rem;
    color: #005B94;
    line-height: 135%;
    margin: 20px 0px;
}
p.subtitle a{
    text-decoration: none;
    color: #219653;
}
div.input-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
}
button{
    cursor: pointer;
    width: 40%;
    height: 40px;
    outline: none;
    border: none;
    color: #ffffff;
}
button:hover{
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
}
div.input-box button:nth-child(1){
    background: #66C9FF;
}
div.input-box button:nth-child(2){
    background: #219653;
}

div.banner img{
    width: 35%;
    height: 85%;
}
div.step{
    width: 20%;
}
div.banner div.step img{
    width: 100%;
    height: 200px;
    margin: auto;
} 
p.title{
    color: #005B94;
    font-size: 1rem;
    font-weight: 700;
    margin: 20px 0px;
}
div.step p.title{
    margin-top: 0;
}
div.banner div.img-box{
    width: 40%;
    height: 300px;
}
div.banner div.keys{
    width: 40%;
}
div.flutter{
    width: 100%;
}
div.flutter div.img-box img{
    width: 300px;
    height: 300px;
}
div.keys div.list{
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}
div.keys div.list img{
    margin-right: 15px;
    width: 17px;
    height: 17px;
}
@media only screen and (max-width: 720px) {
nav{
    padding: 10px 15px;
    margin-bottom: 10px;
}
div.content{
    width: 95%;
    margin-top: 80px;
}
div.banner,div.tutor{
    height: 85%;
}
div.banner img{
    width: 100%;
    height: 47%;
    order: 0;
}
div.detail{
    width: 100%;
    order: 1;
}
h4.title{
    font-size: 1.8rem;
    text-align: center;
}
p.subtitle{
    font-size: 0.8rem;
    text-align: center;
    line-height: 140%;
}
p.title{
    font-size: 1.3rem;
    text-align: center;
}
div.input-box{
    width: 70%;
    margin: auto;
}
div.step{
    width: 75%;
    margin: auto;
    margin-bottom: 25px;
}
div.banner div.step img{
    width: 70%;
    display: block;
    margin: auto;
}
button{
    width: 45%;
    font-size: 0.75rem;
}
div.banner div.keys{
    width: 80%;
} 
div.banner div.img-box{
    width: 60%;
    margin: auto;
}
div.banner img#land{
    width: 60%;
    display: block;
    margin: auto;
}
div.keys{
    width: 94%;
    margin: auto;
}
div.keys div.list p{
    font-size: 0.8rem;

}
div.keys p.subtitle{
    font-size: 1rem;
}
}

</style>