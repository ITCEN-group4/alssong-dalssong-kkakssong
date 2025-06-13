import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import email from '../assets/email.svg';
import password from '../assets/password.svg';
import login from '../assets/login.svg';
import password_viewless from '../assets/password_viewless.svg';
import password_visible from '../assets/password_visible.svg';
import {loginUser} from "../api/userApi.js";

export default function LoginForm({setErrorMessage}) {

    const [showPassword, setShowPassword] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    }

    const handleSignup = () => {
        navigate('/auth/signup');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedEmail = emailValue.trim();
        const trimmedPassword = passwordValue.trim();

        if (!trimmedEmail && !trimmedPassword) {
            setErrorMessage('이메일와 비밀번호를 입력해주세요.');
            setTimeout(() => setErrorMessage(''), 2000);
            return;
        }

        if (!trimmedEmail) {
            setErrorMessage('이메일을 입력해주세요.');
            setTimeout(() => setErrorMessage(''), 2000);
            return;
        }

        if (!trimmedEmail.includes('@')) {
            setErrorMessage('올바른 이메일 형식을 입력해주세요.');
            setTimeout(() => setErrorMessage(''), 2000);
            return;
        }

        if (!trimmedPassword) {
            setErrorMessage('비밀번호를 입력해주세요.');
            setTimeout(() => setErrorMessage(''), 2000);
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]).{7,}$/;
        if (!passwordRegex.test(trimmedPassword)) {
            setErrorMessage('영문, 숫자 포함 7자 이상, 특수문자 1자 이상 입력해주세요.');
            setTimeout(() => setErrorMessage(''), 2000);
            return;
        }

        try {
            const response = await loginUser({
                email: trimmedEmail,
                password: trimmedPassword
            });

            const token = response.data.accessToken;
            localStorage.setItem("token", token);

            setErrorMessage(`${trimmedEmail}님 환영합니다.`);
            setTimeout(() => {
                setErrorMessage('');
                navigate('/posts');
            }, 1000);
        } catch (error) {
            console.error("로그인 실패", error);
            setErrorMessage('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.');
            setTimeout(() => setErrorMessage(''), 2000);
        }
    };

    return (
            <div className={styles.formWrapper}>
                <div className={styles.login_title_form}>
                    <img src={login} alt="login_img" className={styles.login_img}/>
                    <h2 className={styles.formTitle}>로그인</h2>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>
                        <span className={styles.input_label}>이메일</span>
                        <div className={styles.input_wrapper}>
                            <img src={email} alt="email_img" className={styles.leftIcon}/>
                            <input
                                type="text"
                                placeholder="이메일을 입력하세요"
                                className={styles.input}
                                value={emailValue}
                                onChange={(e) => setEmailValue(e.target.value)}
                            />
                        </div>
                    </label>
                    <label>
                        <span className={styles.input_label}>비밀번호</span>
                        <div className={styles.input_wrapper}>
                            <img src={password} alt="password_img" className={styles.leftIcon}/>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="비밀번호를 입력해주세요"
                                className={styles.input}
                                value={passwordValue}
                                onChange={(e) => setPasswordValue(e.target.value)}
                            />
                            <img
                                src={showPassword ? password_visible : password_viewless}
                                alt="password_viewless_img"
                                className={styles.rightIcon}
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                    </label>
                    <button type="submit" className={styles.loginButton}>로그인</button>
                    <div className={styles.registerLink} onClick={handleSignup}>회원가입</div>
                </form>
        </div>
            );
}
