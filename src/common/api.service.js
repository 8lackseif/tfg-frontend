import Vue from "vue"
import VueAxios from "vue-axios"
import axios from "axios"
const api_url = "http://localhost:8000"

const apiServices = {
    init(){
        Vue.use(VueAxios,axios)
    },

    async login(username,pwd){
        return axios.post(api_url + '/login', username, pwd)
        .then(result => {
            return result.data
        })
        .catch(error => {
            console.log(error)
        })
    },
}

export default apiServices;

