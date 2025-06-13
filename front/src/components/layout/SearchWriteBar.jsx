import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchWriteBar.module.css";
import searchIcon from "../../assets/search.svg";
import {getMyInfo} from "../../api/userApi.js";

export default function SearchWriteBar({ searchKeyword, setSearchKeyword ,onSearch, resetSignal}) {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                await getMyInfo();
                setIsLoggedIn(true);  // 로그인 상태로 변경
            } catch (error) {
                console.error("유저 정보 조회 실패:", error);
                setIsLoggedIn(false); // 실패 시 비로그인 상태 유지
            }
        };
        fetchMyInfo();
    }, []);

    useEffect(() => {
        if (resetSignal) {
            setSearchKeyword("");  // 검색창 초기화
        }
    }, [resetSignal]);

    const handleWriteClick = () => {
        if (isLoggedIn === false) {
            alert("로그인이 필요합니다.");
            return;
        }
        navigate("/posts/create");
    }

    return (
        <div className={styles.barContainer}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") onSearch();
                    }}
                    placeholder="칵테일을 검색하세요..."
                    className={styles.searchInput}
                />
                <button
                    type="button"
                    onClick={onSearch}
                    className={styles.searchButton}
                >
                    <img src={searchIcon} alt="search" className={styles.searchIcon}/>
                </button>
            </div>
            <button className={styles.writeButton} onClick={handleWriteClick}>
                + 게시글 작성
            </button>
        </div>
    );
}
