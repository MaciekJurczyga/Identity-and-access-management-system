import React, { useState } from 'react';
import fetchUserData from './../../Fun/FetchUserData';
import './SecuredPage.css'; // Importowanie pliku CSS dla stylizacji

const SecuredPage = () => {
    const [responseData, setResponseData] = useState(null);
    const [showButton, setShowButton] = useState(true);

    const handleGetData = async () => {
        try {
            const data = await fetchUserData();
            setResponseData(data);
            setShowButton(false);
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error.message);
            if (error.message === 'Token wygasł. Proszę zalogować się ponownie.') {
                alert('Token wygasł. Proszę zalogować się ponownie.');
                // Tutaj możesz przekierować użytkownika do strony logowania
            }
        }
    };

    return (
        <div className="secured-page-container">
            <div className="centered-box">
                {showButton && (
                    <div>
                        <h2>Pobierz swój email</h2>
                        <button onClick={handleGetData}>Pobierz dane z serwera</button>
                    </div>
                )}

                {responseData && (
                    <div>
                        <h2>Otrzymane dane:</h2>
                        <pre>{JSON.stringify(responseData, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecuredPage;
