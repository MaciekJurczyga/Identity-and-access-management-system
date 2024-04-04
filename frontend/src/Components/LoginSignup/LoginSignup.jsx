import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                console.log('Użytkownik został utworzony pomyślnie.');
            } else {
                console.error('Błąd podczas tworzenia użytkownika:', response.statusText);
            }
        } catch (error) {
            console.error('Błąd podczas wysyłania żądania:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('jwtToken', data.token);
                console.log('token: ' + data.token);
                console.log('token: ' + data.token);
                console.log('Użytkownik zalogowany pomyślnie.'); // Powiadomienie w konsoli

                const jwtToken = localStorage.getItem('jwtToken');
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                };


                const secureResponse = await fetch('http://localhost:8080/api/v1/user', {
                    method: 'GET',
                    headers: headers
                });

                if (secureResponse.ok) {
                    // Obsługa odpowiedzi zabezpieczonego żądania
                    console.log('Pomyślnie pobrano dane zabezpieczone.');
                } else {
                    // Obsługa błędu zabezpieczonego żądania
                    console.error('Błąd podczas pobierania danych zabezpieczonych:', secureResponse.statusText);
                }
            } else {
                console.error('Błąd podczas logowania:', response.statusText);
            }
        } catch (error) {
            console.error('Błąd podczas wysyłania żądania:', error);
        }
    };

    const handleSubmit = () => {
        if (action === "Login") {
            handleLogin();
        } else {
            handleSignUp();
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? null : (
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                )}

                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            {action === "Sign Up" ? null : (
                <div className="forgot-password">Lost Password?
                    <span> Click Here!</span>
                </div>
            )}

            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
            </div>

            {action === "Sign Up" || action === "Login" ? (
                <div className="submit-container">
                    <div className="submit" onClick={handleSubmit}>Submit</div>
                </div>
            ) : null}

        </div>
    );
};

export default LoginSignup;
