import axios from 'axios';
import router from './router';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
    return config
  });

axiosClient.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('TOKEN')
      window.location.reload();
      // router.navigate('/login')
      return error;
    }
    if (error.response) {
      console.log(error.response);
    }
    throw error;
  })

export default axiosClient;