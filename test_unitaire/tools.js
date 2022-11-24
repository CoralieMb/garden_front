import axios from "axios";

export function initMockAxios() {
  axios.get.mockClear(); // function of Jest (JS unitary test framework) which clear the data
  axios.post.mockClear();
  axios.put.mockClear();
  axios.delete.mockClear();
  axios.get.mockImplementation((url) => {
    let dataGet = null;

    // Projet ENT
    if (url === "/projet/ent/nombre/") {
      dataGet = 123;
    }

    if (url === "/projet/ent/") {
      dataGet = [
        // we create mock values to simulate the get method (the headers are in Gestionexploitant.vue)
        {
          lib_projet_territorial_uai_long: "Projet ent 1",
          lib_projet_territorial_uai_court: "projet ent 1",
          Etat: 1,
          id_type_projet_territorial: 1,
        },
        {
          lib_projet_territorial_uai_long: "Projet ent 2",
          lib_projet_territorial_uai_court: "projet ent 2",
          Etat: 1,
          id_type_projet_territorial: 2,
        },
        {
          lib_projet_territorial_uai_long: "Projet ent 3",
          lib_projet_territorial_uai_court: "projet ent 3",
          Etat: 1,
          id_type_projet_territorial: 3,
        },
        {
          lib_projet_territorial_uai_long: "Projet ent 4",
          lib_projet_territorial_uai_court: "projet ent 4",
          Etat: 2,
          id_type_projet_territorial: 3,
        },
      ];
    }

    // Plateformes
    if (url === "/plateforme/nombre/") {
      dataGet = [[5]];
    }

    if (url === "/plateforme/") {
      dataGet = [
        {
          id_plateforme: 1,
          lib_type_projet_territorial: "rdmen",
          lib_plateforme_long: "pla 1",
          lib_plateforme_court: "pla 1",
          lib_exploitant_long: "exp 1",
          etat: 1,
        },
        {
          id_plateforme: 2,
          lib_type_projet_territorial: "projet_ent",
          lib_plateforme_long: "pla 2",
          lib_plateforme_court: "pla 2",
          lib_exploitant_long: "exp 2",
          etat: 2,
        },
        {
          id_plateforme: 3,
          lib_type_projet_territorial: "rdmen",
          lib_plateforme_long: "pla 3",
          lib_plateforme_court: "pla 3",
          lib_exploitant_long: "exp 3",
          etat: 1,
        },
        {
          id_plateforme: 4,
          lib_type_projet_territorial: "projet_ent",
          lib_plateforme_long: "pla 4",
          lib_plateforme_court: "pla 4",
          lib_exploitant_long: "exp 4",
          etat: 2,
        },
        {
          id_plateforme: 5,
          lib_type_projet_territorial: "rdmen",
          lib_plateforme_long: "pla 5",
          lib_plateforme_court: "pla 5",
          lib_exploitant_long: "exp 5",
          etat: 1,
        },
      ];
    }

    // Exploitants
    if (url === "/exploitant/") {
      dataGet = [
        {
          id_exploitant: 1,
          lib_exploitant_court: "Exp 1",
          lib_exploitant_long: "Exploitant 1",
          libelle_role: "editeur",
          etat: 1,
        },
        {
          id_exploitant: 2,
          lib_exploitant_court: "Exp 2",
          lib_exploitant_long: "Exploitant 2",
          libelle_role: "editeur",
          etat: 1,
        },
        {
          id_exploitant: 3,
          lib_exploitant_court: "Exp 3",
          lib_exploitant_long: "Exploitant 3",
          libelle_role: "exploitant",
          etat: 1,
        },
        {
          id_exploitant: 4,
          lib_exploitant_court: "Exp 4",
          lib_exploitant_long: "Exploitant 4",
          libelle_role: "exploitant",
          etat: 2,
        },
        {
          id_exploitant: 5,
          lib_exploitant_court: "Exp 5",
          lib_exploitant_long: "Exploitant 5",
          libelle_role: "editeur",
          etat: 1,
        },
      ];
    }

    if (url === "/exploitant/nombre/") {
      dataGet = [[5]];
    }
    if (dataGet !== null) {
      try {
        return Promise.resolve({
          status: 200,
          data: dataGet,
        });
      } catch {
        return Promise.reject({
          response: {
            status: 404,
            data: "URL '" + url + "' unknown !",
          },
        });
      }
    }

    if (url === "/exploitant/role/") {
      dataGet = [
        {
          role: 0,
          libelle_role: "exploitant",
        },
        {
          role: 1,
          libelle_role: "editeur",
        },
        {
          role: 2,
          libelle_role: "editeur_exploitant",
        },
      ];
    }
  });

  axios.post.mockImplementation((url) => {
    let dataPost = null;
    if (url === "/plateforme/") {
      dataPost = "OK";
    }
    if (url === "/exploitant/") {
      dataPost = "OK";
    }
    if (url === "/projet/") {
      dataPost = "OK";
    }

    if (dataPost !== null) {
      try {
        return Promise.resolve({
          status: 200,
          data: dataPost,
        });
      } catch {
        return Promise.reject({
          response: {
            status: 404,
            data: "URL '" + url + "' unknown !",
          },
        });
      }
    }
  });
  axios.put.mockImplementation((url) => {
    let dataPut = null;
    if (url === "/exploitant/3") {
      dataPut = "OK";
    }
    if (url === "/projet/1") {
      dataPut = "OK";
    }
    if (url === "/plateforme/2") {
      dataPut = "OK";
    }
    if (dataPut !== null) {
      try {
        return Promise.resolve({
          status: 200,
          data: dataPut,
        });
      } catch {
        return Promise.reject({
          response: {
            status: 404,
            data: "URL '" + url + "' unknown !",
          },
        });
      }
    }
  });
}
