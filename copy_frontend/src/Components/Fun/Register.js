// authService.js
import axios from 'axios';

const register = async (name, email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/register', { name, email, password });
        console.log('Użytkownik został utworzony pomyślnie.');
        return response.data;
    } catch (error) {
        console.error('Błąd podczas tworzenia użytkownika:', error.message);
        throw error;
    }
};

export default register;
