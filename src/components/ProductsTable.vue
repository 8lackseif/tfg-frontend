<template>
    <div class="myTable">
        <div class="tableOptions">
            <MySearcher @searchInput="search" />
            <div>
                <b-form-select class="p-1" v-model="selected" :options="orderOptions"/>
            </div>
        </div>

        <b-table class="text-start" striped hover :items="searchProducts" :sort-by="selected" fixed="true"/>
    </div>
</template>


<script>
import MySearcher from './MySearcher.vue';

export default {
    name: 'ProductsTable',
    data() {
        return {
            products: [
            ],
            searchInput: "",
            orderOptions: [
                { value: "id", text: "ordering by id"},
                { value: "code", text: "ordering by code" },
                { value: "name", text: "ordering by name" },
                { value: "description", text: "ordering by description" },
                { value: "stock", text: "ordering by stock" }
            ],
            selected: "id",


        }
    },
    created() {
        this.getProducts();
    },
    computed: {
        searchProducts() {
            const filteredProducts = []
            this.products.forEach(p => {
                if (p.code.includes(this.searchInput) || p.name.includes(this.searchInput) || p.description.includes(this.searchInput)) {
                    filteredProducts.push(p);
                }
            });


            return filteredProducts;
        },
    },
    methods: {
        search: async function (searchInput) {
            this.searchInput = searchInput;
        },
        getProducts: async function () {
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
    display: block;
    margin: 5vh 4vw;
    padding: 2vh 2vw;
}

.tableOptions {
    height: 5vh;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin: 1vh;
    justify-content: space-between;
}
</style>