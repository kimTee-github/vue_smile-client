import Vue from 'vue'
import Vuex from 'vuex'
import { getBanner } from '@/api/data.js'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    banner: [],
    recommend: [],
   
  },
  mutations: {
    getBanner(state, item) {
      state.banner = [...item]
    },
    getRecommend(state, item) {
      state.recommend = [...item]
    }
  },
  actions: {
    getBanner(context) {
      getBanner().then(res => {
        context.commit('getBanner', res.data.banner.list)
      })
    },
    getRecommend(context) {
      getBanner().then(res => {
        context.commit('getRecommend', res.data.recommend.list)
      })
    }
  },
  modules: {

  },
})

export default store
