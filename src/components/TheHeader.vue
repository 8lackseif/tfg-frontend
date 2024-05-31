<template>
  <header>
    <div class="header-left">
        <img :src="logoPath" @click="goHome">
    </div>
    <TheNavigator/>
    <div class="header-right">
      <span @click="logout"><a><strong>LOGOUT</strong></a></span>
      <span><strong>User : </strong> {{ username }}</span>
    </div>
  </header>
</template>


<script>
import TheNavigator from '@/components/TheNavigator';

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
        init: async function() {
            const payload = await this.$store.dispatch("getClaims");
            if(payload !== null){
              this.username = payload.username;
            }    
        },
        goHome: function(){
            if(this.$route.path !== '/home'){
                this.$router.push("/home");
            }
        },
        logout: async function(){
          await this.$store.dispatch('logout');
          this.$router.push('/');
        }
    },
    components: {
      TheNavigator,
    }
  }
</script>




<style>
header {
  background-color: #748a9de7;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 10vh;
  position:fixed;
  width: 100%;
  top: 0;
  z-index: 5;
}

header:hover {
  background-color: var(--neutral-dark);
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

.header-right span {
  margin-right: 1vw;
  cursor: pointer;
}

</style>