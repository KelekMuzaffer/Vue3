
<template>
  <div style="height: 100vh; width: 100vw;">
    <l-map
        v-model="zoom"
        v-model:zoom="zoom"
        :center="[45.8910906, 6.0925617]"
    >
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      <l-marker v-for="city in cities" :lat-lng="[city.lat, city.lon]" :key="city.name">
        <l-icon :icon-url="`https://openweathermap.org/img/wn/${city.icon}.png`" :icon-size="iconSize"/>
      </l-marker>
    </l-map>
  </div>
</template>

<script>

import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { defineComponent} from "vue";
import {useStore} from "@/store";

  export default defineComponent ({
    data() {
      const cities = [];
      const iconWidth = 50;
      const iconHeight = 50;
      return {
        cities,
        zoom: 10,
        iconWidth,
        iconHeight,
      }
    },
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LIcon,
    },
    computed: {
      iconSize() {
        return [this.iconWidth, this.iconHeight];
      },
    },
    setup() {
      const store = useStore();
      return {loadedData: store.state.city};
    },
  });
</script>
