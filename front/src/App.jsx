import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import CocktailSharePage from "./pages/CocktailSharePage";
import CocktailDetailPage from "./pages/CocktailDetailPage";
import CocktailWritePage from "./pages/CocktailWritePage.jsx";
import {CocktailProvider} from "./context/CocktailContext.jsx";

function App() {
    return (
        <BrowserRouter>
            <CocktailProvider>
                <Routes>
                    <Route path="/post" element={<CocktailSharePage/>}/>
                    <Route path="/post/:id" element={<CocktailDetailPage/>}/>
                    <Route path="/post/userId" element={<CocktailWritePage/>}/>
                </Routes>
            </CocktailProvider>
        </BrowserRouter>
    );
}

export default App;