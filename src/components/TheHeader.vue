<template>
  <header>
    <div class="header-left">
        <img :src="logoPath" @click="goHome">
    </div>
    <div class="header-right">
      <span><strong>User : </strong> {{ username }}</span>
    </div>
  </header>
</template>


<script>

export default {
    name: 'TheHeader',
    data (){
        return {
            username: '',
            role: '',
            logoPath: require('@/assets/logo.png'),
        }
    },
    created(){
        this.init();
    },
    methods: {
        async init() {
            const payload = await this.$store.dispatch("getClaims");
            this.username = payload.username;
        },
        async goHome(){
            if(this.$route.path !== '/home'){
                this.$router.push("/home");
            }
            
        }
    }
  }
</script>




<style>
header {
  background-color: var(--neutral-dark);
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 10vh;
}

.header-left {
  flex: 0;
}

.header-left img {
    height: 10vh;
    width: auto;
}

.header-right {
  flex: 1;
  text-align: end;
}

</style>