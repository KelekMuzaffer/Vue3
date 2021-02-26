import axios from 'axios';
import {InjectionKey} from 'vue'
import {createStore, Store, useStore as baseUseStore,} from 'vuex';

/// define your typings for the store state
export interface State {
    city: Array<{name: string,weather: number, temperature: number, updatedAt: Date}>
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        city: []
    },
    mutations: {
        initialiseStore(state) {
            if (localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store') || '{}'))
                );
            }
        },
        loadCities(state, payload) {
            state.city = [];
            for (const {name, weather: [{description: weather}], main: {temp: temperature}, dt: updatedAt} of payload) {
                state.city.push({name, weather, temperature, updatedAt: new Date(updatedAt * 1000)});
            }
        }
    },
    actions: {
        weather({commit, state}) {
                axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                    .then((resp) => commit('loadCities', resp.data.list))
        }
    },
    getters: {
    cityGet: state => (name: any) => {
            return state.city.filter(city => city.name.toLowerCase().startsWith(name.toLowerCase()))
    }
}
})

// define your own `useStore` composition function
export function useStore() {
    return baseUseStore(key)
}