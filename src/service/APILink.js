import axios from "axios";

const APILink = axios.create({
    baseURL: 'http://localhost:4000/'
});

const token = localStorage.getItem('token');
APILink.interceptors.request.use(
    config => {
        if (token !== null && token !== undefined) {
            config.headers.Authorization = token; // Sửa đổi đây để không thêm "Bearer"
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default APILink;
