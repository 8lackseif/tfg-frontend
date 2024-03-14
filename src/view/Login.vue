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

        <button v-on:click="login" class="loginButton">Log in</button>
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
      datos:''
    }
  },
  methods: {
    login: function () {
      this.$data.datos = this.$store.dispatch("login",this.$data.username,this.$data.pwd)
    }
  }
}
</script>

<style>
.loginPage {
  box-sizing: border-box;
  margin: auto;
  margin-top: 15vh;
  border: 3px solid #f1f1f1;
  height: 60vh;
  width: 30vw;
  align-items: center;
  
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.container{
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex-basis: 100%;
  margin: 1vh 5vw;
  text-align: start;
  font-weight: bold;
  display: block;
}

.loginButton{
  width: 5vw;
  height: 4vh;
  margin: auto;
  margin-top: 3vh;
}

.logoContainer {
  margin: auto;
  margin-top: 3vh;
}


</style>