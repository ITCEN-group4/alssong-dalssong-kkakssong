import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import {CocktailProvider} from "./context/CocktailContext.jsx";
import {OfficialCocktailProvider} from "./context/OfficialCocktailContext.jsx";
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
            <CocktailProvider>
                <OfficialCocktailProvider>
                <ScrollToTop />
                <Routes>
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/signup" element={<SignupPage/>} />
                    <Route path="/post" element={<CocktailSharePage/>}/>
                    <Route path="/post/:id" element={<CocktailDetailPage/>}/>
                    <Route path="/post/create" element={<CocktailWritePage mode="create" />} />
                    <Route path="/post/update/:id" element={<CocktailWritePage mode="edit" />} />
                    <Route path="/mypage" element={<MyPage />}>
                        <Route index element={<MyInfoPage />} />
                        <Route path="posts" element={<MyPostViewPage />} />
                    </Route>
                    <Route path="/posts" element={<OfficialCocktailPage/>}/>
                    <Route path="/posts/:id" element={<OfficialDetailPage/>}/>
                </Routes>
                </OfficialCocktailProvider>
            </CocktailProvider>
        </BrowserRouter>
    );
}

export default App
