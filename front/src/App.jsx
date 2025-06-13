import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import ScrollToTop from "./utils/ScrollToTop.jsx";
import CocktailSharePage from "./pages/CocktailSharePage";
import CocktailDetailPage from "./pages/CocktailDetailPage";
import CocktailWritePage from "./pages/CocktailWritePage.jsx";
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import MyPage from "./pages/MyPage.jsx";
import MyInfoPage from "./pages/MyInfoPage.jsx";
import MyPostViewPage from "./pages/MyPostViewPage.jsx";
import OfficialCocktailPage from "./pages/OfficialCocktailPage.jsx";
import OfficialDetailPage from "./pages/OfficialCocktailDetailPage.jsx";

function App() {
    return (
        <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/signup" element={<SignupPage/>} />
                    <Route path="/posts" element={<CocktailSharePage/>}/>
                    <Route path="/post" element={<OfficialCocktailPage/>}/>
                    <Route path="/post/:id" element={<OfficialDetailPage/>}/>
                    <Route path="/posts/:id" element={<CocktailDetailPage/>}/>
                    <Route path="/posts/create" element={<CocktailWritePage mode="create" />} />
                    <Route path="/posts/update/:id" element={<CocktailWritePage mode="edit" />} />
                    <Route path="/mypage" element={<MyPage />}>
                        <Route index element={<MyInfoPage />} />
                        <Route path="posts" element={<MyPostViewPage />} />
                    </Route>
                </Routes>
        </BrowserRouter>
    );
}

export default App
