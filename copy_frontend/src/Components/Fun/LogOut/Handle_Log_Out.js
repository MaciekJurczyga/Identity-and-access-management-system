import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import logoutImage from './../../Assets/log_out_icon.png'

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            navigate("/");
            localStorage.removeItem("jwtToken");
            axios.defaults.headers.common['Authorization'] = null;

        } catch (error) {
            console.log("Error occurred while logging out:", error);
        }
    }

    return (
        <img className="logoutButton" src={logoutImage} alt="Logout" onClick={handleLogOut} style={{ cursor: 'pointer' }} />
    );
}

export default LogoutButton;


