import Vue from "vue"
import VueAxios from "vue-axios"
import axios from "axios"
const api_url = "http://localhost:8000"

const apiServices = {
    init(){
        Vue.use(VueAxios,axios)
    },
    async httpRequest(userData, endpoint){
        return axios.post(api_url + endpoint, userData)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error.response;
        });
    }
}

export default apiServices;

