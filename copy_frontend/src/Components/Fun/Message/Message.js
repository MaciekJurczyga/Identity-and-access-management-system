import axios from 'axios';

const sendMessageToUser = async (messageContent) => {

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            throw new Error('Brak tokenu uwierzytelniającego.');
        }

        const response = await axios.post('http://localhost:8080/api/v1/user/message', {
            content: messageContent
        }, {

        });

        return response.data;


};

export default sendMessageToUser;
