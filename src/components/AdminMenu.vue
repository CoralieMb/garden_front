<template>
  <v-container class="header">
    <!-- Destock menu -->
    <v-toolbar flat class="hidden-sm-and-down">
      <div class="principalMenu">
        <v-list id="nav">
          <v-list-item v-for="item in principalmenu" :key="item.route">
            <v-list-item-content v-if="item.title == 'Gestion Du Déploiement'">
              <!-- Deployment submenu -->
              <v-menu offset-y close-on-click nudge-bottom="15">
                <template v-slot:activator="{ on, attrs }">
                  <div v-bind="attrs" v-on="on" class="linkMenu">
                    {{ item.title }}<Icon icon="akar-icons:chevron-down" />
                  </div>
                </template>
                <v-list>
                  <v-list-item
                    v-for="item in deploymentmenutitle"
                    :key="item.route"
                  >
                    <router-link class="linkSubMenu" :to="item.route">{{
                      item.title
                    }}</router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-content>

            <v-list-item-content
              v-else-if="item.title == 'Gestion Des Référentiels'"
            >
              <!-- Referential submenu -->

              <v-menu offset-y close-on-click nudge-bottom="15">
                <template v-slot:activator="{ on, attrs }">
                  <div v-bind="attrs" v-on="on" class="linkMenu">
                    {{ item.title }}<Icon icon="akar-icons:chevron-down" />
                  </div>
                </template>
                <v-list>
                  <v-list-item
                    v-for="item in referentialmenutitle"
                    :key="item.route"
                  >
                    <router-link class="linkSubMenu" :to="item.route">{{
                      item.title
                    }}</router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-content>
            <v-list-item-content v-else>
              <router-link class="linkMenu" :to="item.route">{{
                item.title
              }}</router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-toolbar>

    <!-- Mobile menu -->
    <v-toolbar flat class="hidden-md-and-up">
      <div class="logo_div_mobile">
        <v-img class="logo_mobile" src="../assets/garden.png"></v-img>
      </div>
      <v-spacer></v-spacer>
      <div
        class="iconBuger"
        v-if="mobileMenu == false"
        @click.stop="mobileMenu = !mobileMenu"
      >
        <!-- burger menu icon -->
        <Icon icon="icon-park-outline:hamburger-button" />
      </div>
      <div
        class="iconBuger"
        v-else
        @click.stop="
          (mobileMenu = false),
            (deploymentmenu = false),
            (referentialmenu = false)
        "
      >
        <!-- burger menu icon -->
        <Icon icon="eva:close-fill" />
      </div>

      <!-- Principal Mobile Menu -->
      <v-navigation-drawer
        v-model="mobileMenu"
        id="principalMobileMenu"
        absolute
        hide-overlay
        stateless
      >
        <v-list class="principalMobileMenuTitle" nav dense>
          <v-list-item v-for="item in principalmenu" :key="item.route">
            <v-list-item-content
              v-if="item.title == 'Gestion Du Déploiement'"
              @click.stop="deploymentmenu = !deploymentmenu"
            >
              <div class="linkMobileMenu">
                {{ item.title }}<Icon icon="ic:outline-navigate-next" />
              </div>
            </v-list-item-content>
            <v-list-item-content
              v-else-if="item.title == 'Gestion Des Référentiels'"
              @click.stop="referentialmenu = !referentialmenu"
            >
              <div class="linkMobileMenu">
                {{ item.title }}<Icon icon="ic:outline-navigate-next" />
              </div>
            </v-list-item-content>
            <v-list-item-content v-else @click.stop="mobileMenu = !mobileMenu">
              <router-link class="linkMobileMenu" :to="item.route">{{
                item.title
              }}</router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Deployment Mobile Menu -->

      <v-navigation-drawer
        v-model="deploymentmenu"
        stateless
        hide-overlay
        absolute
      >
        <div
          class="deployementLink2"
          @click.stop="deploymentmenu = !deploymentmenu"
        >
          <Icon icon="ooui:previous-ltr" />Gestion Du Déploiement
        </div>
        <v-list class="deploymentMobileMenuTitle" nav dense>
          <v-list-item v-for="item in deploymentmenutitle" :key="item.route">
            <v-list-item-content
              @click.stop="
                (mobileMenu = !mobileMenu), (deploymentmenu = !deploymentmenu)
              "
            >
              <router-link class="linkMobileMenu" :to="item.route">{{
                item.title
              }}</router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Referencial Mobile Menu -->

      <v-navigation-drawer
        v-model="referentialmenu"
        stateless
        hide-overlay
        absolute
      >
        <div
          class="deployementLink2"
          @click.stop="referentialmenu = !referentialmenu"
        >
          <Icon icon="ooui:previous-ltr" />Gestion Du Déploiement
        </div>
        <v-list class="referentialMobileMenuTitle" nav dense>
          <v-list-item v-for="item in referentialmenutitle" :key="item.route">
            <v-list-item-content
              @click.stop="
                (mobileMenu = !mobileMenu), (referentialmenu = !referentialmenu)
              "
            >
              <router-link class="linkMobileMenu" :to="item.route">{{
                item.title
              }}</router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-toolbar>
  </v-container>
</template>

<script>
import { Icon } from "@iconify/vue2";

export default {
  name: "AdminMenu",
  data: () => ({
    /* Menu Titles */

    principalmenu: [
      { route: "/", title: "Tableau De Bord" },
      { route: "marches", title: "Gestion Des Marchés" },
      { route: "gestion_deploiements", title: "Gestion Du Déploiement" },
      { route: "referentiels", title: "Gestion Des Référentiels" },
      { route: "journal", title: "Journal Des Actions" },
      { route: "comptes", title: "Gestion Des Comptes" },
    ],
    deploymentmenutitle: [
      { route: "etat", title: "Etat Actuel" },
      { route: "nouveau_deploiement", title: "Nouveau Déploiement" },
      { route: "etablissements", title: "Regroupement d'Etablissements" },
      { route: "effectif", title: "Effectifs" },
      { route: "clore_deploiement", title: "Clore Un Déploiement" },
      {
        route: "historique_deploiements",
        title: "Historique Des Déploiements",
      },
    ],
    referentialmenutitle: [
      { route: "type_projets", title: "Types de projets territoriaux" },
      { route: "ent_projects", title: "Projets ENT" },
      { route: "rdmen_projects", title: "RD MEN" },
      { route: "exploitants", title: "Exploitants" },
      { route: "plateformes", title: "Plateformes" },
    ],
    mobileMenu: false /* turn on true when we open the mobile menu */,
    deploymentmenu: false,
    referentialmenu: false,
  }),
  components: {
    Icon,
  },
};
</script>

<style scoped>
/* Destock menu */

.header {
  max-width: none !important;
  margin-top: 137px;
}

.principalMenu {
  background-color: #3a38a9;
  width: 100%;
}

.container {
  padding: 12px 0 12px 0;
  max-width: none !important;
}

.v-list {
  padding: 0 !important;
}

.linkMenu {
  background-color: #3a38a9;
  color: white;
  display: flex;
  align-items: center;
  margin: 0 20px 0 0;
  border-radius: 0px;
  text-decoration: none;
  font-size: 13px;
  justify-content: center !important;
}

.linkMenu:hover {
  font-weight: 300;
  color: rgb(37, 170, 223);
}

.linkMenu::before {
  display: none;
}

.linkSubMenu {
  text-decoration: none;
  font-size: 13px !important;
  color: #000;
}

.linkSubMenu:hover {
  color: #1976d2;
}

.home {
  color: #fff !important;
  width: 32px;
  height: 32px;
}

#nav {
  display: flex;
  justify-content: center !important;
  text-align: center !important;
}

/* mobile menu */

@media (max-width: 480px) {
  .header {
    position: fixed;
    margin-top: 60px;
  }

  .v-app-bar__nav-icon {
    margin-bottom: 12px !important;
    margin-right: 10px !important;
  }

  .v-btn > .v-btn__content .v-icon {
    color: #000 !important;
  }

  .v-list--nav .v-list-item {
    padding: 0 !important;
  }

  .v-list {
    padding: 0 !important;
    align-items: unset !important;
    justify-content: unset !important;
    text-align: unset !important;
  }

  .v-list-item {
    border-bottom: 1px solid #c6c6c6 !important;
    width: 100% !important;
  }

  .v-navigation-drawer {
    width: 100% !important;
    z-index: 1 !important;
    background-color: #fff !important;
    top: 55px !important;
    height: 100vh !important;
  }

  .v-navigation-drawer__content {
    width: 100% !important;
  }
}

#principalMobileMenu {
  width: 100%;
  height: 100%;
  background-color: white;
}

.logo_div_mobile {
  margin: 0 0 0 20px;
}

.iconBuger,
.iconCloseBurger {
  margin: 0 20px 0 0;
}

.hidden-md-and-up {
  background-color: #fff !important;
}

.principalMobileMenuTitle {
  margin: 0 20px 0 20px;
  flex-direction: column;
}

.deploymentMobileMenuTitle,
.referentialMobileMenuTitle {
  height: 100%;
  background-color: white;
  text-align: center !important;
  flex-direction: column;
  margin: 0 20px 0 20px;
}

.linkMobileMenu {
  text-decoration: none;
  font-size: 13px !important;
  color: #000;
  font-weight: normal !important;
  line-height: 4 !important;
}

.deployementLink,
.refLink {
  display: flex;
  align-items: center;
}

.deployementLink2 {
  text-align: center;
  font-size: 14px;
  text-decoration: none;
  color: #000;
  font-weight: 500;
  line-height: 4 !important;
}

.logo_mobile {
  margin: auto auto;
  height: 45px;
  width: 60px;
}

/* next icon */
.iconify--ic {
  position: relative;
  left: 130px;
  bottom: -7px;
}

/* previous icon */
.iconify--ooui {
  position: relative;
  right: 3px;
  bottom: -2px;
  width: 16px !important;
  height: 16px !important;
}

.iconify--akar-icons {
  width: 16px !important;
  height: 16px !important;
  margin: 0 0 0 5px;
  bottom: 2px;
}
</style>
>
