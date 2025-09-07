// route imports
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // check for unauthorized status and redirect to sign in
    const res = error.response;
    if (res?.status === 401 && res.data?.redirectTo) {
      window.location.href = res.data.redirectTo;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
