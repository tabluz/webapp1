import { defineStore } from "pinia";
import cache from "../utils/cache";
import { sigin } from "../api";
import { useResponse } from "../composables/useResponse";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: cache.getItem("user"),
    msg: {},
    returnUrl: "",
  }),
  getters: {
    getEsential(state) {
      return {
        id: state.user.dni,
        username: `${state.user.name}`,
        type: state.user.type,
        is_admin: state.user.type === "admin",
        image: "/assets/media/images/user.png",
      };
    },
    token(state) {
      if (state.user) {
        return state.user.token;
      }
    },
  },
  actions: {
    async login(payload) {
      try {
        const { data } = await sigin(payload);
        cache.setItem("user", data);
        this.user = data;
        this.router.push({ name: "home" });
      } catch (error) {
        this.msg = useResponse().showAlert(error);
      }
    },
    async logout() {
      this.user = null;
      cache.cleanAll();
      this.router.push({ name: "login" });
    },
  },
});
