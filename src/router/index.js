import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    component: () =>
      import(
        /* webpackChunkName: "management-group" */ "@/views/Management/Dashboard.vue"
      ),
    children: [
      {
        path: "",
        name: "Configs",
        component: () =>
          import(
            /* webpackChunkName: "management-group" */ "@/views/Management/Routes/Configs.vue"
          ),
      },
      {
        path: "modules",
        name: "EditModules",
        component: () =>
          import(
            /* webpackChunkName: "management-group" */ "@/views/Management/Routes/Modules.vue"
          ),
      },
      {
        path: "depositions",
        name: "Depositions",
        component: () =>
          import(
            /* webpackChunkName: "management-group" */ "@/views/Management/Routes/Depositions.vue"
          ),
      },
      {
        path: "faqs",
        name: "Faqs",
        component: () =>
          import(
            /* webpackChunkName: "management-group" */ "@/views/Management/Routes/Faqs.vue"
          ),
      },
      {
        path: "subscriptions",
        name: "Subscriptions",
        component: () =>
          import(
            /* webpackChunkName: "management-group" */ "@/views/Management/Routes/Subscriptions.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      setTimeout(() => {
        const element = document.getElementById(to.hash.replace(/#/, ""));
        if (element && element.scrollIntoView) {
          element.scrollIntoView({ block: "end", behavior: "smooth" });
        }
      }, 500);
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

export default router;
