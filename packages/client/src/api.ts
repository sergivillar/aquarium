const API_URL = 'https://localhost:3000/';

const login = () => fetch(API_URL + 'login').then(res => res.json());

const api = {
    login,
};

export default api;
