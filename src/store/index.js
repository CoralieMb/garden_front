// import dependency to handle HTTP request to our back end
import axios from "axios";
import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

//to handle state
const state = {
  plateformes: [],
  nbplateformes: [],
  projects: [],
  exploitants: [],
  nbexploitants: [],
  territorialprojecttype: [],
  exploitantrole: [],
  projets: [],
  projetent: [],
  nbprojetent: [],
  projetrdmen: [],
  nbprojetrdmen: [],
  market: [],
  nbmarket: [],
};

//to get what is in the state
const getters = {
  // plateform
  plateformes: (state) => state.plateformes,
  nbplateformes: (state) => state.nbplateformes,
  // exploitant
  exploitants: (state) => state.exploitants,
  nbexploitants: (state) => state.nbexploitants,
  exploitantrole: (state) => state.exploitantrole,
  // project territorial type
  territorialprojecttype: (state) => state.territorialprojecttype,
  // projects
  //projets: (state) => state.projets,
  projetent: (state) => state.projetent,
  nbprojetent: (state) => state.nbprojetent,
  projetrdmen: (state) => state.projetrdmen,
  nbprojetrdmen: (state) => state.nbprojetrdmen,
  // market
  market: (state) => state.market,
  nbmarket: (state) => state.nbmarket,
};

//to handle actions
const actions = {
  // plateform
  async getPlateformes({ commit }) {
    const response = await axios.get("/plateformes");
    commit("SET_PLATEFORMES", response.data);
  },
  async getNbPlateformes({ commit }) {
    const response = await axios.get("/plateformes/nombre");
    commit("SET_NBPLATEFORMES", response.data);
  },
  // exploitant
  async getExploitants({ commit }) {
    const response = await axios.get("/exploitants");
    commit("SET_EXPLOITANTS", response.data);
  },
  async getNbExploitants({ commit }) {
    const response = await axios.get("/exploitants/nombre");
    commit("SET_NBEXPLOITANTS", response.data);
  },
  async getExploitantRole({ commit }) {
    const response = await axios.get("/exploitants/role");
    commit("SET_EXPLOITANTROLE", response.data);
  },
  // territorial project type
  async getTerritorialProjectType({ commit }) {
    const response = await axios.get("/types_projet_territoriaux");
    commit("SET_TERRITORIALPROJECTTYPE", response.data);
  },
  // projects
  // async getProjets({ commit }) {
  //   const response = await axios.get("/projets/");
  //   commit("SET_PROJETS", response.data);
  // },
  async getProjetEnt({ commit }) {
    const response = await axios.get("/projets/PROJET_ENT");
    commit("SET_PROJETENT", response.data);
  },
  async getNbProjetEnt({ commit }) {
    const response = await axios.get("/projets/PROJET_ENT/nombre");
    commit("SET_NBPROJETENT", response.data);
  },
  async getProjetRdmen({ commit }) {
    const response = await axios.get("/projets/RD_MEN");
    commit("SET_PROJETRDMEN", response.data);
  },
  async getNbProjetRdmen({ commit }) {
    const response = await axios.get("/projets/RD_MEN/nombre");
    commit("SET_NBPROJETRDMEN", response.data);
  },
  // market
  async getMarket({ commit }) {
    const response = await axios.get("/marche/");
    commit("SET_MARKET", response.data);
  },
  async getNbMarket({ commit }) {
    const response = await axios.get("/marche/nombre/");
    commit("SET_NBMARKET", response.data[0][0]);
  },
};

//to handle mutations
const mutations = {
  // plateform
  SET_PLATEFORMES(state, plateformes) {
    state.plateformes = plateformes;
  },
  SET_NBPLATEFORMES(state, nbplateformes) {
    state.nbplateformes = nbplateformes;
  },
  // exploitant
  SET_EXPLOITANTS(state, exploitants) {
    state.exploitants = exploitants;
  },
  SET_NBEXPLOITANTS(state, nbexploitants) {
    state.nbexploitants = nbexploitants;
  },
  SET_EXPLOITANTROLE(state, exploitantrole) {
    state.exploitantrole = exploitantrole;
  },
  // project territorial type
  SET_TERRITORIALPROJECTTYPE(state, territorialprojecttype) {
    state.territorialprojecttype = territorialprojecttype;
  },
  // projects
  // SET_PROJETS(state, projets) {
  //   state.projets = projets;
  // },
  SET_PROJETENT(state, projetent) {
    state.projetent = projetent;
  },
  SET_NBPROJETENT(state, nbprojetent) {
    state.nbprojetent = nbprojetent;
  },
  SET_PROJETRDMEN(state, projetrdmen) {
    state.projetrdmen = projetrdmen;
  },
  SET_NBPROJETRDMEN(state, nbprojetrdmen) {
    state.nbprojetrdmen = nbprojetrdmen;
  },
  // market
  SET_MARKET(state, market) {
    state.market = market;
  },
  SET_NBMARKET(state, nbmarket) {
    state.nbmarket = nbmarket;
  },
};

//export store module
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
