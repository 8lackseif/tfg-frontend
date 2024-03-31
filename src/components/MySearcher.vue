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
    gap: 0.5vw;
    height: 5vh;
    flex-direction: row;
    width: 12vw;
    padding-bottom: 1vh;
}

.searcher input{
    width: 7vw;
}

.searcher button {
    display: inline-block;
    width: 3vh;
    background-color: inherit;
    border: none;
}

.searcher button img {
    width: 100%;
    height: 3vh;
}
</style>