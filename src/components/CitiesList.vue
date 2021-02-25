<template>
  <div>
    <h1>Liste des villes</h1>
    <City v-for="city of loadedData" :key="city.id" :name="city.name" :weather="city.weather" :temperature="city.temperature" :updated-at="city.updatedAt"></City>
  </div>
</template>

<script lang="ts">


  import City from "./City.vue";
  import { defineComponent } from 'vue';
  import { useStore } from '@/store';

  export default defineComponent({
    name: 'CitiesList',
    components: {
      City
    },
    setup() {
      const store = useStore();
      return {loadedData: store.state.city};
    },
  })
</script>

<style scoped>
  h1 {
    margin: 40px 0 0;
  }
</style>
