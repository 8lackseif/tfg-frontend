import Vue from "vue";
import Vuex from "vuex";
import apiServices from "@/common/api.service";
import cookies from "@/common/cookies";

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
    },
    mutations : {

    },
    getters : {

    },
    actions:{
        async login(username,pwd){
            const data = await apiServices.login(username,pwd);
            cookies.setUserLogged(data);
        },
        async getLogged(){
            return await cookies.getUserLogged();
        }
    }
});