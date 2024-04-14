<template>
    <div class="myTable">
        <div class="tableOptions">
            <MySearcher @searchInput="search" />
            <div>
                <b-button @click="showModifyModal" class="m-2">
                    <img :src="addIcon" class="">
                </b-button>
                <b-form-select class="p-1" v-model="selected" :options="orderOptions" />
            </div>
        </div>

        <b-table class="text-start" striped hover responsive :items="searchProducts" :fields="tablefields"
            :sort-by="selected" fixed="true" ref="selectableTable" @row-clicked="showProductModal" />

        <b-modal centered ref="product-modal" hide-footer hide-header>
            <div class="p-container m-1">
                <b-form-group class="p-flex-item" id="fieldset-1" label="code:" label-for="input-1">
                    <b-form-input id="input-1" v-model="selectedProduct.code" trim :disabled="editable" />
                </b-form-group>
                <b-form-group class="p-flex-item " id="fieldset-1" label="name:" label-for="input-1">
                    <b-form-input id="input-1" v-model="selectedProduct.name" trim :disabled="editable" />
                </b-form-group>
                <b-form-group class="p-flex-item" id="fieldset-1" label="description:" label-for="input-1">
                    <b-form-input id="input-1" v-model="selectedProduct.description" trim :disabled="editable" />
                </b-form-group>
                <b-form-group class="p-flex-item" id="fieldset-1" label="stock:" label-for="input-1">
                    <b-form-input id="input-1" v-model="selectedProduct.stock" trim :disabled="editable" />
                </b-form-group>
            </div>
        </b-modal>

        <b-modal centered ref="my-modal" hide-footer hide-header>
            <h2 class="text-center">Add Product</h2>
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
                <b-button class="mt-3" variant="outline-danger" block @click="hideModifyModal">close</b-button>
                <b-button class="mt-3" variant="outline-success" block>add</b-button>
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
            products: [],
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
                tags: "",
                properties: ""
            },
            selectedProperties: {},
            editable: true,
            addIcon: require('@/assets/add.png')
        }
    },
    async created() {
        await this.loadProducts();
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
        loadProducts: async function () {
            const token = await this.$store.dispatch("getToken");
            const products = await this.$store.dispatch("loadProducts", token);
            this.$store.commit('setProducts', { products });
            this.products = this.$store.getters.getProducts.products;
        },
        showModifyModal: async function () {
            this.$refs['my-modal'].show();
        },
        hideModifyModal: async function () {
            this.$refs['my-modal'].hide();
        },
        addProduct: async function () {

        },
        updateProduct: async function () {

        },
        deleteProduct: async function () {

        },
        showProductModal: async function (item) {
            this.selectedProduct = item;
            this.$refs['product-modal'].show();
        },
        hideProductModal: async function () {
            this.$refs['product-modal'].hide();
            this.editable = false;
        },
        changeEditable: async function () {
            this.editable = !this.editable;
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

.tableOptions img {
    height: 3vh;
    padding: 0;
}

.p-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

}

.p-flex-item {
    flex: 50%;
}
</style>