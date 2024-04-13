// authService.js

import axios from 'axios';
import validateCredentials from './Register_Requirement.js';

const register = async (name, email, password) => {
    try {
        // Walidacja danych
        validateCredentials(email, password);
        localStorage.removeItem("jwtToken");
        // Wysłanie żądania rejestracji
        const response = await axios.post('http://localhost:8080/api/v1/auth/register', { name, email, password });
        console.log('Użytkownik został utworzony pomyślnie.');
        return response.data;
    } catch (error) {
        console.error('Błąd podczas tworzenia użytkownika:', error.message);
        throw error;
    }
};

export default register;
