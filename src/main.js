import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { Icon } from "@iconify/vue2";
import AdminMenu from "./components/AdminMenu.vue";
import { route } from "./store/Global_variables.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

import axios from "axios";
import "./registerServiceWorker";

axios.defaults.baseURL = route;

Vue.config.productionTip = false;

Vue.component("top-menu", AdminMenu);

new Vue({
  router,
  store,
  vuetify,
  Icon,
  render: (h) => h(App),
}).$mount("#app");
