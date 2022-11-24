import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import RDMEN_projects from "@/views/RDMEN_projects.vue";
import Market from "@/views/Market.vue";
import Ent_projects from "@/views/Ent_projects.vue";
import Exploitants from "@/views/Exploitants.vue";
import Plateformes from "@/views/Plateformes.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },

  {
    name: "marches",
    path: "/marches",
    component: Market,
  },

  {
    name: "rdmen_projects",
    path: "/rdmen_projects",
    component: RDMEN_projects,
  },

  {
    path: "/ent_projects",
    name: "ent_projects",
    component: Ent_projects,
  },
  {
    path: "/exploitants",
    name: "exploitants",
    component: Exploitants,
  },
  {
    path: "/plateformes",
    name: "plateformes",
    component: Plateformes,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
