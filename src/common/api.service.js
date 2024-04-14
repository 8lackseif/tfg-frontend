import Vue from "vue"
import VueAxios from "vue-axios"
import axios from "axios"
const api_url = "http://localhost:8000"

const apiServices = {
    init(){
        Vue.use(VueAxios,axios)
    },

    async login(userData){
        return axios.post(api_url + '/login', userData)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error.response;
        })
    },
    async register(userData){
        
        return axios.post(api_url + '/register', userData)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error.response;
        });

    },
    async getProducts(token){
        return axios.post(api_url + '/get_products', token)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error.response;
        });
    }
}

export default apiServices;

