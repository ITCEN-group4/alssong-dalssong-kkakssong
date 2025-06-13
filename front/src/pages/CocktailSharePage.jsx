import React, { useState, useEffect } from "react";
import FilterBar from "../components/layout/FilterBar.jsx";
import SortBar from "../components/layout/SortBar.jsx";
import CocktailCardList from "../components/cards/CocktailCardList.jsx";
import Pagination from "../components/layout/Pagination.jsx";
import styles from './CocktailSharePage.module.css';
import SearchWriteBar from "../components/layout/SearchWriteBar.jsx";
import NavBar from "../components/layout/NavBar.jsx";
import Footer from "../components/layout/Footer.jsx";
import { getUserPosts } from "../api/postApi";
import { mapApiToFrontData } from "../utils/MapApiToFrontData.js";

export default function CocktailSharePage() {
    const [cocktailList, setCocktailList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOption, setSortOption] = useState("likes");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filters, setFilters] = useState({
        ingredients: [],
        baseLiquors: [],
        abv: null,
        shaking: null
    });

    const fetchList = async () => {
        try {
            const backendSort = sortOption === "likes" ? "like" : "latest";
            const response = await getUserPosts({
                is_official: false,
                page: currentPage,
                sort: backendSort,
                query: searchKeyword,
                ingredients: filters.ingredients,
                base_liquors: filters.baseLiquors,
                is_shaken: filters.shaking,
            });

            let list = response.data.data.posts.map(mapApiToFrontData);

            // 도수 level(문자열) 기준으로 필터링
            if (filters.abv) {
                list = list.filter(item => item.level === filters.abv);
            }

            setCocktailList(list);
            setTotalPages(response.data.data.total_pages);
            console.log("적용된 filters:", filters);
        } catch (err) {
            console.error("게시글 조회 실패", err);
        }
    };

    useEffect(() => {
        fetchList();
    }, [currentPage, sortOption]);

    const handleSearch = () => {
        setCurrentPage(1);
        fetchList();
    };

    const handleSortChange = (option) => {
        setSortOption(option);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFilterApply = (appliedFilters) => {
        setFilters(appliedFilters);
        setCurrentPage(1);
        fetchList();
    };

    useEffect(() => {
        const handlePageShow = (event) => {
            if (event.persisted || performance.getEntriesByType("navigation")[0]?.type === "back_forward") {
                fetchList();
            }
        };

        window.addEventListener("pageshow", handlePageShow);
        return () => window.removeEventListener("pageshow", handlePageShow);
    }, []);

    return (
        <>
            <NavBar />
            <div className={styles.header}>
                <h2 className={styles.title}>칵테일 유저 레시피</h2>
                <h4 className={styles.subtitle}>
                    다른 사용자의 황금 레시피를 맛 볼 수 있는 공간<br />
                    함께 맛있는 칵테일 만들어봐요 ~
                </h4>
            </div>

            <div className={styles.container}>
                <div className={styles.topSection}>
                    <SearchWriteBar
                        searchKeyword={searchKeyword}
                        setSearchKeyword={setSearchKeyword}
                        onSearch={handleSearch}
                    />
                    <SortBar
                        sortOption={sortOption}
                        setSortOption={handleSortChange}
                    />
                    <FilterBar
                        filters={filters}
                        setFilters={setFilters}
                        onFilterApply={handleFilterApply}
                    />
                </div>
            </div>

            <div className={styles.bottomSection}>
                <CocktailCardList cocktailList={cocktailList} />
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
            <Footer />
        </>
    );
}