import axios from 'axios';

const sendMessageToUser = async (messageContent) => {
    try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            throw new Error('Brak tokenu uwierzytelniającego.');
        }

        const response = await axios.post('http://localhost:8080/api/v1/user/message', {
            content: messageContent
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        // Obsługa błędów tutaj
        throw new Error('Błąd podczas wysyłania wiadomości:', error.message);
    }
};

export default sendMessageToUser;
