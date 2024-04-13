// LoginSignup.js
import React, { useState } from 'react';
import './StartingPanel.css';
import user_icon from './../../Assets/person.png';
import email_icon from './../../Assets/person.png';
import password_icon from './../../Assets/person.png';
import register from '../../Fun/Register/Register';
import  login  from '../../Fun/Login/Login';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const navigator = useNavigate();
    const [action, setAction] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            if (action === "Login") {
                await login(email, password);
                navigator('/api/v1/user');
            } else {
                await register(name, email, password);
                setAction("Login");
            }
        } catch (error) {
            console.error('Błąd:', error.message);
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
