import axios from "axios";
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
      config.headers.Authorization = `Bearer ${token}`;
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

    const { response: res } = error;
    if (res) {
      errData = res.data;
      if (
        errData.status_code === 401 &&
        errData.details.code === "token_not_valid"
      ) {
        const { logout } = useAuthStore();
        logout();
      }
    }
    return Promise.reject(errData);
  }
);

export default instance;