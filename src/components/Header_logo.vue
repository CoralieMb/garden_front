<template>
  <v-container class="header_logo">
    <v-toolbar flat class="hidden-sm-and-down">
      <div class="logo_and_user">
        <div class="logo_div">
          <v-img class="logo" src="../assets/garden.png"></v-img>
        </div>

        <div class="user">
          <Icon icon="ic:baseline-account-circle" />
          <p>Mon Compte</p>
        </div>
      </div>
    </v-toolbar>

    <v-toolbar flat class="hidden-md-and-up"> </v-toolbar>
  </v-container>
</template>

<script>
import { Icon } from "@iconify/vue2";

export default {
  name: "Headerlogo",
  data: () => ({}),
  components: {
    Icon,
  },
};
</script>

<style scoped>
.header_logo {
  max-width: none !important;
  position: fixed;
  background-color: #fff;
}

@media (max-width: 480px) {
  .header_logo {
    position: fixed;
    background-color: #3a38a9;
    height: 30px;
    position: absolute;
    top: 0 !important;
  }
}

.container {
  padding: 12px 0 12px 0;
}

.logo_and_user {
  width: 100% !important;
}
</style>
>
