import Vue from "vue";
import Router from "vue-router";
import Login from "@/view/Login";
import Register from "@/view/Register";
import Home from "@/view/Home";
import Sell from "@/view/Sell.vue";
import Tags from "@/view/Tags.vue";

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
      path: "/sell",
      name:"SellProducts",
      component: Sell
    },
    {
      path: "/tags",
      name: "ProductTags",
      component: Tags
    }
]
});