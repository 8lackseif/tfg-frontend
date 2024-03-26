import Vue from "vue";
import Vuex from "vuex";
import apiServices from "@/common/api.service";
import cookies from "@/common/cookies";
import JWTDecoder from "vue-jwt-decode";

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
        },
        async getClaims(){
            const token = await cookies.getJWTToken();
            const payload = JWTDecoder.decode(token);
            return payload;
        }
    }
});