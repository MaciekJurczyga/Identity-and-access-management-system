import React, { useState } from 'react';
import axios from 'axios';

const SecuredPage = () => {
    const [responseData, setResponseData] = useState(null);

    const handleGetData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/user');
            setResponseData(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error.message);
        }
    };

    return (
        <div>
            <h1>Secured Page</h1>
            <p>This is a secured page accessible only to logged-in users.</p>
            
            <button onClick={handleGetData}>Pobierz dane z serwera</button>

            {responseData && (
                <div>
                    <h2>Otrzymane dane:</h2>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default SecuredPage;
