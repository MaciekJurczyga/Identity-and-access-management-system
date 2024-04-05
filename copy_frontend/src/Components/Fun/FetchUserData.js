import axios from 'axios';

const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            throw new Error('Brak tokenu uwierzytelniającego.');
        }

        const response = await axios.get('http://localhost:8080/api/v1/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            // Obsłuż błąd 403 tutaj, na przykład wyświetl komunikat użytkownikowi lub przekieruj go do strony logowania
            console.log('Token wygasł lub jest nieprawidłowy.');
            // Możesz również zwrócić pustą wartość lub inny odpowiedni wynik w zależności od potrzeb
        }
        // W przypadku innych błędów, nadal rzuć wyjątek
        throw new Error('Błąd podczas pobierania danych oooooo:', error.message);
    }
};

export default fetchUserData;
