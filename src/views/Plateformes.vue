<template>
  <div>
    <v-container class="page">
      <h3 class="titre">Plateformes</h3>

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
        <span>Vous avez {{ gettersnbplateformes }} plateformes</span>.
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
            <Icon icon="carbon:add-alt" /> Ajouter une plateforme
          </v-btn>
        </v-card-title>

        <!-- Table -->
        <v-data-table
          :headers="headers"
          :items="gettersplateformes"
          :search="search"
          :header-props="headerProps"
          fixed-header
          sort-by="lib_type_projet_territorial, lib_plateforme_long, lib_plateforme_court, lib_exploitant_long, etat"
          class="elevation-1"
          disable-pagination
          hide-default-footer
        >
          <!-- hide/show inactive plateforms button -->
          <template slot="body.append">
            <v-btn
              class="inactive_btn"
              v-model="inactiveplateform"
              @click="
                (inactiveplateform = !inactiveplateform),
                  inactiveplateformfunc()
              "
              type="number"
              label="inactif"
              style="color: black"
              color="#f3f2f2"
              dark
              ><Icon icon="bx:show-alt" /> {{ inactiveplateformtext }}</v-btn
            >
          </template>

          <!-- State switch -->
          <template v-slot:[`item.etat`]="{ item }">
            <button v-if="item.etat == '1'">
              <Icon icon="twemoji:green-circle" />
            </button>
            <button v-else>
              <Icon icon="emojione-v1:red-circle" />
            </button>
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
        </v-data-table>

        <!-- Card for edit and add -->
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card class="card">
            <v-card-title class="text-h5 justify-center">{{
              dialog_title
            }}</v-card-title>

            <v-form ref="form" v-model="valid">
              <v-select
                :items="gettersterritorialprojecttype"
                item-value="id"
                item-text="libelle"
                return-object
                label="Type de projet"
                v-model="editedItem.type_projet_territorial"
                :rules="[(v) => !!v || 'Le type de projet est obligatoire']"
                required
              ></v-select>

              <v-text-field
                v-model="editedItem.libelle_long"
                label="Libellé long"
                :rules="[(v) => !!v || 'Le libellé long est obligatoire']"
                required
                clearable
              ></v-text-field>

              <v-text-field
                v-model="editedItem.libelle_court"
                label="Libellé court"
                :rules="[(v) => !!v || 'Le libellé court est obligatoire']"
                required
                clearable
              ></v-text-field>

              <v-select
                :items="gettersexploitants"
                item-value="id"
                item-text="libelle_long"
                return-object
                label="Editeur"
                v-model="editedItem.editeur"
                :rules="[(v) => !!v || 'L\'éditeur est obligatoire']"
                required
              ></v-select>

              <v-switch
                v-model="switch_state"
                color="success"
                label="Etat"
                hide-details
                required
              ></v-switch>

              <v-card-actions v-if="dialog_title == 'Modifier la plateforme'">
                <v-spacer></v-spacer>
                <v-btn
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
                @click="edit_plateforme()"
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

export default {
  name: "Plateformes",
  components: {
    Icon,
  },
  data() {
    return {
      valid: false,
      inactiveplateformtext: "Afficher les plateformes inactives",
      inactiveplateform: false,
      dialogEdit: false,
      dialogSuccess: false,
      dialogError: false,
      mobileDialogSuccess: false,
      mobileDialogError: false,
      dialogConfirmation: false,
      editedItem: {}, // the copy of the edited item
      liste_index: 0,
      dialog_title: "",
      dialog_confirmation: "",
      dialog_text: "",

      /* Headers of the v-data-table */
      search: "",
      headerProps: {
        sortByText: "Trier par",
      },
      headers: [
        {
          text: "Type de projet",
          value: "type_projet_territorial.libelle",
          class: "header_color",
        },
        {
          text: "Libellé long",
          value: "libelle_long",
          class: "header_color",
        },
        {
          text: "Libellé court",
          value: "libelle_court",
          class: "header_color",
        },
        {
          text: "Editeur",
          value: "editeur.libelle_long",
          class: "header_color",
        },
        {
          text: "Etat",
          value: "etat",
          // if we did not click on the button to show inactive plateforms, we only show active plateforms (etat == 1) in the table. Otherwise, we show all plateforms (etat = 0 and 1)
          filter: (value) => {
            if (!this.inactiveplateform) {
              return value == 1;
            }

            return value < 2;
          },
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

  /* computed methods are use to get the data. This data can be modify */
  computed: {
    gettersplateformes() {
      return this.$store.getters.plateformes; // Provide us the new state of datas
    },
    gettersnbplateformes() {
      return this.$store.getters.nbplateformes;
    },
    gettersexploitants() {
      return this.$store.getters.exploitants;
    },
    gettersterritorialprojecttype() {
      return this.$store.getters.territorialprojecttype;
    },
  },

  /* Edit/Add plateform*/
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async edit_plateforme() {
      if (this.switch_state == false) {
        this.editedItem.etat = "0";
      } else {
        this.editedItem.etat = "1";
      }
      //console.log(this.editedItem);

      if (this.editedItem.id !== undefined) {
        const path = "/plateformes/" + this.editedItem.id.toString();
        this.dialogEdit = false;
        try {
          const response = await axios.put(path, this.editedItem);
          console.log(response);
          this.$store.dispatch("getPlateformes"); // to reload the page and see the modifications
          this.liste_index++;
          this.dialog_text =
            "La plateforme" + this.editedItem.libelle_long + " a été modifiée.";
          this.dialogSuccess = true; // We open the dialog sucess
          /* for mobile */
          this.mobileDialogSuccess = true;
          this.dialog_text =
            "La plateforme" + this.editedItem.libelle_long + " a été modifiée.";
        } catch (err) {
          console.log(err);
          this.dialog_text =
            "La plateforme " +
            this.editedItem.libelle_long +
            " n'a pas été modifiée car il manque des données.";
          this.dialogError = true;
          /* for mobile */
          this.mobileDialogError = true;
        }
      } else {
        const path_add = "/plateformes";
        this.dialogEdit = false;
        try {
          const response = await axios.post(path_add, this.editedItem);
          console.log(response);

          this.$store.dispatch("getPlateformes");
          this.liste_index++;
          this.dialog_text =
            "La plateforme" + this.editedItem.libelle_long + " a été ajoutée.";
          if (response.statusText == "OK") {
            this.dialogSuccess = true;
            this.mobileDialogSuccess = true;
          } else {
            this.dialogError = true;
            this.mobileDialogError = true;
          }
        } catch (err) {
          console.log(err);
          this.dialog_text =
            "La plateforme " +
            this.editedItem.libelle_long +
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
      //console.log(this.editedItem);
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
      this.dialog_title = "Modifier la plateforme";
    },
    title_add() {
      this.dialog_title = "Nouvelle plateforme";
    },
    edit_dialog_confirmation() {
      this.dialog_confirmation =
        "Etes-vous sûr de vouloir modifier la plateforme ?";
    },
    add_dialog_confirmation() {
      this.dialog_confirmation =
        "Etes-vous sûr de vouloir ajouter la plateforme ?";
    },
    inactiveplateformfunc() {
      if (!this.inactiveplateform) {
        this.inactiveplateformtext = "Afficher les plateformes inactives";
      } else {
        this.inactiveplateformtext = "Cacher les plateformes inactives";
      }
    },

    isMobile() {
      if (screen.width <= 900) {
        return true;
      } else {
        return false;
      }
    },
    showInactiveItem() {
      if (this.inactiveplateforme == false) {
        return true;
      } else {
        return false;
      }
    },
  },
  /* created() methods will be executed after creating the component */

  /*  timeout for alert message on web - after the creation of the alert message, it will disappear 15s after*/
  created() {
    setTimeout(() => {
      this.dialogSuccess = false;
      this.dialogError = false;
    }, 15000);
  },

  /* mounted() methods will be executed before creating the component */

  /* We get the number of plateform */
  mounted() {
    // We do the API callS
    this.$store.dispatch("getPlateformes");
    this.$store.dispatch("getNbPlateformes");
    /* We get the list of exploitant for the v-select in edit and add */
    this.$store.dispatch("getExploitants");
    /* List of territorial project type for the v-select in edit and add */
    this.$store.dispatch("getTerritorialProjectType");
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
</style>
