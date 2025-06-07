import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import CocktailSharePage from "./pages/CocktailSharePage";
// import CocktailDetailPage from "./pages/CocktailDetailPage";
// import CocktailWritePage from "./pages/CocktailWritePage.jsx";
import {CocktailProvider} from "./context/CocktailContext.jsx";
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import OfficialCocktailPage from "./pages/OfficialCocktailPage.jsx"

function App() {
    return (
        <BrowserRouter>
            <CocktailProvider>
                <Routes>
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/signup" element={<SignupPage/>} />
                    <Route path="/post" element={<CocktailSharePage/>}/>
                    {/*<Route path="/post/:id" element={<CocktailDetailPage/>}/>*/}
                    {/*<Route path="/post/userId" element={<CocktailWritePage/>}/>*/}
                    <Route path="/posts" element={<OfficialCocktailPage/>}/>
                </Routes>
            </CocktailProvider>
        </BrowserRouter>
    );
}

export default App
