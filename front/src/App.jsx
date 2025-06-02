import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage.jsx';

function App() {
    return (
        <BrowserRouter>
            <CocktailProvider>
                <Routes>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/signup" element={<Signup />} />
                </Routes>
            </CocktailProvider>
        </BrowserRouter>
    );
}

export default App;