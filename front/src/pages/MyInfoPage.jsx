import {useEffect, useState} from "react";
import styles from "./MyInfoPage.module.css";
import infoIcon from "../assets/InfoIcon.svg";
import lockIcon from "../assets/LockIcon.svg";
import profileIcon from "../assets/ProfileIcon.svg";
import {useNavigate} from "react-router-dom";
import {deleteUser, getMyInfo, updateNickname, updatePassword} from "../api/userApi.js";

export default function MyInfoPage() {
    const [pastNickname, setPastNickname] = useState("");
    const [currentNickname, setCurrentNickname] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const res = await getMyInfo();
                setPastNickname(res.data.nickname);
            } catch (error) {
                console.error("유저 정보 조회 실패:", error);
            }
        };

        fetchMyInfo();
    }, []);

    const handleNicknameChange = async () => {
        try {
            await updateNickname(currentNickname);
            alert("닉네임이 변경되었습니다.");
            setCurrentNickname(""); // 입력 초기화
        } catch (error) {
            alert("닉네임 변경 실패: " + (error.response?.data?.message || error.message));
        }
    };

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }
        try {
            await updatePassword(currentPassword, newPassword);
            alert("비밀번호가 변경되었습니다.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            alert("비밀번호 변경 실패: " + (error.response?.data?.message || error.message));
        }
    };

    const handleAccountDelete = () => {
        // 회원 탈퇴 함수
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (window.confirm("정말로 회원 탈퇴하시겠습니까?")) {
            try {
                await deleteUser();
                alert("회원 탈퇴가 완료되었습니다.");
                localStorage.removeItem("token");
            } catch (error) {
                alert("회원 탈퇴 실패: " + (error.response?.data?.message || error.message));
            }
        }
        navigate("/auth/login");
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    return (
        <div className={styles.infoContainer}>
            {showDeleteConfirm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.confirmBox}>
                        <p>정말 탈퇴하시겠어요? 다시 되돌릴 수 없어요.</p>
                        <div className={styles.buttonGroup}>
                            <button className={styles.confirmButton} onClick={confirmDelete}>예</button>
                            <button className={styles.cancelButton} onClick={cancelDelete}>아니오</button>
                        </div>
                    </div>
                </div>
            )}
            <h2 className={styles.title}>
                <img src={profileIcon} alt="닉네임 아이콘" className={styles.icon} />
                닉네임 변경
            </h2>
            <p className={styles.note}>
                <img src={infoIcon} alt="안내 아이콘" className={styles.iconSmall} />
                닉네임은 한 달에 1회만 변경할 수 있습니다.</p>
            <div className={styles.formGroup}>
                <input type="text" value={pastNickname} readOnly />
                <input
                    type="text"
                    placeholder="새 닉네임 입력"
                    value={currentNickname}
                    onChange={(e) => setCurrentNickname(e.target.value)}
                />
                <button onClick={handleNicknameChange}>저장</button>
            </div>

            <h2 className={styles.title}>
                <img src={lockIcon} alt="비밀번호 아이콘" className={styles.icon} />
                비밀번호 변경</h2>
            <p className={styles.note}>
                <img src={infoIcon} alt="안내 아이콘" className={styles.iconSmall} />
                영문, 숫자 포함 7자 이상, 특수문자 1자 이상이어야 합니다.</p>
            <div className={styles.formGroup}>
                <input
                    type="password"
                    placeholder="현재 비밀번호"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="새 비밀번호"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="새 비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handlePasswordChange}>저장</button>
            </div>

            <div className={styles.withdrawWrapper}>
                <button className={styles.deleteButton} onClick={handleAccountDelete}>
                    회원 탈퇴
                </button>
            </div>
        </div>
    );
}