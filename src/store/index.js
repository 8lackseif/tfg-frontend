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
        async login(_,userData){
            const response = await apiServices.login(userData);
            if(response.status == 200){
                cookies.setJWTToken(response.data);
            }
            return response;
        },
        async register(_,userData){
            await apiServices.register(userData);
        },
        async getToken(){
            return await cookies.getJWTToken();
        }
    }
});