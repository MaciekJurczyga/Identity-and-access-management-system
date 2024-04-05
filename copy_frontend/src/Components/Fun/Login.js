// authLogin.js
import axios from 'axios';

const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', { email, password });
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        const const_token = localStorage.getItem('jwtToken');
        console.log('Użytkownik zalogowany pomyślnie.');
        axios.defaults.headers.common['Authorization'] = `Bearer ${const_token}`;
        return response.data;
    } catch (error) {
        console.error('Błąd podczas logowania:', error.message);
        throw error;
    }
};

export default login;
