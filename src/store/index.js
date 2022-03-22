import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services.js";
import { concat } from "@/helpers.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    configs: null,
    modules: null,
    depositions: null,
    faqs: null,
    subscriptions: null,
  },
  mutations: {
    UPDATE_CONFIGS(state, payload) {
      state.configs = payload;
    },
    MANAGEMENT_SET(state, { payload, key }) {
      state[key] = payload;
    },
    MANAGEMENT_UPDATE(state, { payload, key }) {
      const index = state[key].findIndex((obj) => obj._id === payload._id);
      if (index >= 0) {
        state[key][index] = concat(state[key][index], payload);
      } else state[key].push(payload);
    },
  },
  actions: {
    localGet(context, { route }) {
      return api.get(`/${route.toLowerCase()}`).then((r) => {
        context.commit(`MANAGEMENT_SET`, {
          payload: r.data,
          key: route.toLowerCase(),
        });
      });
    },

    // Management Actions
    managementGet(context, { route }) {
      return api.get(`/management/${route.toLowerCase()}`).then((r) => {
        context.commit(`MANAGEMENT_SET`, {
          payload: r.data,
          key: route.toLowerCase(),
        });
      });
    },
    managementUpdate(context, { payload, route }) {
      return api
        .put(`/management/${route.toLowerCase()}`, payload)
        .then((r) => {
          context.commit(`MANAGEMENT_SET`, {
            payload: r.data,
            key: route.toLowerCase(),
          });
        });
    },
    managementUpdateOne(context, { payload, route }) {
      return api
        .put(`/management/${route.toLowerCase()}s`, payload)
        .then((r) => {
          context.commit(`MANAGEMENT_UPDATE`, {
            payload: r.data,
            key: `${route.toLowerCase()}s`,
          });
        });
    },
  },
});
