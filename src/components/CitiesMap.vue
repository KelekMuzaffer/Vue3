
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
import axios from "axios";

  export default {
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
    methods: {
      loadCities(citiesData) {
        this.cities = [];
        for (const {name, coord: {lat, lon}, weather: [{description: weather, icon: icon}], main: {temp: temperature}, dt: updatedAt} of citiesData) {
          this.cities.push({name, lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
        }
      },
    },
    mounted() {
      axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
          .then((resp) => this.loadCities(resp.data.list));
    }
  };
</script>
