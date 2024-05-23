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
      <div class="separator"></div>
      <div class="stockContainer">
        <div class="stockData" v-for="(s, index) in getStocks" v-bind:key="index">
          <p> Product: {{ s.name }}<br>Quantity: {{ s.quantity }}</p>
          <div class="cross" @click="deleteStock(index)">&#x2715;</div>
        </div>
      </div>
      <div class="stockTrigger">
        <b-button class="flex-item" @click="changeStock">Change Stock</b-button>
      </div>
      <div class="chartStock">
        <h3>Stock Variation History</h3>
        <v-select v-model="selectedProductChart" :options="products" label="name" @option:selected="getChartDatas(selectedProductChart.id)" />
        <Bar id="my-chart" :options="getChartOptions" :data="getChartData" />
      </div>
      <div class="lastStocks">
        <p v-for="(s, index) in getLastStocks" v-bind:key="index">Product {{ s.product_name }}({{
          s.product_id }}) stock changes {{ s.quantity }} on date {{ s.date }}</p>
      </div>
     
      
    </main>
    <TheFooter />
  </div>
</template>


<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

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
      selectedProductChart: {

      },
      stocks: [],
      last_stocks_info: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: '#f87979',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  async created() {
    this.products = await this.$store.dispatch("loadProducts");
    this.last_stocks_info = await this.$store.dispatch("getStocks");
    this.selectedProductChart = this.products[0];
    await this.getChartDatas(this.selectedProductChart.id);
  },
  computed: {
    getStocks() {
      return this.stocks;
    },
    getLastStocks() {
      return this.last_stocks_info;
    },
    getChartData() {
      return this.chartData;
    },
    getChartOptions() {
      return this.chartOptions;
    }
  },
  methods: {
    addStock: async function () {
      let n = parseInt(this.quantity); 
      if (n != 0 && (this.selectedProduct.stock + n) >= 0) {
        const obj = {
          name: this.selectedProduct.name,
          product_id: this.selectedProduct.id,
          quantity: n
        }

        this.stocks.push(obj);
      }
    },
    deleteStock: async function (index) {
      this.stocks.splice(index, 1);
    },
    changeStock: async function () {
      let stocks = this.stocks.map(stock => {
        let newStock = { ...stock };
        delete newStock["name"];
        return newStock;
      });

      const obj = {
        token: await this.$store.dispatch('getToken'),
        stocks: stocks
      }

      await this.$store.dispatch('changeStock', obj);
      this.stocks = [];
      this.last_stocks_info = await this.$store.dispatch("getStocks");
      this.getChartDatas(this.selectedProductChart.id);
    },
    getChartDatas: async function (product_id) {
      let data = await this.$store.dispatch("getChartData", {
        token: await this.$store.dispatch("getToken"),
        id: product_id
      });

      var chartLabel = [];
      var chartData = [];
      data.forEach(e => {
        chartLabel.push(e.year);
        chartData.push(e.quantity);
      });

      this.chartData = {
        labels: chartLabel,
        datasets: [
          {
            label: 'stock variation of product: ' + product_id,
            backgroundColor: '#f87979',
            data: chartData
          }
        ]
      }
    }

  },
  components: {
    TheHeader,
    TheFooter,
    Bar
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

.lastStocks {
  width: 70%;
  border: 1px solid black;
  margin: 10vh 15%;
  padding: 2vh 2vw;
  text-align: start;
  border-radius: 10px;
  background-color: antiquewhite;
}

.chartStock {
  width: 70%;
  margin: 10vh 15%;
}

.separator {
  border: 1px grey dotted;
  width: 90%;
  margin: 5vh 5%;
}

.stockPage {
  min-height: 90vh;
}
</style>