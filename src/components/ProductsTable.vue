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

        <b-modal centered ref="my-modal" hide-footer hide-header>
            <b-tabs content-class="mt-3">
                <b-tab title="Add product" active>
                    <p>add product</p>
                    <div class="d-flex justify-content-around">
                        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">close</b-button>
                        <b-button class="mt-3" variant="outline-success" block>add</b-button>
                    </div>
                </b-tab>
                <b-tab title="Delete product">
                    <v-select :options="products" label="name" :value="selectedProduct" />
                    <div class="d-flex justify-content-around">
                        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">close</b-button>
                        <b-button class="mt-3" variant="outline-success" block>delete</b-button>
                    </div>
                </b-tab>
                <b-tab title="Update product">
                    <v-select :options="products" label="name" v-model="selectedProduct" />
                    <div class="container m-1">
                        <b-form-group class="flex-item" id="fieldset-1" label="code:" label-for="input-1">
                            <b-form-input id="input-1" v-model="selectedProduct.code" trim />
                        </b-form-group>
                        <b-form-group class="flex-item " id="fieldset-1" label="name:" label-for="input-1">
                            <b-form-input id="input-1" v-model="selectedProduct.name" trim />
                        </b-form-group>
                        <b-form-group class="flex-item" id="fieldset-1" label="description:" label-for="input-1">
                            <b-form-input id="input-1" v-model="selectedProduct.description" trim />
                        </b-form-group>
                        <b-form-group class="flex-item" id="fieldset-1" label="stock:" label-for="input-1">
                            <b-form-input id="input-1" v-model="selectedProduct.stock" trim />
                        </b-form-group>
                    </div>
                    <div class="d-flex justify-content-around">
                        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">close</b-button>
                        <b-button class="mt-3" variant="outline-success" block>update</b-button>
                    </div>
                </b-tab>
            </b-tabs>
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
            selectedProduct: {
                id: "",
                name: "",
                description: "",
                stock: 0,
                tags: ""
            },
        }
    },
    created() {
        this.loadProducts();
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
            this.products = this.$store.getters.getProducts;
        },
        loadProducts: async function (){
            const products = await this.$store.dispatch("loadProducts");
            this.$store.commit('setProducts', {products});
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