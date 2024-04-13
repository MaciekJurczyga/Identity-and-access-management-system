// authService.js

import axios from 'axios';
import validateLoginCredentials from './Login_Requirements.js';

const login = async (email, password) => {
    try {
        // Walidacja danych
        validateLoginCredentials(email, password);

        localStorage.removeItem('jwtToken')
        const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', { email, password });
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        console.log('Użytkownik zalogowany pomyślnie.');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return response.data;
    } catch (error) {
        if (error.response) {
            // Obsługa błędu odpowiedzi serwera (np. 404, 500)
            console.error('Błąd podczas logowania z serwera:', error.response.data);
        } else if (error.request) {
            // Obsługa braku odpowiedzi od serwera (np. brak połączenia)
            console.error('Brak odpowiedzi od serwera. Sprawdź połączenie internetowe.');
            alert('Brak odpowiedzi od serwera. Sprawdź połączenie internetowe.');
        } else {
            // Obsługa innych błędów
            console.error('Błąd podczas logowania:', error.message);
        }
        throw error;
    }
};

export default login;
