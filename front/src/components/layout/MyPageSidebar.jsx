import { useNavigate, useLocation } from "react-router-dom";
import styles from './MyPageSidebar.module.css';

export default function MyPageSidebar({ onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname;
    const isInfo = currentPath === "/mypage";
    const isPosts = currentPath === "/mypage/posts";

    return (
        <div className={styles.sidebar}>
            <div>
                <div className={styles.profileSection}>
                    <div className={styles.profileImg}></div>
                    <p className={styles.nickname}>닉네임</p>
                </div>

                <div className={styles.menu}>
                    <button
                        className={isInfo ? styles.active : ''}
                        onClick={() => navigate("/mypage")}
                    >
                        내 정보
                    </button>
                    <button
                        className={isPosts ? styles.active : ''}
                        onClick={() => navigate("/mypage/posts")}
                    >
                        내가 쓴 글
                    </button>
                </div>
            </div>

            <button className={styles.logoutButton} onClick={onLogout}>
                로그아웃
            </button>
        </div>
    );
}
