import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchWriteBar.module.css";
import searchIcon from "../../assets/search.svg";

export default function SearchWriteBar({ searchKeyword, setSearchKeyword ,onSearch}) {
    const navigate = useNavigate();


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
        </div>
    );
}
