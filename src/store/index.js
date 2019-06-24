import Vue from 'vue'
import Vuex from 'vuex'
import manager from './manager'
import selectedView from './selectedView'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        manager,
        selectedView
    }
})