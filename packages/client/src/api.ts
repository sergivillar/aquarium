const API_URL = 'http://localhost:3000/';

const login = (email: string, password: string) =>
    fetch(API_URL + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    }).then(res => res.json());

const api = {
    login: (email: string, password: string) => login(email, password),
};

export default api;
