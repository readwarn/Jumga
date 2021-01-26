<template>
          <!-- Buyer selects preferred marketplace -->
      <div class="house">
            <nav><h3>Jumga</h3></nav>
            <div class="content">
                  <h4>Jumga Services</h4>
                  <p>Visit Jumga in the following countries</p>
                  <div class="banner">
                       <router-link to="/markets/ng">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/1280px-Flag_of_Nigeria.svg.png" alt="Nigeria">
                       </router-link>
                       <router-link to="/markets/ke">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/800px-Flag_of_Kenya.svg.png" alt="Kenya">
                       </router-link>
                       <router-link to="/markets/gh">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/900px-Flag_of_Ghana.svg.png" alt="Ghana">
                       </router-link>
                  </div>
            </div>
      </div>
</template>

<script>
export default {
    name:"Platforms"
}
</script>

<style scoped>
div.house{
    height: 100%;
}
nav{
    padding: 10px 50px;
    margin-bottom: 10px;
    box-shadow: 0px 1px 2px 0px rgba(102,96,102,1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
}
h3{
    color: #005B94;
    font-size: 2rem;
    line-height: 130%;
}
div.content{
    width: 50%;
    margin: auto;
    height: 60%;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
div.content p{
    font-size: 1.3rem;
    color: #807e7e;
    margin: 20px 0px;
    text-align: center;
}
div.content h4{
    font-size: 2.3rem;
    color: #00253C;
}
div.banner{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}
img{
    width: 80px;
    height: 80px;
}
a{
    text-decoration: none;
}

@media only screen and (max-width: 720px) {
nav{
    padding: 10px 15px;
    margin-bottom: 10px;
}
div.content{
    width: 75%;
}
img{
    width: 45px;
    height: 45px;
}
}

</style>