import React, { useState } from 'react';
import './StartingPanel.css';
import user_icon from './../../Assets/person.png';
import email_icon from './../../Assets/email.png';
import password_icon from './../../Assets/password.png';
import show_password from './../../Assets/show.png'
import register from '../../Fun/Register/Register';
import  login  from '../../Fun/Login/Login';
import PasswordStrengthChecker from "../../Fun/Register/PasswordStrengthChecker";
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const navigator = useNavigate();
    const [action, setAction] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConf, setShowPasswordConf] = useState(false);
    const [passwordColor, setPasswordColor] = useState('#eaeaea');

    const handleSubmit = async () => {
        try {
            if (action === "Login") {
                await login(email, password);
                navigator('/api/v1/user');
            } else {
                await register(name, email, password, passwordConf);
                if(password === passwordConf){
                    setAction("Login");
                }

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
                <div className="input"  style={{ backgroundColor: action === "Sign Up" && password.length !== 0 ? passwordColor : '#eaeaea'}}>
                        <img
                            src={password_icon}
                            alt=""
                        />

                    <input type={showPassword ? "text" : "password"}
                           style={{opacity:1}}
                           placeholder="Password" value={password}
                           onChange={(e) => setPassword(e.target.value)} />
                    <div>
                        <button
                            className="showPass"
                            onMouseDown={() => setShowPassword(true)}
                            onMouseUp={() => setShowPassword(false)}
                            onClick={(e) => e.preventDefault()}>
                            <img
                                src={showPassword ? show_password : show_password}
                                alt={showPassword ? "Hide" : "Show"}
                                style={{ width: "24px", height: "24px" }}
                            />
                        </button>
                    </div>
                    {action === "Sign Up" && (
                        <PasswordStrengthChecker password={password} setPasswordColor={setPasswordColor} />
                    )}
                </div>
                {action === "Login" ? null : (
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type={showPasswordConf ? "text" : "password"}

                               placeholder="Confirm Password" value={passwordConf}
                               onChange={(e) => setPasswordConf(e.target.value)} />
                        <div>
                            <button
                                className="showPass"
                                onMouseDown={() => setShowPasswordConf(true)}
                                onMouseUp={() => setShowPasswordConf(false)}
                                onClick={(e) => e.preventDefault()}>
                                <img
                                    src={showPasswordConf ? show_password : show_password}
                                    alt={showPasswordConf ? "Hide" : "Show"}
                                    style={{ width: "24px", height: "24px" }}
                                />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {action === "Sign Up" ? null : (
                <div className="forgot-password">Lost Password?
                    <span>
                        <a href="https://mitologia.fandom.com/pl/wiki/Syzyf" target="_blank">
                              Click Here!
                        </a>
                    </span>
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
