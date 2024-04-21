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
    },
    async addProduct(product){
        return axios.post(api_url + '/add_product', product)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error.response;
        });
    },
    async deleteProduct(product){
        return axios.post(api_url + '/delete_product', product)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error.response;
        });
    },
    async modifyProduct(product){
        return axios.post(api_url + '/modify_product', product)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error.response;
        });
    },
    async addProperty(property){
        return axios.post(api_url + '/add_property', property)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error.response;
        });
    },
    async deleteProperty(property){
        return axios.post(api_url + '/delete_property', property)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error.response;
        });
    }
    
}

export default apiServices;

