import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { reqspecsList ,reqspecsCount} from '../../uitl/request'
const state = {
    list: [],
    total: 0, // 获取总数
    size: 2,
    page: 1
}

const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeCount(state, num) {
        state.total = num
    },
    // 修改当前页
    changePage(state, page) {
        state.page=page
    }
}

const actions = {
    repuestspecsList(context) {
        reqspecsList({
            page: context.state.page,
            size: context.state.size,
        }).then(res => {
            var arr = res.data.list;
            // console.log(arr);
            arr.forEach(item => {
                item.attrs = JSON.parse(item.attrs)

            })

            context.commit('changeList', arr)

        })

    },
     // 获取总数
     requestspecsCount(context) {
        reqspecsCount().then(res => {
            context.commit('changeCount', res.data.list[0].total)
        })
    },


    // 修改当前页码数
    changeCurrentPages(context , page){
        context.commit('changePage', page)
        // 根据当前点击的页码数，重新发送请求，由于muntation没有权限修改action所以取药借助仓库（context）
        context.dispatch('repuestspecsList' )

    },
}

const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    page(state){
        return state.page
    },
    size(state){
        return state.size
    }


}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
