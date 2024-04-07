<template>
    <div class="myTable">
        <div class="tableOptions">
            <MySearcher @searchInput="search" />
            <div>
                <b-button @click="showModal" class="m-2">modify</b-button>
                <b-form-select class="p-1" v-model="selected" :options="orderOptions" />
            </div>
        </div>

        <b-table class="text-start" striped hover responsive :items="searchProducts" :fields="tablefields"
            :sort-by="selected" fixed="true" />

        <b-modal centered scrollable ref="my-modal" hide-footer hide-header>
            <b-tabs content-class="mt-3">
                <b-tab title="Add product" active>
                    <p>add product</p>
                </b-tab>
                <b-tab title="Delete product">
                    <p>delete product</p>
                </b-tab>
                <b-tab title="Update product">
                    <p>update product</p>
                </b-tab>
            </b-tabs>
            <div class="d-flex justify-content-around">
                <b-button class="mt-3" variant="outline-danger" block @click="hideModal">close</b-button>
                <b-button class="mt-3" variant="outline-success" block>modify</b-button>
            </div>
        </b-modal>
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
            tablefields: ["code", "name", "description", "stock"],
            searchInput: "",
            orderOptions: [
                { value: "code", text: "ordering by code" },
                { value: "name", text: "ordering by name" },
                { value: "description", text: "ordering by description" },
                { value: "stock", text: "ordering by stock" }
            ],
            selected: "code",


        }
    },
    created() {
        this.getProducts();
    },
    computed: {
        searchProducts() {
            const filteredProducts = []
            this.products.forEach(p => {
                if (p.code.includes(this.searchInput) || p.name.includes(this.searchInput) || p.description.includes(this.searchInput) || p.tags.includes(this.searchInput)) {
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
        },
        showModal: async function () {
            this.$refs['my-modal'].show()
        },
        hideModal: async function () {
            this.$refs['my-modal'].hide()
        },
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