<template>
  <div>
    <TheHeader />
    <main class="TagsPage">
      <div class="tagsOptions">
        <MySearcher @searchInput="search" />
      </div>
      <div class="tagsContainer fromTagsPage">
        <div class="tag" v-bind:key="t.index" v-for="t in filterTags">
          <p>{{ t.name }}</p>
          <div class="cross" v-if="editable" @click="deleteTag(t.name)">&#x2715;</div>
        </div>
      </div>
      <div class="addTag" v-if="editable">
        <b-input v-model="newTag" trim />
        <b-btn @click="addTag">add</b-btn>
      </div>
      <div class="popularTagsChart">
        <h3>Tags Count</h3>
        <Doughnut :options="chartOptions" :data="chartData" />
      </div>
    </main>
    <TheFooter />
  </div>
</template>


<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import MySearcher from '@/components/MySearcher.vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: 'ProductTags',
  data() {
    return {
      tags: [],
      searchInput: '',
      editable: true,
      newTag: '',
      chartData: {
        labels:[],
        datasets:[{
          backgroundColor: [],
            data: [],
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },
  async created() {
    const payload = await this.$store.dispatch('getClaims');
    if ('guest'.localeCompare(payload.role) === 0) {
      this.editable = false;
    }

    this.tags = await this.$store.dispatch('getTags');
    await this.createChartData();
  },
  methods: {
    search: async function (searchInput) {
      this.searchInput = searchInput;
    },
    deleteTag: async function (tagname) {
      const query = {
        token: await this.$store.dispatch('getToken'),
        name: tagname
      }
      this.$store.dispatch('deleteTag', query);
      this.tags = this.tags.filter(t => t.name != tagname);
    },
    addTag: async function () {
      const query = {
        token: await this.$store.dispatch('getToken'),
        name: this.newTag
      }
      await this.$store.dispatch('addTag', query);
      this.tags = await this.$store.dispatch('getTags');
    },
    createChartData: async function () {
      let chartData = await this.$store.dispatch('getPopularTagsData');
      var labels = [];
      var data = [];
      var colors = new Set();

      chartData.forEach(e => {
        labels.push(e.tag_name);
        data.push(e.count);
          let rcolor = "#" + Math.floor(Math.random() * 16777215).toString(16);
          console.log(rcolor);
          colors.add(rcolor);
      });

      this.chartData = {
        labels: labels,
        datasets:[{
          backgroundColor: Array.from(colors),
            data: data,
        }]
      }
    }
  },
  computed: {
    filterTags() {
      var filteredTags = [];
      filteredTags = this.tags.filter(t => t.name.includes(this.searchInput));
      filteredTags.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0);
      return filteredTags;
    },
    getChartData() {
      return this.chartData;
    },
    getChartOptions() {
      return this.chartOptions;
    }
  },
  components: {
    TheHeader,
    TheFooter,
    MySearcher,
    Doughnut
  }
}
</script>

<style>
.TagsPage {
  min-height: 90vh;
}

.fromTagsPage {
  margin: 0vh 1.4vw;
}

.tagsOptions {
  display: flex;
  height: 5vh;
  margin: 1vh;
  gap: 1vw;
  width: 25vw;
}

.addTag {
  display: flex;
  height: 5vh;
  margin: 2vh;
  width: 20vw;
  gap: 0.5vw;
}

.popularTagsChart {
  margin-top: 5vh;
  height: 50vh;
}
</style>