import axios from 'axios';


const fetchUserData = async () => {

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            throw new Error('Brak tokenu uwierzytelniającego.');
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('https://localhost:443/api/v1/user', {

        });

        return response.data;




};

export default fetchUserData;
