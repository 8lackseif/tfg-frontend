<template>
   
   <div>
    <p>{{msg}}</p>
    <input v-model="txt" placeholder="edit me" />
    <button class="boton" v-on:click="onSubmit">submit</button>
   </div>
   
</template>

<script>
export default {
  name: 'Login_page',
  data () {
    return {
      msg: 'hello world',
      txt: ''
    }
},
methods: {
  onSubmit: function () {
    this.$data.msg = this.$data.txt
  }
}
}
</script>

<style>
  .boton {
    color: blue;
  }
</style>