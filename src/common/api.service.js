import Vue from "vue"
import VueAxios from "vue-axios"
import axios from "axios"

const apiServices = {
    init(){
        Vue.use(VueAxios,axios)
    },

    login(username,pwd){
        axios.post('/login', username, pwd)
        .then(result => {
            return result
        })
        .catch(error => {
            console.log(error)
        })
    },
}

export default apiServices;

