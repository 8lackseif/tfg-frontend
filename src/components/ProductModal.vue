<template>
    <div>
        <h2 class="text-center">Product Details</h2>
        <div class="container m-1">
            <b-form-group class="flex-item" id="fieldset-1" label="code:" label-for="input-1">
                <b-form-input id="input-1" :value="copySelectedProduct.code" trim :disabled="editable" />
            </b-form-group>
            <b-form-group class="flex-item " id="fieldset-2" label="name:" label-for="input-1">
                <b-form-input id="input-1" :value="copySelectedProduct.name" trim :disabled="editable" />
            </b-form-group>
            <b-form-group class="flex-item" id="fieldset-3" label="description:" label-for="input-1">
                <b-form-input id="input-1" :value="copySelectedProduct.description" trim :disabled="editable" />
            </b-form-group>
            <b-form-group class="flex-item" id="fieldset-4" label="stock:" label-for="input-1">
                <b-form-input id="input-1" :value="copySelectedProduct.stock" trim :disabled="editable" />
            </b-form-group>
        </div>
        <b-table class="text-start" striped hover responsive :items="selectedProperties" :fields="computedFields">
            <!--
            <template v-slot:cell(propertyValue)="{ item }" v-if="!editable">
                <b-input v-model="item['propertyValue']" />
            </template>
-->
            <template v-slot:cell(delete)="{ item }">
                <span><b-btn @click="deleteProperty(item)">delete</b-btn></span>
            </template>
        </b-table>
        <div class="d-flex" v-if="!editable">
            <b-input class="flex-item mt-3" v-model="newProperty.propertyName" trim />
            <b-input class="flex-item mt-3" v-model="newProperty.propertyValue" trim />
            <b-btn class="flex-item mt-3" @click="addProperty">add</b-btn>
        </div>
        <div class="d-flex" v-if="canModify">
            <b-button class="flex-item mt-3" variant="outline-danger" block @click="deleteProduct"> delete </b-button>
            <b-button class="flex-item mt-3" variant="outline-info" block @click="setModify"> {{ modifyText }}
            </b-button>
        </div>

    </div>
</template>

<script>

export default {
    props: {
        selectedProduct: {
            type: Object,
            required: true
        },
        selectedProperties: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            editable: true,
            canModify: true,
            modifyText: "Modify",
            fields: [
                { key: 'propertyName', label: 'Property Name' },
                { key: 'propertyValue', label: 'Property Value' },
                { key: 'delete', label: 'actions', requiresModifyMode: true },
            ],
            newProperty: {},
            copySelectedProduct: this.selectedProduct
        }
    },
    async created() {
        const payload = await this.$store.dispatch('getClaims');
        if ('guest'.localeCompare(payload.role) === 0) {
            this.canModify = false;
        }
    },
    methods: {
        changeEditable: async function () {
            this.editable = !this.editable;
        },
        deleteProduct: async function () {
            const token = await this.$store.dispatch('getToken');
            const obj = {
                token: token,
                id: this.selectedProduct.id
            }
            await this.$store.dispatch('deleteProduct', obj);
            this.$emit('reload');
            this.$emit('back');
        },
        setModify: async function () {
            this.editable = !this.editable;
            if (this.modifyText === "Modify") {
                this.newProperty = {
                    propertyName: undefined,
                    propertyValue: undefined
                }
                this.modifyText = "Save";
            }
            else {
                this.modifyText = "Modify";
                if (JSON.stringify(this.copySelectedProduct) !== JSON.stringify(this.selectedProduct)) {
                    await this.$store.dispatch("modifyProduct", this.copySelectedProduct);
                }
            }
        },
        deleteProperty: async function (item) {
            const property = {
                id: this.selectedProduct.id,
                property_name: item.propertyName,
                property_value: item.propertyValue
            }
            await this.$store.dispatch("deleteProperty", property);
            this.$emit('reload');
            this.$emit('refresh', { id: this.selectedProduct.id });
        },
        addProperty: async function () {
            const property = {
                id: this.selectedProduct.id,
                property_name: this.newProperty.propertyName,
                property_value: this.newProperty.propertyValue
            }
            await this.$store.dispatch("addProperty", property);
            this.$emit('reload');
            this.$emit('refresh', { id: this.selectedProduct.id });
        }
    },
    computed: {
        computedFields() {
            if (this.editable) {
                return this.fields.filter(field => !field.requiresModifyMode);

            }
            else {
                return this.fields;
            }
        }
    }

}
</script>