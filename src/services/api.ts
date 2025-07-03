import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5235/api', //URL de mon API
});

export default api;

