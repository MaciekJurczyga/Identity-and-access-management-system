import axios from 'axios';
import validateLoginCredentials from './Login_Requirements.js';



const login = async (email, password) => {
    try {

        validateLoginCredentials(email, password);

        localStorage.removeItem('jwtToken');
        const response = await axios.post('https://localhost:443/api/v1/auth/authenticate', { email, password });
        const { token, accountLocked } = response.data;
        if(accountLocked === true){
            alert("3 nieudane próby logowania. Konto zablokowane na 30 sekund.");
            throw new Error("3 nieudane próby logowania. Konto zablokowane na 30 sekund.");
        }
        else{
            localStorage.setItem('jwtToken', token);
            console.log('Użytkownik zalogowany pomyślnie.');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return response.data;
        }


    }
    catch (error) {

        if (error.response && error.response.status === 401 && error.response.data) {
            // Obsługa błędu odpowiedzi serwera (np. 404, 500)
            alert(error.response.data);
        }
        else if(error.response && error.response.status === 403){
            alert("Niepoprawne dane logowania fajne");
        }
        else if (error.request) {
            // Obsługa braku odpowiedzi od serwera (np. brak połączenia)
            console.error('Brak odpowiedzi od serwera. Sprawdź połączenie internetowe.');
            alert('Brak odpowiedzi od serwera. Sprawdź połączenie internetowe.');
        }

        else {
            // Obsługa innych błędów
            console.error('Błąd podczas logowania:', error.message);
        }

        throw error;
}
};

export default login;
