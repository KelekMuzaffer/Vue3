<template>
  <div>
    <h1>Liste des villes</h1>
    <div class="seachCity">
      <form class="form-inline"></form>
      <h3><label>Search city:</label></h3>
      <input type="text" v-model="name" class="form-control" placeholder="Tapez une ville"/>

    </div>
    <City v-for="city of cityFilter" :key="city.id" :name="city.name" :weather="city.weather" :temperature="city.temperature" :updated-at="city.updatedAt"></City>
  </div>
</template>

<script lang="ts">


  import City from "./City.vue";
  import { defineComponent, ref, computed } from 'vue';
  import { useStore } from '@/store';

  export default defineComponent({
    name: 'CitiesList',
    components: {
      City
    },
    setup() {
      const name = ref("");
      const store = useStore();
      const cityFilter = computed(() => {
        return store.getters.cityGet(name.value)
      })
      return { name, cityFilter};
    }
  })
</script>

<style scoped>
  h1 {
    margin: 40px 0 0;
  }
</style>
