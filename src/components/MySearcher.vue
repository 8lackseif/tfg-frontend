<template>
    <div class="searcher"> 
        <input v-model="searchInput" type="text"/>
        <button v-on:click="sendSearchInput">
            <img :src="searchImage"/>
        </button>
    </div>
</template>


<script>

export default {
    name: 'MySearcher',
    data (){
        return {
            searchImage: require('@/assets/search.png'),
            searchInput: '',
        }
    },
    created(){
    },
    methods: {
        sendSearchInput: async function(){
            this.$emit('searchInput', this.searchInput);
        }
    }
  }
</script>

<style>
.searcher{
    display: flex;
    flex-wrap: nowrap;
    width: 10vw;
    padding: 1vh 1vw;
}

.searcher input{
    width: 70%;
}

.searcher button {
    display: inline-block;
    width: 30%;
    background-color: inherit;
    border: none;
}

.searcher button img {
    width: auto;
    height: 100%;
}
</style>