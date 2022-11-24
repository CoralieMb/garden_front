import Vue from "vue";
import "babel-polyfill";
import Vuetify from "vuetify";
import Vuex from 'vuex'
import {jest} from '@jest/globals'

const real_console = require("console");

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Vuex);

window.console.log = real_console.log;
window.console.error = real_console.error;
window.URL.createObjectURL = jest.fn();
