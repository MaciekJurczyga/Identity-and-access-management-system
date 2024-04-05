import axios from 'axios';

const register = async (name, email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/register', { name, email, password });
        console.log('Użytkownik został utworzony pomyślnie.');
        return response.data;
    } catch (error) {
        if (error.response) {
            // Obsługa błędu odpowiedzi serwera (np. 404, 500)
            console.error('Błąd podczas tworzenia użytkownika:', error.response.data);
        } else if (error.request) {
            // Obsługa braku odpowiedzi od serwera (np. brak połączenia)
            console.error('Brak odpowiedzi od serwera. Sprawdź połączenie internetowe.');
            alert('Brak odpowiedzi od serwera. Sprawdź połączenie internetowe.');
        } else {
            // Obsługa innych błędów
            console.error('Błąd podczas tworzenia użytkownika:', error.message);
        }
        throw error;
    }
};

export default register;
