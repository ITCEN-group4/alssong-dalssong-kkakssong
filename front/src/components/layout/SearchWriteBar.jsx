import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchWriteBar.module.css";

export default function SearchWriteBar({ searchKeyword, setSearchKeyword ,onSearch}) {
    const navigate = useNavigate();


    return (
        <div className={styles.barContainer}>
            <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter")
                        onSearch();
                }}
                placeholder="칵테일을 검색하세요..."
                className={styles.searchInput}
            />
            <button className={styles.writeButton} onClick={() => navigate("/write")}>
                + 글쓰기
            </button>
        </div>
    );
}
