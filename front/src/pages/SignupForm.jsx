import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './signup.module.css';
import login from '../assets/login.svg';
import logo from '../assets/cocktail_logo.svg';


export default function SignupForm() {

    const navigate = useNavigate();

    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCancel = () => {
        navigate('/auth/login');
    };

    const [successMessage, setSuccessMessage] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedNick = nickname.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const trimmedConfirm = confirmPassword.trim();

        if (!trimmedNick && !trimmedEmail && !trimmedPassword && !trimmedConfirm) {
            setErrorMessage('항목을 입력해주세요.');
            setTimeout(() => setErrorMessage(''), 2000);
            return;
        }

        // 닉네임 검사
        if (trimmedNick.length < 2) {
            setErrorMessage('닉네임은 두 글자 이상이어야 합니다.');
            setTimeout(() => setErrorMessage(''), 2000);
            return;
        }
        if (trimmedNick === "test") { // 중복 예시
            setErrorMessage('이미 사용 중인 닉네임입니다.');
            setTimeout(() => setErrorMessage(''), 2000);
            return;
        }

        // 이메일 검사
        if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
            setErrorMessage('올바른 이메일 형식을 입력해주세요.');
            setTimeout(() => setErrorMessage(''), 2000);
            return;
        }
        if (trimmedEmail === "test@test.com") {
            setErrorMessage('이미 등록된 이메일입니다.');
            setTimeout(() => setErrorMessage(''), 2000);
            return;
        }

        // 비밀번호 조건
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]).{7,}$/;
        if (!passwordRegex.test(trimmedPassword)) {
            setErrorMessage('비밀번호는 영문, 숫자 포함 7자 이상, 특수문자 1자 이상이어야 합니다.');
            setTimeout(() => setErrorMessage(''), 2000);
            return;
        }

        // 비밀번호 확인
        if (trimmedPassword !== trimmedConfirm) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            setTimeout(() => setErrorMessage(''), 2000);
            return;
        }

        // 모든 조건 통과
        setErrorMessage('');
        setErrorMessage('회원가입이 완료되었습니다!');
        setTimeout(() => {
            setSuccessMessage('');
            navigate('/auth/login');
        }, 1000);

    };

    return (
        <div className={styles.fullWrapper}>
            <div className={styles.titleWrapper}>
                <img src={logo} alt="logo" className={styles.logoIcon} />
                <h1 className={styles.title}>알쏭달쏭칵쏭</h1>
            </div>

            <div className={styles.formWrapper}>
                {errorMessage && (
                    <div className={styles.errorMessage}>{errorMessage}</div>
                )}
                <div className={styles.signup_title_form}>
                    <img src={login} alt="login_img" className={styles.login_img}/>
                    <h2 className={styles.formTitle}>회원가입</h2>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>
                        <span className={styles.input_label}>닉네임</span>
                        <div className={styles.input_wrapper}>
                            <input
                                type="text"
                                placeholder="닉네임을 입력하세요"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </div>
                    </label>

                    <label>
                        <span className={styles.input_label}>이메일</span>
                        <div className={styles.input_wrapper}>
                            <input
                                type="text"
                                placeholder="이메일을 입력하세요"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </label>

                    <label>
                        <span className={styles.input_label}>비밀번호</span>
                        <div className={styles.input_wrapper}>
                            <input
                                type='password'
                                placeholder="비밀번호를 입력해주세요"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </label>

                    <label>
                        <span className={styles.input_label}>비밀번호 확인</span>
                        <div className={styles.input_wrapper}>
                            <input
                                type="password"
                                placeholder="비밀번호를 다시 입력해주세요"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </label>

                    <button type="submit" className={styles.signupButton}>회원가입</button>
                    <div className={styles.cancelLink} onClick={handleCancel}>취소</div>
                </form>
            </div>
        </div>
    );
}