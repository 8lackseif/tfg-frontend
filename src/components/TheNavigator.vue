<template>
    <nav>
        <ul>
            <li><router-link to="/stock">Stock Management</router-link></li>
            <li><router-link to="/tags">Tags</router-link></li>
            <li v-if="isAdmin"><router-link to="/register">Register normal users</router-link></li>
            <li v-if="!isGuest"><router-link to="/migration">Migration Database</router-link></li>
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
            isGuest: false,
            location: ""
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
            else if("guest".localeCompare(this.role) == 0){
                this.isGuest = true;
            }

            this.location = window.location.href;
        },
    }
  }
</script>

<style>
nav{
    height: 10vh;
    width: 65%;
}
nav ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
}   
nav li {
    display: flex;
    float: left;
    margin: 2vh 2vw;
    align-items: center;
}

nav li a {
    font-weight: bold;
    display: block;
    text-decoration: none;
    color: #fff;
}
</style>