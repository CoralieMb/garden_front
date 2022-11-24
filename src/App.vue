<template>
  <v-app>
    <!-- Appel des composants qui constitueront les pages du router -->

    <!-- AdminMenu -->
    <v-app-bar fixed flat>
      <headerlogo></headerlogo>
      <AdminMenu></AdminMenu>
    </v-app-bar>

    <router-view></router-view>

    <!-- Zone dans laquelle apparaitra la page définit dans chaque route (dans index.js de route) -->
  </v-app>
</template>

<script>
import Headerlogo from "./components/Header_logo.vue";
import AdminMenu from "./components/AdminMenu.vue";

export default {
  name: "App",
  components: {
    AdminMenu,
    Headerlogo,
  },
};
</script>

<style>
@import "./assets/style.css";
</style>
