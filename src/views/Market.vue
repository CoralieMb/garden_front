<template>
  <div>
    <v-container class="page">
      <h3 class="titre">Gestion des marchés</h3>

      <!-- Success message for mobile -->

      <v-dialog
        v-if="isMobile()"
        v-model="mobileDialogSuccess"
        max-width="300px"
      >
        <v-card class="card">
          <v-card-text class="confirmation_title">
            {{ dialog_text }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="teal accent-3"
              class="white--text backtopage"
              @click.stop="mobileDialogSuccess = false"
              ><Icon icon="akar-icons:arrow-back-thick" /> Retour à la
              page</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Error message for mobile -->
      <v-dialog v-if="isMobile()" v-model="mobileDialogError" max-width="300px">
        <v-card class="card">
          <v-card-text class="confirmation_title">
            {{ dialog_text }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red lighten-1"
              class="white--text backtopage"
              @click.stop="mobileDialogError = false"
              ><Icon icon="akar-icons:arrow-back-thick" /> Retour à la
              page</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Success message for web -->
      <div class="alert">
        <v-alert
          v-if="!isMobile()"
          dense
          outlined
          text
          type="success"
          elevation="5"
          v-model="dialogSuccess"
        >
          {{ dialog_text }}

          <button class="close_button_success" @click="closeDialogSuccess()">
            <Icon icon="clarity:window-close-line" />
          </button>
        </v-alert>

        <!-- Error message for web -->
        <v-alert
          v-if="!isMobile()"
          dense
          outlined
          text
          type="error"
          elevation="5"
          v-model="dialogError"
        >
          {{ dialog_text }}

          <button class="close_button_error" @click="closeDialogError()">
            <Icon icon="clarity:window-close-line" />
          </button>
        </v-alert>
      </div>
      <div class="nbre">
        <span>Vous avez {{ gettersnbmarket }} marchés</span>.
      </div>

      <v-container class="tab">
        <v-card-title class="search_and_add">
          <!-- Search bar -->
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Recherche"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            style="margin: 18px 0 0 25px"
            color="primary"
            dark
            class="add_btn"
            @click="openDialogEdit({}), title_add()"
          >
            <Icon icon="carbon:add-alt" /> Ajouter un marché
          </v-btn>
        </v-card-title>

        <!-- Table -->
        <v-data-table
          :headers="headers"
          :items="gettersmarket"
          :search="search"
          :header-props="headerProps"
          fixed-header
          sort-by="lib_marche, lib_plateforme_long, date_debut_marche, date_fin_marche, lib_exploitant_long, lib_projet_territorial_uai_long"
          class="elevation-1"
          disable-pagination
          hide-default-footer
        >
          <!-- We formated the dates -->

          <template v-slot:[`item.date_fin_marche`]="{ item }">
            {{ formatDate(item.date_fin_marche) }}
          </template>

          <template v-slot:[`item.date_debut_marche`]="{ item }">
            {{ formatDate(item.date_debut_marche) }}
          </template>

          <!-- hide/show inactive plateforms button -->
          <template slot="body.append">
            <v-btn
              class="inactive_btn"
              v-model="inactivemarket"
              @click="(inactivemarket = !inactivemarket), inactivemarketfunc()"
              type="number"
              label="inactif"
              style="color: black"
              color="#f3f2f2"
              dark
              ><Icon icon="bx:show-alt" /> {{ inactivemarkettext }}</v-btn
            >
          </template>
          <!-- Edit icon -->
          <template v-slot:[`item.actions`]="{ item }">
            <button
              class="btn_edit"
              @click="openDialogEdit(item), title_edit()"
            >
              <Icon class="iconify edit" icon="ant-design:edit-filled" />
            </button>
          </template>

          <!-- "commentaire" is truncated -->
          <template v-slot:[`item.commentaire`]="{ item }">
            <span class="trunc_text" @click="full_text(item)">
              {{ item.commentaire }}</span
            >
            <!-- "commentaire" full text -->

            <v-dialog v-model="dialogFullText" max-width="500px">
              <v-card class="card">
                <v-card-title
                  style="
                    justify-content: center !important;
                    margin-bottom: 10px !important;
                  "
                  >Commentaire</v-card-title
                >
                <v-card-text class="confirmation_title">
                  {{ comment_item.commentaire }}
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    class="white--text"
                    @click.stop="dialogFullText = false"
                    >Fermer</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>

        <!-- Card for edit and add -->
        <v-dialog v-model="dialogEdit" max-width="600px">
          <v-card class="card">
            <v-card-title class="text-h5 justify-center">
              {{ dialog_title }}
            </v-card-title>

            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="editedItem.lib_marche"
                label="Libellé du marché"
                :rules="[(v) => !!v || 'Le libellé du marché est obligatoire']"
                required
                clearable
              ></v-text-field>

              <v-select
                :items="gettersprojets"
                item-value="id_projet_territorial_uai"
                item-text="lib_projet_territorial_uai_long"
                label="Projet territorial"
                v-model="editedItem.id_projet_territorial_uai"
                :rules="[(v) => !!v || 'Le projet territorial est obligatoire']"
                required
              ></v-select>

              <!-- Calendar for date fields -->

              <!--  start date -->
              <v-menu
                ref="menu_date_debut_marche"
                v-model="menu_date_debut_marche"
                :close-on-content-click="false"
                :return-value.sync="editedItem.date_debut_marche"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="editedItem.date_debut_marche"
                    label="Date de début"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="[
                      (v) =>
                        !!v || 'La date de début du marché est obligatoire',
                    ]"
                  ></v-text-field>
                </template>

                <v-date-picker
                  v-model="editedItem.date_debut_marche"
                  no-title
                  scrollable
                  locale="fr"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="menu_date_debut_marche = false"
                  >
                    Annuler
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.menu_date_debut_marche.save(
                        editedItem.date_debut_marche
                      ),
                        end_date_error()
                    "
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

              <!--  end date -->
              <v-menu
                ref="menu_date_fin_marche"
                v-model="menu_date_fin_marche"
                :close-on-content-click="false"
                :return-value.sync="editedItem.date_fin_marche"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="editedItem.date_fin_marche"
                    label="Date de fin"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>

                <!-- <v-date-picker
                  v-model="editedItem.date_fin_marche"
                  :allowed-dates="allowedDates"
                  no-title
                  scrollable
                  locale="fr"
                > -->
                <v-date-picker
                  v-model="editedItem.date_fin_marche"
                  no-title
                  scrollable
                  locale="fr"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="menu_date_fin_marche = false"
                  >
                    Annuler
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.menu_date_fin_marche.save(
                        editedItem.date_fin_marche
                      ),
                        end_date_error()
                    "
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

              <!-- error message if the max duration is exceed -->
              <div v-if="end_date_error_message == true" style="display: flex">
                <p style="font-size: 11px; color: #ff5252">
                  La date de fin ne peut pas dépasser la durée maximale du
                  marché.
                </p>
              </div>

              <!-- information about end date -->
              <div style="display: flex">
                <Icon icon="carbon:information-filled" />
                <p style="font-size: 11px">
                  Laisser vide si le marché n’est pas terminé.
                </p>
              </div>

              <v-text-field
                v-model="editedItem.duree_maximale"
                label="Durée maximale (mois)"
                @change="end_date_error()"
                :rules="[
                  (v) => !!v || 'La durée maximale est obligatoire',
                  (v) =>
                    Number.isInteger(Number(v)) ||
                    'Le nombre de mois doit être un entier positif',
                ]"
                required
                clearable
              ></v-text-field>

              <v-select
                :items="gettersexploitants"
                item-value="id_exploitant"
                item-text="lib_exploitant_long"
                label="Exploitant"
                v-model="editedItem.id_exploitant"
                :rules="[(v) => !!v || 'L\'exploitant est obligatoire']"
                required
              ></v-select>

              <v-select
                :items="gettersplateformes"
                item-value="id_plateforme"
                item-text="lib_plateforme_long"
                label="Plateforme"
                v-model="editedItem.id_plateforme"
                :rules="[(v) => !!v || 'La plateforme est obligatoire']"
                required
              ></v-select>

              <v-textarea
                v-model="editedItem.commentaire"
                label="Commentaire"
                clearable
                no-resize
                rows="3"
              ></v-textarea>

              <v-card-actions v-if="dialog_title == 'Modifier le marché'">
                <v-spacer></v-spacer>
                <v-btn
                  id="disable_save"
                  :disabled="!valid"
                  color="blue darken-1"
                  class="white--text"
                  @click="
                    openDialogEditConfirmation(),
                      edit_dialog_confirmation(),
                      validate()
                  "
                  @click.stop="dialogEdit = false"
                  >Enregistrer</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click.stop="dialogEdit = false"
                  >Annuler
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>

              <v-card-actions v-else>
                <v-spacer></v-spacer>

                <v-btn
                  id="disable_save"
                  :disabled="!valid"
                  color="blue darken-1"
                  class="white--text"
                  @click="
                    openDialogEditConfirmation(),
                      add_dialog_confirmation(),
                      validate()
                  "
                  @click.stop="dialogEdit = false"
                  >Enregistrer</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click.stop="dialogEdit = false"
                  >Annuler
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <!-- confirmation -->

        <v-dialog v-model="dialogConfirmation" max-width="300px">
          <v-card class="card">
            <v-card-text class="confirmation_title">
              {{ dialog_confirmation }}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                class="white--text"
                @click="edit_market()"
                @click.stop="dialogConfirmation = false"
                >Oui</v-btn
              >
              <v-btn
                v-if="
                  dialog_confirmation ==
                  'Etes-vous sûr de vouloir modifier la plateforme ?'
                "
                color="blue darken-1"
                text
                @click="openDialogEdit(item)"
                @click.stop="dialogConfirmation = false"
                >Non
              </v-btn>
              <v-btn
                v-else
                color="blue darken-1"
                text
                @click="openDialogEdit({})"
                @click.stop="dialogConfirmation = false"
                >Non
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { Icon } from "@iconify/vue2";
import moment from "moment";

export default {
  name: "Market",
  components: {
    Icon,
  },
  data() {
    return {
      valid: false,
      dialogEdit: false,
      inactivemarkettext: "Afficher les marchés terminés",
      inactivemarket: false,
      dialogSuccess: false,
      dialogError: false,
      dialogFullText: false,
      mobileDialogSuccess: false,
      mobileDialogError: false,
      dialogConfirmation: false,
      editedItem: {}, // the copy of the edited item
      comment_item: {},
      liste_index: 0,
      dialog_title: "",
      dialog_confirmation: "",
      dialog_text: "",
      menu_date_debut_marche: false,
      menu_date_fin_marche: false,
      end_date_error_message: false,

      /* Headers of the v-data-table */
      search: "",
      headerProps: {
        sortByText: "Trier par",
      },

      headers: [
        {
          text: "Libellé du marché",
          value: "lib_marche",
          class: "header_color",
        },
        {
          text: "Projet territorial",
          value: "lib_projet_territorial_uai_long",
          class: "header_color",
        },
        {
          text: "Date de début",
          value: "date_debut_marche",
          class: "header_color",
        },
        {
          text: "Date de fin",
          value: "date_fin_marche",
          filter: (value) => {
            // if we did not click on the button, we show only open markets (with date_fin_marche not null). Otherwise we show all markets.
            if (!this.inactivemarket) {
              const currentDate = new Date();
              // at the beggining, we only show market without end date or with an end date which is > at the current date (= market over)
              return (
                value == null ||
                value > moment(currentDate).format("YYYY-MM-DD")
              );
            }
            return true;
          },
          class: "header_color",
        },
        {
          text: "Durée maximale (mois)",
          value: "duree_maximale",
          class: "header_color",
        },
        {
          text: "Exploitant",
          value: "lib_exploitant_long",
          class: "header_color",
        },
        {
          text: "Plateforme",
          value: "lib_plateforme_long",
          class: "header_color",
        },
        {
          text: "Commentaire",
          value: "commentaire",
          class: "header_color",
        },
        {
          text: "Modifier",
          value: "actions",
          sortable: false,
          class: "header_color",
        },
      ],
      switch_state: true,
    };
  },

  /* computed() methods enable us to modify, manipulate a property */
  computed: {
    gettersmarket() {
      return this.$store.getters.market; // Provide us the new state of datas
    },
    gettersnbmarket() {
      return this.$store.getters.nbmarket;
    },
    gettersexploitants() {
      return this.$store.getters.exploitants;
    },
    gettersplateformes() {
      return this.$store.getters.plateformes;
    },
    gettersprojets() {
      return this.$store.getters.projets;
    },
  },

  /* Edit/Add plateform*/
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async edit_market() {
      if (this.editedItem.date_fin_marche == undefined)
        this.editedItem.date_fin_marche = null;
      if (this.editedItem.commentaire == undefined)
        this.editedItem.commentaire = null;

      if (this.editedItem.id_marche !== undefined) {
        const path =
          "/marche/" +
          this.editedItem.id_marche.toString() +
          "/" +
          this.editedItem.id_projet_territorial_uai.toString() +
          "/" +
          this.editedItem.id_exploitant.toString() +
          "/" +
          this.editedItem.id_plateforme.toString();
        this.dialogEdit = false;
        try {
          const response = await axios.put(path, this.editedItem);
          console.log(response);
          this.$store.dispatch("getMarket"); // to reload the page and see the modifications
          this.liste_index++;
          this.dialog_text = response.data;
          this.dialogSuccess = true; // We open the dialog sucess
          /* for mobile */
          this.mobileDialogSuccess = true;
          this.dialog_text = response.data;
        } catch (err) {
          console.log(err);
          this.dialog_text =
            "Le marché " +
            this.editedItem.lib_marche +
            " n'a pas pu être modifié.";
          this.dialogError = true;
          /* for mobile */
          this.mobileDialogError = true;
        }
      } else {
        const path_add = "/marche/";
        this.dialogEdit = false;
        try {
          const response = await axios.post(path_add, this.editedItem);
          console.log(response);

          this.$store.dispatch("getMarket");
          this.liste_index++;
          this.dialog_text = response.data;

          if (response.statusText == "true") {
            this.dialogSuccess = true;
            this.mobileDialogSuccess = true;
          } else {
            this.dialogError = true;
            this.mobileDialogError = true;
          }
        } catch (err) {
          console.log(err);
          this.dialog_text =
            "Le marché " +
            this.editedItem.lib_marche +
            " n'a pas pu être ajoutée.";
          this.dialogError = true;
          /* for mobile */
          this.mobileDialogError = true;
        }
      }
    },

    openDialogEdit(item) {
      this.dialogEdit = true; // we open the dialog
      this.editedItem = Object.assign({}, item); // We create a copy of the object item in order to edit it
      if (this.editedItem.date_debut_marche == null)
        this.editedItem.date_debut_marche = moment().format("YYYY-MM-01");
    },
    openDialogEditConfirmation() {
      this.dialogConfirmation = true;
    },

    closeEdit() {
      this.dialogEdit = false;
    },
    closeDialogSuccess() {
      this.dialogSuccess = false;
    },

    closeDialogError() {
      this.dialogError = false;
    },
    title_edit() {
      this.dialog_title = "Modifier le marché";
    },
    title_add() {
      this.dialog_title = "Nouveau marché";
    },
    edit_dialog_confirmation() {
      this.dialog_confirmation =
        "Etes-vous sûr de vouloir modifier le marché ?";
    },
    add_dialog_confirmation() {
      this.dialog_confirmation = "Etes-vous sûr de vouloir ajouter le marché ?";
    },
    inactivemarketfunc() {
      if (!this.inactivemarket) {
        this.inactivemarkettext = "Afficher les marchés terminés";
      } else {
        this.inactivemarkettext = "Cacher les marchés terminés";
      }
    },
    isMobile() {
      if (screen.width <= 900) {
        return true;
      } else {
        return false;
      }
    },

    full_text(item) {
      this.dialogFullText = true;
      this.comment_item = Object.assign({}, item);
    },
    // Format of dates
    formatDate(value) {
      if (value !== null) return moment(value).format("DD-MM-YYYY");
      else return value;
    },

    /* For the end date, we can only choose a date before the current date */
    //allowedDates: (val) => val <= new Date().toISOString().split("T")[0],

    // if the difference between start and end date is sup to max duration, we return true
    end_date_error() {
      if (this.editedItem.date_fin_marche !== null) {
        let end = this.editedItem.date_fin_marche;
        let end_month = end.split(/[--]/)[1];

        let start = this.editedItem.date_debut_marche;
        let start_month = start.split(/[--]/)[1];

        let difference = end_month - start_month;

        let max_duration = this.editedItem.duree_maximale;

        let disable_save = document.getElementById("disable_save");

        if (difference > max_duration) {
          disable_save.disabled = true;
          disable_save.style.backgroundColor =
            "rgba(0, 0, 0, 0.26)  !important";
          disable_save.style.color = "rgba(0, 0, 0, 0.12) !important";
          return (this.end_date_error_message = true);
        } else {
          disable_save.disabled = false;
          return (this.end_date_error_message = false);
        }
      }
    },
  },

  /* created() methods will be executed after creating the component */

  /*  timeout for alert message on web*/
  created() {
    setTimeout(() => {
      this.dialogSuccess = false;
      this.dialogError = false;
    }, 15000);
  },

  /* mounted() methods will be executed before creating the component */

  mounted() {
    // We do the API callS
    this.$store.dispatch("getMarket");
    this.$store.dispatch("getNbMarket");
    /* We get the list of exploitant for the v-select in edit and add */
    this.$store.dispatch("getExploitants");
    this.$store.dispatch("getPlateformes");
    this.$store.dispatch("getProjets");
  },
};
</script>

<style scoped>
.iconify {
  right: 3px;
  top: -1px;
  width: 18px;
  height: 18px;
}

#long_text {
  text-overflow: ellipsis !important;
}
</style>
