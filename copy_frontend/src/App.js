import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/Pages/StartingPanel/StartingPanel.jsx';
import SecuredPage from './Components/Pages/SecuredPage/SecuredPage.js';
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginSignup />} />
                <Route path="/api/v1/user" element={<SecuredPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

