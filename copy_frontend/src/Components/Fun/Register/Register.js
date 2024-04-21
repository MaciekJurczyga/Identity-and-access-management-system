// authService.js

import axios from 'axios';
import validateCredentials from './Register_Requirement.js';

const register = async (name, email, password, passwordConf) => {
    try {
        if(passwordConf !== password){
            alert("Podane hasła nie są takie same");
            return null;
        }
        validateCredentials(email, password);
        localStorage.removeItem("jwtToken");
        // Wysłanie żądania rejestracji
        const response = await axios.post('https://localhost:443/api/v1/auth/register', { name, email, password });
        alert("Konto stworzone pomyślnie")
        console.log('Użytkownik został utworzony pomyślnie.');
        return response.data;
    } catch (error) {

        console.error('Błąd podczas tworzenia użytkownika:', error.message);
        throw error;
    }
};

export default register;
