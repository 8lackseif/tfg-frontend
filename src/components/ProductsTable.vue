<template>
    <div class="myTable">
        <div class="options">
            <MySearcher @searchInput="search" />
        </div>
        <table>
            <tr>
                <th>code</th>
                <th>name</th>
                <th>description</th>
                <th>stock</th>
            </tr>

            <tr v-for="p in searchProducts" :key="p.code">
                <td>{{p.code}}</td>
                <td>{{p.name}}</td>
                <td>{{p.description}}</td>
                <td>{{p.stock}}</td>
            </tr>


        </table>
    </div>
</template>


<script>
import MySearcher from './MySearcher.vue';


export default {
    name: 'ProductsTable',
    data (){
        return {
            products: [
             ],
            searchInput: "",
        }
    },
    created(){
        this.getProducts();
    },
    computed: {
        searchProducts(){
            const filteredProducts = []
            this.products.forEach(p => {
                if(p.code.includes(this.searchInput) || p.name.includes(this.searchInput) || p.description.includes(this.searchInput)){
                    filteredProducts.push(p);
                }
            });
            return filteredProducts;
        }
    },
    methods: {
        search: async function(searchInput){
            this.searchInput = searchInput;
        },
        getProducts: async function(){
            this.products = await this.$store.dispatch('getProducts');
        }
    },
    components: {
        MySearcher,
    }
  }
</script>

<style>
.myTable {
    margin: 5vh 4vw;
    padding: 2vh 2vw;
    border: 1px solid  #ccc;
    border-radius: 10px;
}

.options {
    display: flex;
    flex-direction: row;
}

table {
  width: 100%;
  border-collapse: collapse; 
  border: 1px solid #ccc; 
}

th {
  background-color: #f2f2f2; 
  padding: 1vh; 
  border: 1px solid #ccc; 
}

td {
  padding: 1vh; 
  border: 1px solid #ccc; 
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #e0e0e0;
}
</style>