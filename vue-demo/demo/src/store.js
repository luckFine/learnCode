// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {
    namespaced: true,
    state: {
        countA: 1
    },
    mutations: {
        incrementA(state) {
            state.countA++
        }
    }
}

const moduleB = {
    namespaced: true,
    state: {
        countB: 1
    },
    mutations: {
        incrementB(state) {
            state.countB++
        }
    }
}


export default new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    },
    state: {
        age: 19
    },
    mutations: {
        syncChange(state, plyload) {
            state.age += plyload
        }
    },
    actions: {
        syncChange({ commit }, plyload) {
            setTimeout(() => {
                commit('syncChange', plyload)
            }, 1000)
        }
    },
    getters: {
        mgAge(state) {
            return state.age + 20
        }
    }
})