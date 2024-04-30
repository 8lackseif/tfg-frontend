<template>
    <div class="myTable">
        <div class="tableOptions">
            <MySearcher @searchInput="search" />
            <div>
                <b-button @click="showModifyModal" class="m-2" v-if="canModify">
                    <img :src="addIcon" class="">
                </b-button>
                <b-form-select class="p-1" v-model="selected" :options="orderOptions" />
            </div>
        </div>

        <div class="productsContainer">
            <div class="productContainer" v-bind:key="p.id" v-for="p in searchProducts" @click="showProductModal(p)">
                <img class="flex-item" :src="p.image_url" />
                <p class="flex-item"> producto: {{ p.name }} <br> stock: {{ p.stock }} <br> {{ p.description }}</p>
            </div>
        </div>



        <b-modal ref="product-modal" centered hide-footer hide-header>
            <ProductModal @back="hideProductModal" @reload="loadProducts" @refresh="showProductModal"
                :selectedProduct="selectedProduct" :selectedProperties="selectedProperties" />
        </b-modal>


        <b-modal centered ref="my-modal" hide-footer hide-header>
            <h2 class="text-center">Add Product</h2>
            <div class="container m-1">
                <b-form-group class="flex-item" id="fieldset-1" label="code:" label-for="input-1">
                    <b-form-input id="input-1" v-model="selectedProduct.code" :state="inputRequired('code')" trim />
                    <b-form-invalid-feedback id="input-live-feedback1">
                        This field is obbligatory.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group class="flex-item " id="fieldset-1" label="name:" label-for="input-1">
                    <b-form-input id="input-1" v-model="selectedProduct.name" :state="inputRequired('name')" trim />
                    <b-form-invalid-feedback id="input-live-feedback2">
                        This field is obbligatory.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group class="flex-item" id="fieldset-1" label="description:" label-for="input-1">
                    <b-form-input id="input-1" v-model="selectedProduct.description" trim />
                </b-form-group>
                <b-form-group class="flex-item" id="fieldset-1" label="stock:" label-for="input-1">
                    <b-form-input id="input-1" v-model="selectedProduct.stock" trim />
                </b-form-group>
                <b-form-group class="flex-item" id="fieldset-1" label="image_url:" label-for="input-1">
                    <b-form-input id="input-1" v-model="selectedProduct.image_url" trim />
                </b-form-group>
            </div>
            <div class="d-flex justify-content-around">
                <b-button class="mt-3" variant="outline-danger" block @click="hideModifyModal">close</b-button>
                <b-button class="mt-3" variant="outline-success" block @click="addProduct">add</b-button>
            </div>
        </b-modal>
    </div>
</template>


<script>
import MySearcher from './MySearcher.vue';
import ProductModal from './ProductModal.vue';

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
                code: "",
                description: "",
                stock: 0,
                image_url: "",
                tags: "",
                properties: ""
            },
            selectedProperties: [],
            canModify: true,
            addIcon: require('@/assets/add.png')
        }
    },
    async created() {
        await this.loadProducts();
        const payload = await this.$store.dispatch('getClaims');
        if ('guest'.localeCompare(payload.role) === 0) {
            this.canModify = false;
        }
    },
    computed: {
        searchProducts() {
            var filteredProducts = []
            this.products.forEach(p => {
                if (p.code.includes(this.searchInput) || p.name.includes(this.searchInput) ||
                    p.description.includes(this.searchInput) || p.tags.includes(this.searchInput ||
                        p.properties.includes(this.searchInput))) {
                    filteredProducts.push(p);
                }
            });

            filteredProducts.sort((a, b) => { return (a[this.selected] > b[this.selected]) ? 1 : (a[this.selected] < b[this.selected]) ? -1 : 0; });

            return filteredProducts;
        }
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
            this.selectedProduct = {
                id: "",
                code: "",
                name: "",
                description: "",
                stock: 0,
                image_url: "",
                tags: "",
                properties: ""
            }
            this.$refs['my-modal'].show();
        },
        hideModifyModal: async function () {
            this.$refs['my-modal'].hide();
        },
        addProduct: async function () {
            const token = await this.$store.dispatch("getToken");
            const product = {
                code: this.selectedProduct.code,
                name: this.selectedProduct.name,
                description: this.selectedProduct.description,
                stock: parseInt(this.selectedProduct.stock),
                image_url: this.selectedProduct.image_url,
                token: token
            }

            if (product.name != "" && product.code != "") {
                await this.$store.dispatch("addProduct", product);
                await this.hideModifyModal();
                await this.loadProducts();
            }

        },
        showProductModal: async function (item) {
            this.selectedProduct = this.products.find(product => product.id == item.id);
            this.selectedProperties = [];
            if (this.selectedProduct.property_names != null) {
                const propertyNames = JSON.parse(this.selectedProduct.property_names);
                const propertyValues = JSON.parse(this.selectedProduct.property_values);
                for (var i = 0; i < propertyNames.length; i++) {
                    var obj = {
                        propertyName: propertyNames[i],
                        propertyValue: propertyValues[i],
                        delete: undefined,
                    }
                    this.selectedProperties.push(obj);
                }
            }
            this.$refs['product-modal'].show();
        },
        hideProductModal: async function () {
            this.$refs['product-modal'].hide();
            this.editable = false;
        },
        inputRequired: function (property) {
            return this.selectedProduct[property].length > 0 ? true : false;
        }
    },
    components: {
        MySearcher,
        ProductModal
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
    height: 1.5vh;
    padding: 0;
}

.productContainer {
    height: 50vh;
    width: 15vw;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 2vh;
}

.productsContainer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
}

.productContainer img {
    height: 20vh;
    border: 1px black solid;
    border-radius: 5px;
}

.productContainer:hover {
    background-color: rgb(189, 192, 191);
}
</style>