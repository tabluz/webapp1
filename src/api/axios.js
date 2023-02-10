import axios from "axios";
import { useResponse } from "../composables/useResponse";
import { useAuthStore } from "../stores/auth";

const api_url = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: api_url,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    let errData = {
      message: "No tienes conexion a Internet",
      status_code: "offline",
      success: false,
      details: null,
      data: null,
    };

    if (error.response) {
      errData = error.response.data;
      if ([401, 403].indexOf(error.response.status) !== -1) {
        useResponse().showAlert(errData);
      }
    }
    return Promise.reject(errData);
  }
);

export default instance;
