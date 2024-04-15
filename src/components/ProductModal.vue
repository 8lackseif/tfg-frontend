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
        }
    },
    methods: {
        changeEditable: async function () {
            this.editable = !this.editable;
        }
    }

}
</script>