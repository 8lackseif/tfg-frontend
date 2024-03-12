import Vue from "vue";
import Vuex from "vuex";
import apiServices from "@/common/api.service";

Vue.use(Vuex);

const actions = {
    async login(username,pwd){
        return apiServices.login(username,pwd)
    },
    
}
export default {
    actions,
  };