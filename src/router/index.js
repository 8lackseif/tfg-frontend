import Vue from "vue";
import Router from "vue-router";
import Login from "@/view/Login";
import Register from "@/view/Register";
import Home from "@/view/Home";
import AddProduct from '@/view/AddProduct';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name:"Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component : Register
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/addproduct",
      name:"AddProduct",
      component: AddProduct
    }
]
});