import Vue from "vue";
import Vuex from "vuex";
import apiServices from "@/common/api.service";
import cookies from "@/common/cookies";
import JWTDecoder from "vue-jwt-decode";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
    },
    mutations: {
        setProducts(state, products) {
            Vue.set(state, 'products', products);
        }
    },
    getters: {
        getProducts(state) {
            return state.products;
        }
    },
    actions: {
        async login(_, userData) {
            const response = await apiServices.httpRequest(userData, '/login');
            if (response.status == 200) {
                cookies.setJWTToken(response.data);
            }
            return response;
        },
        async logout() {
            await cookies.logOut();
        },
        async register(_, userData) {
            await apiServices.httpRequest(userData, '/register');
        },
        async getToken() {
            return await cookies.getJWTToken();
        },
        async getClaims() {
            const token = await cookies.getJWTToken();
            if (token !== null) {
                const payload = JWTDecoder.decode(token);
                return payload;
            }
            return null;
        },
        async loadProducts() {
            const token = await cookies.getJWTToken();
            const response = await apiServices.httpRequest(token, '/get_products');
            if (response.status === 200) {
                return response.data;
            }
        },
        async addProduct(_, product) {
            await apiServices.httpRequest(product, '/add_product');
        },
        async deleteProduct(_, product) {
            await apiServices.httpRequest(product, '/delete_product');
        },
        async modifyProduct(_, product) {
            await apiServices.httpRequest(product, '/modify_product');
        },
        async deleteProperty(_, property) {
            await apiServices.httpRequest(property, '/delete_property');
        },
        async addProperty(_, property) {
            await apiServices.httpRequest(property, '/add_property');
        },
        async getTags() {
            const token = await cookies.getJWTToken();
            const response = await apiServices.httpRequest(token, '/get_tags');
            if (response.status === 200) {
                return response.data;
            }
        },
        async addTag(_, tag) {
            await apiServices.httpRequest(tag, '/add_tag');
        },
        async deleteTag(_, tag) {
            await apiServices.httpRequest(tag, '/delete_tag');
        },
        async bindTag(_, tag) {
            await apiServices.httpRequest(tag, '/bind_tag');
        },
        async unbindTag(_, tag) {
            await apiServices.httpRequest(tag, '/unbind_tag');
        },
        async changeStock(_, stocks) {
            await apiServices.httpRequest(stocks, '/var_stock');
        },
        async getStocks() {
            const token = await cookies.getJWTToken();
            const response = await apiServices.httpRequest(token, '/get_stocks');
            if (response.status === 200) {
                return response.data;
            }
        },
        async getChartData(_, query) {
            const response = await apiServices.httpRequest(query, '/get_stock_history');
            if (response.status === 200) {
                return response.data;
            }
        }
    }
});