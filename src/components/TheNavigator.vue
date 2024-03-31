<template>
    <nav>
        <ul>
            <li><router-link to="/sell">Sell products</router-link></li>
            <li><router-link to="/tags">Tags</router-link></li>
            <li v-if="isAdmin"><router-link to="/register">Register normal users</router-link></li>
        </ul>
    </nav>
</template>


<script>

export default {
    name: 'TheNavigator',
    data (){
        return {
            username: '',
            role: '',
            isAdmin: false,
        }
    },
    created(){
        this.init();
    },
    methods: {
        init: async function() {
            const payload = await this.$store.dispatch("getClaims");
            this.username = payload.username;
            this.role = payload.role;
            if("administrator".localeCompare(this.role) == 0){
                this.isAdmin = true;
            }
        },
    }
  }
</script>

<style>
nav{
    height: 10vh;
    
}
ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
}   
li {
    display: flex;
    float: left;
    margin: 2vh 2vw;
    align-items: center;
}

li a {
    font-weight: bold;
    display: block;
    text-decoration: none;
    color: #fff;
}
</style>