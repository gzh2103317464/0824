import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {reqgoodsList} from '../../uitl/request'
const state = {
    list:[]
}

const mutations = {
   changeList(state,arr){
       state.list = arr
   }
}

const actions = {
    repuestgoodsList(context){
        reqgoodsList({
            istree:true
        }).then(res=>{
            context.commit('changeList' , res.data.list)
        })
    }
}

const getters = {
    list(state){
        return state.list
    }
  

}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
