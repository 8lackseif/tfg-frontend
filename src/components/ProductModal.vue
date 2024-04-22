<template>
    <div>
        <h2 class="text-center">Product Details</h2>
        <div class="container m-1">
            <b-form-group class="flex-item" id="fieldset-1" label="code:" label-for="input-1">
                <b-form-input id="input-1" v-model="copySelectedProduct.code" trim :disabled="editable" />
            </b-form-group>
            <b-form-group class="flex-item " id="fieldset-2" label="name:" label-for="input-1">
                <b-form-input id="input-1" v-model="copySelectedProduct.name" trim :disabled="editable" />
            </b-form-group>
            <b-form-group class="flex-item" id="fieldset-3" label="description:" label-for="input-1">
                <b-form-input id="input-1" v-model="copySelectedProduct.description" trim :disabled="editable" />
            </b-form-group>
        </div>
        <b-table class="text-start" striped hover responsive :items="copySelectedProperties" :fields="computedFields">
            <!--
            <template v-slot:cell(propertyValue)="{ item }" v-if="!editable">
                <b-input v-model="item['propertyValue']" />
            </template>
-->
            <template v-slot:cell(delete)="{ item }">
                <span><b-btn @click="deleteProperty(item)">delete</b-btn></span>
            </template>
        </b-table>
        <div class="d-flex" style="gap: 1vw" v-if="!editable">
            <b-input class="flex-item" v-model="newProperty.propertyName" trim />
            <b-input class="flex-item" v-model="newProperty.propertyValue" trim />
            <b-btn class="flex-item" @click="addProperty">add</b-btn>
        </div>
        <div class="d-flex" v-if="canModify">
            <b-button class="flex-item" variant="outline-danger" block @click="deleteProduct"> delete </b-button>
            <b-button class="flex-item" variant="outline-info" block @click="setModify"> {{ modifyText }}
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
            copySelectedProduct: { ...this.selectedProduct },
            copySelectedProperties: [...this.selectedProperties],
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
            await this.$emit('reload');
            await this.$emit('back');
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
                if (JSON.stringify(this.copySelectedProduct) != JSON.stringify(this.selectedProduct)) {
                    const token = await this.$store.dispatch('getToken');
                    const product = {
                        id: this.copySelectedProduct.id,
                        code: this.copySelectedProduct.code,
                        name: this.copySelectedProduct.name,
                        description: this.copySelectedProduct.description,
                        token: token
                    }
                    await this.$store.dispatch("modifyProduct", product);
                    await this.$emit('reload');
                    await this.$emit('refresh', { id: this.selectedProduct.id });
                }
            }
        },
        deleteProperty: async function (item) {
            const token = await this.$store.dispatch('getToken');
            const property = {
                id: this.selectedProduct.id,
                property_name: item.propertyName,
                token: token
            }
            await this.$store.dispatch("deleteProperty", property);
            await this.$emit('reload');
            this.copySelectedProperties = this.selectedProperties.filter(property => property.propertyName = item.propertyName );
        },
        addProperty: async function () {
            const token = await this.$store.dispatch('getToken');
            const property = {
                id: this.selectedProduct.id,
                property_name: this.newProperty.propertyName,
                property_value: this.newProperty.propertyValue,
                token: token
            }
            await this.$store.dispatch("addProperty", property);
            await this.$emit('reload');
            this.copySelectedProperties.push(this.newProperty);
            this.newProperty = {
            }
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