import { useState } from "react";
import styles from "./MyInfoPage.module.css";
import infoIcon from "../assets/InfoIcon.svg";
import lockIcon from "../assets/LockIcon.svg";
import profileIcon from "../assets/ProfileIcon.svg";

export default function MyInfoPage() {
    const [nickname, setNickname] = useState("");
    const currentNickname = "칵테일"; // ← 더미, 실제 데이터 연동 필요

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleNicknameChange = () => {
        // 닉네임 수정 함수
    };

    const handlePasswordChange = () => {
        // 비밀번호 수정 함수
    };

    const handleAccountDelete = () => {
        // 회원 탈퇴 함수
    };

    return (
        <div className={styles.infoContainer}>
            <h2 className={styles.title}>
                <img src={profileIcon} alt="닉네임 아이콘" className={styles.icon} />
                닉네임 변경
            </h2>
            <p className={styles.note}>
                <img src={infoIcon} alt="안내 아이콘" className={styles.iconSmall} />
                닉네임은 한 달에 1회만 변경할 수 있습니다.</p>
            <div className={styles.formGroup}>
                <input type="text" value={currentNickname} readOnly />
                <input
                    type="text"
                    placeholder="새 닉네임 입력"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
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