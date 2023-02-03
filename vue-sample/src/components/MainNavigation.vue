<script>
import { fetchPathData, fetchPaths, fetchCategorySearch } from './../store/swapiService';
import CardDetails from './CardDetails.vue';

export default {
  data() {
    return {
      paths: [],
      pathData: {},
      cardData: {},
      filteredPathData: {},
      activeDataPath: '',
      activeCategoryPath: ''
    };
  },
  async mounted() {
    this.paths = await fetchPaths();
  },
  methods: {
    async displayPath(path) {
      this.pathData = await fetchPathData(path);
      this.filteredPathData = Object.create(this.pathData);
      this.activeCategoryPath = path;
    },
    async displayCardData(cardPath) {
      this.cardData = await fetchPathData(cardPath);
      this.activeDataPath = cardPath;
    },
    async searchByName(query, data) {
      this.filteredPathData = {};
      if(query == '') return false;
      this.filteredPathData = await fetchCategorySearch(this.activeCategoryPath, query);
    }
  },
  components: { CardDetails },
};
</script>

<template>
  <div class="container">
    <div class="container-content category-content">
      <ul class="list category-list">
        <h2>Categories</h2>
        <li class="list-item" v-for="(path, name) in paths" :class="{active: activeCategoryPath == name}">
          <h3 @click="() => displayPath(name)">{{ name }}</h3>
        </li>
      </ul>
    </div>
    <div class="container-content path-content">
      <ul class="list card-list">
        <h2>Entities</h2>
        <li class="list-item" v-for="data in filteredPathData.results" :class="{active: activeDataPath == data.url}">
          <h3 @click="() => displayCardData(data.url)">{{  data.name || data.title }}</h3>
        </li>
      </ul>
      <div class="btn-group">
        <input @input="(event) => searchByName(event.target.value, pathData)" type="text" placeholder="search.." />

        <button
          @click="() => displayPath(pathData.previous)"
          :disabled="pathData.previous == null"
        >
          Previous
        </button>
        <button
          @click="() => displayPath(pathData.next)"
          :disabled="pathData.next == null"
        >
          Next
        </button>
      </div>
    </div>
    <div class="card-content container-content">
      <CardDetails :details="cardData" />
    </div>
  </div>
</template>

<style scoped>
.container-content {
  display: flex;
  flex-direction: column;
  background-color: #deecfb;
  justify-content: space-between;
  align-self: stretch;
  overflow: hidden;

  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 20%;
  height: calc(100vh - 4em);
  border-radius: .2em;

  box-shadow: 1px 1px 2px #deecfb;
}

.category-content,
.path-content {
  text-align: center;
}

.card-content {
  flex-grow: 2;
  flex-basis: 50%;
}

.path-content input {
  padding: .3em .5em;
  margin-bottom: .3em;
  width: 80%;
  border-radius: .3em;
  border: 1px solid #1666ba;

}

.list-item h3 {
  padding: 1em;
  cursor: pointer;
}

.list-item h3:hover {
  background-color: #7ab3ef;
}

.btn-group {
  align-self: center;
  margin-bottom: .5em;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}

.btn-group button {
  margin: .3em;
  flex-basis: 40%;
  flex-shrink: 1;
}

.active {
  background: #368ce7;
  color:	#deecfb;
}

</style>
