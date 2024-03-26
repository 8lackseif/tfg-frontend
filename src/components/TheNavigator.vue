<template>
    <nav>
    </nav>
</template>


<script>

export default {
    name: 'TheNavigator',
    data (){
        return {
            username: '',
            role: '',
        }
    },
    created(){
        this.init();
    },
    methods: {
        async init() {
            const payload = await this.$store.dispatch("getClaims");
            this.username = payload.username;
            this.role = payload.role;
        },
    }
  }
</script>

<style>
</style>