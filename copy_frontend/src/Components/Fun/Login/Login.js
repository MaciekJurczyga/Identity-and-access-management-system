import axios from 'axios';
import validateLoginCredentials from './Login_Requirements.js';

let failedLoginAttempts = 0;
let lastFailedLoginTime = 0;
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_TIME = 30 * 1000; // 30 sekund w milisekundach

const login = async (email, password) => {
    try {
        // Sprawdzenie czy użytkownik nie jest zablokowany
        if (failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
            const currentTime = new Date().getTime();
            if (currentTime - lastFailedLoginTime < LOCKOUT_TIME) {
                throw new Error('Konto jest tymczasowo zablokowane. Spróbuj ponownie za chwilę.');
            } else {
                // Jeśli minął czas blokady, zresetuj licznik prób
                failedLoginAttempts = 0;
            }
        }

        // Walidacja danych
        validateLoginCredentials(email, password);

        localStorage.removeItem('jwtToken');
        const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', { email, password });
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        console.log('Użytkownik zalogowany pomyślnie.');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Zresetuj licznik prób po udanym logowaniu
        failedLoginAttempts = 0;

        return response.data;
    } catch (error) {
        failedLoginAttempts++;
        lastFailedLoginTime = new Date().getTime();

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

        // Wyświetl alert o czasowej blokadzie
        if (failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
            const timeLeft = Math.ceil((LOCKOUT_TIME - (new Date().getTime() - lastFailedLoginTime)) / 1000);
            alert(`Konto zostało zablokowane na ${timeLeft} sekund. Spróbuj ponownie później.`);
        }

        throw error;
    }
};

export default login;
