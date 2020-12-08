import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import manger from './modules/manger'
import cate from './modules/cate'
import spec from './modules/spec'
export default new Vuex.Store({
    modules:{
        menu,
        role,
        manger,
        cate,
        spec

    }

})