import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';
import logo from '../../assets/main_logo.svg';
import user_profile from '../../assets/user_profile.svg';
import { getMyInfo } from "../../api/userApi.js";

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentNickname, setCurrentNickname] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const res = await getMyInfo();
                setCurrentNickname(res.data.nickname);
                setIsLoggedIn(true);  // 로그인 상태로 변경
            } catch (error) {
                console.error("유저 정보 조회 실패:", error);
                setIsLoggedIn(false); // 실패 시 비로그인 상태 유지
            }
        };

        fetchMyInfo();
    }, []);

    const handleCocktailPage = () => {
        if (location.pathname === "/posts") {
            window.location.reload(); // 현재가 /면 새로고침
        } else {
            navigate('/posts'); // 다른 페이지면 그냥 이동
        }
    };

    const handleOfficialPage = () => {
        if (location.pathname === "/post") {
            window.location.reload(); // 현재가 /면 새로고침
        } else {
            navigate('/post')}
    };

    const handleMyPage = () => {
        if (location.pathname === "/mypage") {
            window.location.reload(); // 현재가 /면 새로고침
        } else {
            navigate('/mypage')}
    };

    const isUserRecipeActive = location.pathname === '/posts';
    const isOfficialRecipeActive = location.pathname === '/post';

    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <img src={logo} alt="logo" className={styles.logo} onClick={handleCocktailPage} />
                <div className={styles.menu}>
                    <span
                        className={`${styles.menuItem} ${isUserRecipeActive ? styles.activeMenu : ''}`}
                        onClick={handleCocktailPage}
                    >
                        유저 레시피
                    </span>
                    <span
                        className={`${styles.menuItem} ${isOfficialRecipeActive ? styles.activeMenu : ''}`}
                        onClick={handleOfficialPage}
                    >
                        공식 레시피
                    </span>
                </div>
            </div>
            <div className={styles.profile}>
                {isLoggedIn ? (
                    <>
                        <img src={user_profile} alt="profile" className={styles.user_profile} onClick={handleMyPage} />
                        <div className={styles.username}>
                            <span onClick={handleMyPage}>{currentNickname}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <button className={styles.authButton} onClick={() => navigate('/auth/login')}>로그인</button>
                        <button className={styles.authButton} onClick={() => navigate('/auth/signup')}>회원가입</button>
                    </>
                )}
            </div>
        </nav>
    );
}
