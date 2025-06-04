import { useNavigate } from 'react-router-dom';
import styles from './signup.module.css';
import React from "react";
import login from '../assets/login.svg';
import logo from '../assets/cocktail_logo.svg';


export default function SignupForm() {

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/auth/login');
    };

    return (
        <div className={styles.fullWrapper}>
            <div className={styles.titleWrapper}>
                <img src={logo} alt="logo" className={styles.logoIcon} />
                <h1 className={styles.title}>알쏭달쏭칵쏭</h1>
            </div>

            <div className={styles.formWrapper}>
                <div className={styles.signup_title_form}>
                    <img src={login} alt="login_img" className={styles.login_img}/>
                    <h2 className={styles.formTitle}>회원가입</h2>
                </div>
                <form className={styles.form}>
                    <label>
                        <span className={styles.input_label}>닉네임</span>
                        <div className={styles.input_wrapper}>
                            <input type="text" placeholder="닉네임을 입력하세요" />
                        </div>
                    </label>

                    <label>
                        <span className={styles.input_label}>아이디</span>
                        <div className={styles.input_wrapper}>
                            <input type="email" placeholder="아이디를 입력하세요" />
                        </div>
                    </label>

                    <label>
                        <span className={styles.input_label}>비밀번호</span>
                        <div className={styles.input_wrapper}>
                            <input
                                type='password'
                                placeholder="비밀번호를 입력해주세요"
                            />
                        </div>
                    </label>

                    <label>
                        <span className={styles.input_label}>비밀번호 확인</span>
                        <div className={styles.input_wrapper}>
                            <input
                                type="password"
                                placeholder="비밀번호를 다시 입력해주세요"
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