import React from 'react';
import styles from './Login.module.css';
import email from '../assets/email.svg';
import password from '../assets/password.svg';
import login from '../assets/login.svg';
import password_viewless from '../assets/password_viewless.svg';

export default function LoginForm() {
    return (
        <div className={styles.formWrapper}>
            <div className={styles.login_title_form}>
                <img src={login} alt="login_img" className={styles.login_img} />
                <h2 className={styles.formTitle}>로그인</h2>
            </div>
            <form className={styles.form}>
                <label>
                    <span className={styles.input_label}>이메일</span>
                    <div className={styles.input_wrapper}>
                        <img src={email} alt="email_img" className={styles.leftIcon} />
                        <input type="email" placeholder="이메일을 입력하세요" className={styles.input} />
                    </div>
                </label>
                <label>
                    <span className={styles.input_label}>비밀번호</span>
                    <div className={styles.input_wrapper}>
                        <img src={password} alt="password_img" className={styles.leftIcon} />
                        <input type="password" placeholder="비밀번호를 입력해주세요" className={styles.input} />
                        <img src={password_viewless} alt="password_viewless_img" className={styles.rightIcon} />
                    </div>
                </label>
                <button type="submit" className={styles.loginButton}>로그인</button>
                <div className={styles.registerLink}>회원가입</div>
            </form>
        </div>
    );
}
