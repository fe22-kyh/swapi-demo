<script>

import { fetchPathData } from './../store/swapiService';

const transformHttps = async value => {
  if((typeof value != 'string' ) || !value.includes("https://")) return value;
  let pathData = await fetchPathData(value);
  return pathData.name || pathData.title;
}

export default {
  props: ["details"],
  data() {
    return {
      isExpanded: false,
      title: "Entity information",
      card: {},
      extra: {}
    }
  },
  methods: {
    toggleExpandedState() {
      this.isExpanded = !this.isExpanded;
    }
  },
  watch: {
    async details(newDetails, oldDetails) {
      this.card = {}
      this.extra = {}
      this.title = newDetails.name || newDetails.title;
      for(let key in newDetails) {
        let prop = newDetails[key];
        key = key.replaceAll("_", " ")
        key = key.charAt(0).toUpperCase() + key.slice(1);
        if(Array.isArray(prop)) {
          if(prop.length > 0) {
            this.extra[key] = []
            for(const item in prop) {
              this.extra[key].push(await transformHttps(prop[item]));
            }
          }
        } else if(!"Url, Created, Edited, Name, Title".includes(key)) {
          this.card[key] = await transformHttps(prop);
        }
      }
    }
  }
}
</script>

<template>
  <div class="card">
    <div>
      <div class="card-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="card-body">
        <p  v-for="(value, key) in card" class="card-text">
          {{ key  }} - {{ value }}
        </p>
      </div>
    </div>

    <footer class="card-extra">
      <div v-for="(items, category) in extra">
        <h4>{{category}}</h4>
        <ul>
          <li v-for="item in items">{{ item }}</li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.card {
  font-size: 20px;
}
.card-header {
  position: relative;
  isolation: isolate;
  margin-bottom: 2em;
  padding: 1em;
  color: #ffffff;
}

.card-header::after {
  content: '';
  position: absolute;
  height: calc(1.5em + 100%);
  width: calc(1.75em + 100%);
  top: -1em;
  left: -1em;
  background-color: #368ce7;
  z-index: -1;
}

.card-body {
  display: flex;
  flex-wrap: wrap;
  gap: .5em;
  justify-content: space-evenly;
}

.card-text {
  flex: 0 0 40%;
}

.card-extra {
  display: flex;
  justify-content: space-evenly;
  margin-top: 2em;
  gap: 1em;
}

.card-extra li {
  padding: .3em;
  font-size: .9rem;
}

</style>