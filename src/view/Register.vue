<template>
    <div>
      <form class="registerPage">
        <div class="container">
          <span class="item">Username: </span>
          <input v-model="username" type="text" class="item"/>
          <span class="item">Password: </span>
          <input v-model="pwd" type="password" class="item"/>
          <span class="item">Repeat password: </span>
          <input v-model="pwd2" type="password" class="item"/>
  
          <button type="button" v-on:click="register" class="registerButton">Register</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'Register_page',
    data() {
      return {
        username: '',
        pwd: '',
        pwd2:'',
      }
    },
    methods: {
      register: async function () {
        await this.$store.dispatch("register", {
          "username" : this.username,
          "pwd": this.pwd
        });
        this.$router.push('/');
      }
    }
  }
  </script>
  
  <style>
  .registerPage {
    box-sizing: border-box;
    margin: auto;
    margin-top: 5vh;
    border: 3px solid #f1f1f1;
    height: 80vh;
    width: 30vw;
    align-items: center;
    padding: 5vh 5vw;
    display: flex;
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

  
  .registerButton{
    width: 5vw;
    height: 4vh;
    margin: auto;
    margin-top: 3vh;
  }
  
  </style>