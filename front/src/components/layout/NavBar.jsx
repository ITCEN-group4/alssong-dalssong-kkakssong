import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';
import logo from '../../assets/main_logo.svg'
import user_profile from '../../assets/user_profile.svg'
import {useOfficialCocktailContext} from "../../context/OfficialCocktailContext.jsx";

export default function NavBar() {
    const navigate = useNavigate();
    const { resetList } = useOfficialCocktailContext();
    const location = useLocation();

    const handleCocktailPage = () => {
        resetList();
        navigate('/post?reset=true');
    };

    const handleOfficialPage = () => {
        resetList();
        navigate('/posts?reset=true');
    };

    const handleMyPage = () => {
        navigate('/mypage');
    };

    const isUserRecipeActive = location.pathname === '/post';
    const isOfficialRecipeActive = location.pathname === '/posts';

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
                <img src={user_profile} alt="profile" className={styles.user_profile} onClick={handleMyPage}/>
                <div className={styles.username}>
                    <span onClick={handleMyPage}>사용자</span>
                </div>
            </div>
        </nav>
    );
}