import axios from 'axios';

const sendMessageToUser = async (messageContent) => {

        const token = localStorage.getItem('jwtToken');

        if (!token) {
            throw new Error('Brak tokenu uwierzytelniającego.');
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.post('https://localhost:443/api/v1/user/message', {
            content: messageContent
        }, {

        });

        return response.data;


};

export default sendMessageToUser;
