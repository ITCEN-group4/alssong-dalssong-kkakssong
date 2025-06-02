import React from 'react';
import LoginForm from './LoginForm.jsx';
import styles from './Login.module.css';
import logo from '../assets/cocktail_logo.svg';
import clouds from '../assets/cloud.svg';

export default function Login() {
    return (
        <div className={styles.loginPage}>
            <div className={styles.logoSection}>
                <img src={logo} alt="logo" className={styles.logoIcon} />
                <h1 className={styles.title}>알쏭달쏭칵쏭</h1>
            </div>
            <div className={styles.rightSection}>
                <LoginForm />
            </div>

            <img src={clouds} alt="cloud" className={styles.cloudImg}/>
        </div>
    );
}