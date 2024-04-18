<template>
    <div>
        <h2 class="text-center">Product Details</h2>
        <div class="container m-1">
            <b-form-group class="flex-item" id="fieldset-1" label="code:" label-for="input-1">
                <b-form-input id="input-1" :value="selectedProduct.code" trim :disabled="editable" />
            </b-form-group>
            <b-form-group class="flex-item " id="fieldset-1" label="name:" label-for="input-1">
                <b-form-input id="input-1" :value="selectedProduct.name" trim :disabled="editable" />
            </b-form-group>
            <b-form-group class="flex-item" id="fieldset-1" label="description:" label-for="input-1">
                <b-form-input id="input-1" :value="selectedProduct.description" trim :disabled="editable" />
            </b-form-group>
            <b-form-group class="flex-item" id="fieldset-1" label="stock:" label-for="input-1">
                <b-form-input id="input-1" :value="selectedProduct.stock" trim :disabled="editable" />
            </b-form-group>
        </div>
        <b-table class="text-start" striped hover responsive :items="selectedProperties" :fixed=true />
        <b-button class="mt-3" variant="outline-danger" block @click="deleteProduct" v-if="canModify"> delete </b-button>
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
            required:true
        }
    },
    data() {
        return {
            editable: true,
            canModify: true,
        }
    },
    async created(){
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
            await this.$store.dispatch('deleteProduct',obj);
            this.$emit('reload');
            this.$emit('back');
            }
    }

}
</script>