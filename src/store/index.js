import Vue from "vue";
import Vuex from "vuex";
import apiServices from "@/common/api.service";

Vue.use(Vuex);

const stable = {

}

const mutations = {

}

const getters = {

}

const actions = {
    async login(username,pwd){
        const data = await apiServices.login(username,pwd)
        return data
    },
    
}
export default {
    stable,
    mutations,
    getters,
    actions,
  };