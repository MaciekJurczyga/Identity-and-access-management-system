import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartingPanel from './Components/StartingPanel/LoginSignup.jsx';
import SecuredPage from './Components/Pages/securedPage.js';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartingPanel />} />
                <Route path="/api/v1/user" element={<SecuredPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

