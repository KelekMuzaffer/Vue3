import { RouteRecordRaw, createWebHistory, createRouter } from "vue-router";
import CitiesList from "../components/CitiesList.vue";
import City from "../components/City.vue";
import EasterEgg from "../components/EasterEgg.vue";

const routes: Array<RouteRecordRaw> = [
  { path: '/villes', component: CitiesList },
  // { path: '/carte', component: CitiesMap },
  { path: '/ville', component: City },
  { path: '/onenagros', component: EasterEgg}
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;