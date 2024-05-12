<template>
  <div>
    <TheHeader />
    <main class="stockPage">
      <div class="stockForm">
        <v-select class="flex-item" v-model="selectedProduct" :options="products" label="name" />
        <b-form-group class="flex-item" id="fieldset-1" label="Quantity:" label-for="input-1">
          <b-form-input id="input-1" v-model="quantity" trim />
        </b-form-group>
        <b-button class="flex-item" @click="addStock">Add to Stock Table</b-button>
      </div>
      <div class="Separator"></div>
      <div class="stockContainer">
        <div class="stockData" v-for="(s, index) in getStocks" v-bind:key="index">
          <p> Product: {{ s.name }}<br>Quantity: {{ s.quantity }}</p>
          <div class="cross" @click="deleteStock(index)">&#x2715;</div>
        </div>
      </div>
      <div class="stockTrigger">
        <b-button class="flex-item" @click="changeStock">Change Stock</b-button>
      </div>
    </main>
    <TheFooter />
  </div>
</template>


<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'StockVar',
  data() {
    return {
      products: [],
      quantity: 0,
      selectedProduct: {
        id: "",
        code: "",
        name: "",
        description: "",
        stock: 0,
        image_url: "",
        tags: "",
        properties: ""
      },
      stocks: [],
    }
  },
  async created() {
    this.products = this.$store.getters.getProducts.products;
  },
  computed: {
    getStocks() {
      return this.stocks;
    }
  },
  methods: {
    addStock: async function () {
      if (this.quantity != 0) {
        const obj = {
          name: this.selectedProduct.name,
          product_id: this.selectedProduct.id,
          quantity: parseInt(this.quantity)
        }

        this.stocks.push(obj);
      }
    },
    deleteStock: async function (index) {
      this.stocks.splice(index, 1);
    },
    changeStock: async function() {
      const obj = {
        token: await this.$store.dispatch('getToken'),
        stocks: this.stocks
      }

      await this.$store.dispatch('changeStock', obj);
    }

  },
  components: {
    TheHeader,
    TheFooter
  },
}

</script>

<style>
.stockForm {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border: 1px grey solid;
  border-radius: 10px;
  width: 70%;
  margin: 2vh 15%;
  padding: 2vh 2vw;
}

.stockContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px grey solid;
  border-radius: 10px;
  width: 70%;
  margin: 2vh 15%;
  padding: 2vh 2vw;
  background-color: rgb(221, 252, 160);
  gap: 2vw;
}

.stockData {
  display: flex;
  flex-wrap: nowrap;
  gap: 5%;
  border: 1px grey solid;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  text-align: start;
  width: 20%;
  padding: 1vh;
  background-color: rgb(246, 252, 160);
}

.stockData>.cross {
  color: rgb(70, 70, 70);
}

.stockData>.cross:hover {
  color: red;
  cursor: pointer;
}

.stockTrigger {
  display: flex;
  width: 70%;
  margin: 1vh 15%;
}

.Separator {
  border: 1px grey dotted;
  width: 90%;
  margin: 1vh 5%;
}

.stockPage {
  min-height: 90vh;
}
</style>