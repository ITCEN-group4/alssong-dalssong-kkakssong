import React, { useState, useMemo } from "react";
import { useCocktailContext } from "../context/CocktailContext.jsx";
import { paginate } from "../utils/paginate.js";
import MyPostCardList from "../components/cards/MyPostCardList.jsx";
import Pagination from "../components/layout/Pagination.jsx";
import MyPostSearchBar from "../components/layout/MyPostSearchBar.jsx";
import MyPostSortBar from "../components/layout/MyPostSortBar.jsx";
import styles from "./MyPostViewPage.module.css";

export default function MyPostViewPage() {
    const { cocktailList } = useCocktailContext();
    const userId = "123"; // 테스트용 로그인된 유저 ID

    const [searchKeyword, setSearchKeyword] = useState("");
    const [sortOption, setSortOption] = useState("latest");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const myPosts = useMemo(() =>
            cocktailList.filter(c => c.userId === userId),
        [cocktailList]);

    const processedList = useMemo(() => {
        let result = [...myPosts];
        if (searchKeyword.trim()) {
            result = result.filter(c =>
                c.name.toLowerCase().includes(searchKeyword.toLowerCase())
            );
        }
        if (sortOption === "likes") result.sort((a, b) => b.likes - a.likes);
        else if (sortOption === "latest") result.sort((a, b) => b.id - a.id);
        return result;
    }, [myPosts, searchKeyword, sortOption]);

    const { pagedList, totalPages } = paginate(processedList, currentPage, pageSize);

    const handleSearch = () => setCurrentPage(1);

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.topSection}>
                <h2 className={styles.sectionTitle}>내가 작성한 글</h2>
                <div className={styles.searchSortBox}>
                    <MyPostSearchBar
                        searchKeyword={searchKeyword}
                        setSearchKeyword={setSearchKeyword}
                        onSearch={handleSearch}
                    />
                    <MyPostSortBar
                        sortOption={sortOption}
                        setSortOption={(option) => {
                            setSortOption(option);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            <div className={styles.cardListWrapper}>
                <MyPostCardList cocktailList={pagedList} />
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
