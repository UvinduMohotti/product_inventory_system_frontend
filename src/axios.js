import axios from "axios";
import router from "./router";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace with your token retrieval logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      router.push("/403");
    }
    if (error.response.status === 401) {
      router.push("/login");
    }
    if (error.response && error.response.status === 403) {
        console.error('Forbidden error (403):', error);
        router.push("/403");
        // Handle the 403 error, e.g., redirect to a forbidden page
        // router.push('/forbidden');
      }
    return Promise.reject(error);
  }
);

export default instance;
