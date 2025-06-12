import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchWriteBar.module.css";
import searchIcon from "../../assets/search.svg";

export default function SearchWriteBar({ searchKeyword, setSearchKeyword ,onSearch, resetSignal}) {
    const navigate = useNavigate();


    useEffect(() => {
        if (resetSignal) {
            setSearchKeyword("");  // 검색창 초기화
        }
    }, [resetSignal]);

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
            <button className={styles.writeButton} onClick={() => navigate("/post/create")}>
                + 게시글 작성
            </button>
        </div>
    );
}
