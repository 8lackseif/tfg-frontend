import Vue from "vue"
import VueAxios from "vue-axios"
import axios from "axios"


const apiServices = {
    init(){
        Vue.use(VueAxios,axios)
    },
    async httpRequest(userData, endpoint){
        console.log(process.env);
        return axios.post(process.env.VUE_APP_API_URL + endpoint, userData)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error.response;
        });
    }
}

export default apiServices;

