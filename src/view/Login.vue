<template>
  <div>
    <form class="loginPage">
      <div class="logoContainer">
        <img :src="logoPath"/>
      </div>
      <div class="container">
        <span class="item">Username: </span>
        <input v-model="username" type="text" class="item"/>
        <span class="item">Password: </span>
        <input v-model="pwd" type="password" class="item"/>

        <button type="button" v-on:click="login" class="loginButton">Log in</button>
        <b-alert class="item text-center" v-model="error" variant="danger">{{message}}</b-alert>
      </div>
      <div class="container"></div>
    </form>
  </div>

</template>

<script>
export default {
  name: 'Login_page',
  data() {
    return {
      username: '',
      pwd: '',
      logoPath: require('@/assets/logo.png'),
      error: false,
      message: ''
    }
  },
  created(){
    this.init();
  },
  methods: {
    init:async function(){
      const token = await this.$store.dispatch('getToken');
      if( token !== null){
        this.$router.push('/home');
      }
    },
    login: async function () {
      const response = await this.$store.dispatch("login",{
        "username": this.username,
        "pwd": this.pwd,
      });
      
      if(response.status != 200){
        this.error = true;
        this.message = response.data;
      }
      else{
        this.$router.push('/home');
      }
    },
    
  },
}
</script>

<style>
.loginPage {
  margin: auto;
  margin-top: 5vh;
  border: 3px solid #f1f1f1;
  height: 80vh;
  width: 30vw;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.container{
  display: flex;
  flex-wrap: wrap;
  font-size: 2vh;
}

.item {
  width: 80%;
  flex-basis: 100%;
  margin: 1vh 5vw;
  font-weight: bold;
}

.container a {
  width: 100%;
  margin: 3vh 5vw;
  font-weight: bold;
  text-align: center;
}

.loginButton{
  width: 5vw;
  height: 4vh;
  margin: auto;
  margin-top: 3vh;
}

.logoContainer {
  height: 30vh;
  width: 40vh;
  margin: auto;
}

.logoContainer img {
  width: 100%;
  height: auto;
  display: block;
}


</style>