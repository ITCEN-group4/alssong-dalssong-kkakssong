import React, { useState, useEffect } from "react";
import { getMyPosts } from "../api/postApi.js";
import MyPostCardList from "../components/cards/MyPostCardList.jsx";
import Pagination from "../components/layout/Pagination.jsx";
import MyPostSearchBar from "../components/layout/MyPostSearchBar.jsx";
import MyPostSortBar from "../components/layout/MyPostSortBar.jsx";
import styles from "./MyPostViewPage.module.css";

export default function MyPostViewPage() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [sortOption, setSortOption] = useState("like");
    const [inputValue, setInputValue] = useState("");
    const [query, setQuery] = useState("");
    const [totalPages, setTotalPages] = useState(8);
    const [searchTrigger, setSearchTrigger] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const res = await getMyPosts({
                    page,
                    sort: sortOption,
                    query,
                });
                const responseData = res.data.data;

                setPosts(responseData.posts);
                setTotalPages(responseData.total_pages);
            } catch (e) {
                console.error("❌ 마이페이지 게시글 불러오기 실패", e);
            }
        })();
    }, [page, sortOption, query, searchTrigger]);

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.topSection}>
                <h2 className={styles.sectionTitle}>내가 작성한 글</h2>
                <div className={styles.searchSortBox}>
                    <MyPostSearchBar
                        searchKeyword={inputValue}
                        setSearchKeyword={setInputValue}
                        onSearch={() => {
                            setQuery(inputValue.trim());
                            setPage(1);
                            setSearchTrigger(prev => prev + 1);
                        }}
                    />
                    <MyPostSortBar
                        sortOption={sortOption}
                        setSortOption={(option) => {
                            setSortOption(option);
                            setPage(1);
                        }}
                    />
                </div>
            </div>

            <div className={styles.cardListWrapper}>
                <MyPostCardList cocktailList={posts} />
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
}
