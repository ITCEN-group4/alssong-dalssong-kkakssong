import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import logo from '../../assets/main_logo.svg'
import user_profile from '../../assets/user_profile.svg'

export default function NavBar() {
    const navigate = useNavigate();

    const handleCocktailPage = () => {
        navigate('/post');
    };

    const handleOfficialPage = () => {
        navigate('/post');
    };

    const handleMyPage = () => {
        navigate('/mypage');
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <img src={logo} alt="logo" className={styles.logo} onClick={handleCocktailPage}/>
                <div className={styles.menu}>
                    <span onClick={handleCocktailPage}>칵테일</span>
                    <span onClick={handleOfficialPage}>공식 레시피</span>
                </div>
            </div>
            <div className={styles.profile}>
                <img src={user_profile} alt="profile" className={styles.profile} onClick={handleMyPage}/>
                <div className={styles.username}>
                    <span onClick={handleMyPage}>사용자</span>
                </div>

            </div>
        </nav>
    );
}