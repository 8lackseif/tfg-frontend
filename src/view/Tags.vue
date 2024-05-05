<template>
  <div>
    <TheHeader />
    <main class="TagsPage">
      <div class="tableOptions">
      <MySearcher @searchInput="search" />
      </div>
      <div class="tagsContainer fromTagsPage">
        <div class="tag" v-bind:key="t.index" v-for="t in filterTags">
          <p>{{ t.name }}</p>
          <div class="cross" v-if="editable" @click="deleteTag(t.name)">&#x2715;</div>
        </div>
      </div>
    </main>
    <TheFooter />
  </div>
</template>


<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import MySearcher from '@/components/MySearcher.vue';

export default {
  name: 'ProductTags',
  data() {
    return {
      tags: [],
      searchInput: '',
      editable: true,
    }
  },
  async created() {
    const payload = await this.$store.dispatch('getClaims');
        if ('guest'.localeCompare(payload.role) === 0) {
            this.editable = false;
        }

    this.tags = await this.$store.dispatch('getTags');
  },
  methods: {
    search: async function (searchInput){
      this.searchInput = searchInput;
    },
    deleteTag: async function(tagname) {
      const query = {
        token: await this.$store.dispatch('getToken'),
        name: tagname
      }
      this.$store.dispatch('deleteTag', query);
      this.tags = this.tags.filter(t=> t.name != tagname);
    }
  },
  computed: {
    filterTags() {
      var filteredTags = [];
      filteredTags = this.tags.filter(t => t.name.includes(this.searchInput));
      filteredTags.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0);
      return filteredTags;
    }
  },
  components: {
    TheHeader,
    TheFooter,
    MySearcher
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
</style>