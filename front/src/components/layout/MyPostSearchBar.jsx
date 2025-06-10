import React from "react";
import styles from "./MyPostSearchBar.module.css";
import searchIcon from "../../assets/search.svg";

export default function MyPostSearchBar({searchKeyword, setSearchKeyword, onSearch}) {
    return (
        <div className={styles.searchInputWrapper}>
            <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSearch();
                }}
                placeholder="검색"
                className={styles.searchInput}
            />
            <button onClick={onSearch} className={styles.searchButton}>
                <img src={searchIcon} alt="검색" className={styles.searchIcon}/>
            </button>
        </div>
    );
}
