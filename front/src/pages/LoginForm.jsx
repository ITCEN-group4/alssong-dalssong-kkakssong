import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import email from '../assets/email.svg';
import password from '../assets/password.svg';
import login from '../assets/login.svg';
import password_viewless from '../assets/password_viewless.svg';
import password_visible from '../assets/password_visible.svg';

export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    }

    const handlesignup = () => {
        navigate('/auth/signup');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!emailValue.trim() || !passwordValue.trim()) {
            setErrorMessage('아이디와 비밀번호를 입력해주세요.');

            setTimeout(() => {
                setErrorMessage('');
            }, 2000);

            return;
        }

        setErrorMessage('');
        console.log('로그인 시도:', emailValue, passwordValue);
    };

    return (
        <div>
            {errorMessage && (
                <div className={styles.errorMessage}>
                    {errorMessage}
                </div>
            )}

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
                                type="email"
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
                    <div className={styles.registerLink} onClick={handlesignup}>회원가입</div>
                </form>
            </div>
        </div>
            );
}
