import axios from 'axios';


const fetchUserData = async () => {

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            throw new Error('Brak tokenu uwierzytelniającego.');
        }

        const response = await axios.get('http://localhost:8080/api/v1/user', {

        });

        return response.data;




};

export default fetchUserData;
