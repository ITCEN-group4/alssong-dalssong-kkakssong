import { useNavigate, useLocation } from "react-router-dom";
import styles from './MyPageSidebar.module.css';
import {useEffect, useState} from "react";
import {getMyInfo} from "../../api/userApi.js";

export default function MyPageSidebar({ onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [currentNickname, setCurrentNickname] = useState("");

    const currentPath = location.pathname;
    const isInfo = currentPath === "/mypage";
    const isPosts = currentPath === "/mypage/posts";

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        setShowLogoutModal(false);
        onLogout(); // 실제 로그아웃 로직
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const res = await getMyInfo();
                setCurrentNickname(res.data.nickname);
            } catch (error) {
                console.error("유저 정보 조회 실패:", error);
            }
        };

        fetchMyInfo();
    }, []);

    return (
        <div className={styles.sidebar}>
            <div>
                <div className={styles.profileSection}>
                    <div className={styles.profileImg}></div>
                    <p className={styles.nickname}>{currentNickname}</p>
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

            <button className={styles.logoutButton} onClick={handleLogoutClick }>
                로그아웃
            </button>

            {showLogoutModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <p className={styles.modalText}>한 잔 더 하고 가실래요? 아니면 로그아웃?</p>
                        <div className={styles.modalButtonGroup}>
                            <button className={styles.modalYes} onClick={cancelLogout}>한 잔 더</button>
                            <button className={styles.modalNo} onClick={confirmLogout}>로그아웃</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
