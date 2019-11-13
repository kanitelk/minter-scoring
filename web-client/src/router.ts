import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/address/:id",
      name: "address",
      props: route => ({ address: route.params.id }),
      component: () => import("./views/Address.vue")
    },
    {
      path: "/blacklist",
      props: route => ({ address: route.params.id }),
      component: () => import ("./views/BlackList.vue")
    },
    {
      path: "/blacklist/:id",
      props: route => ({ address: route.params.id }),
      component: () => import ("./views/BlackList.vue")
    }
  ]
});
