import React from 'react';
import SignupForm from './SignupForm';
import styles from './signup.module.css';
import clouds from '../assets/cloud.svg';

export default function SignupPage() {
    return (
        <div className={styles.signupPage}>
            <SignupForm />
            <img src={clouds} alt="cloud" className={styles.cloudImg} />
        </div>
    );
}