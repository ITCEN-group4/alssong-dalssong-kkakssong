import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../components/layout/FilterBar.jsx";
import SortBar from "../components/layout/SortBar.jsx";
import CocktailCardList from "../components/cards/CocktailCardList.jsx";
import Pagination from "../components/layout/Pagination.jsx";
import { paginate } from "../utils/paginate.js";
import styles from './CocktailSharePage.module.css';
import SearchWriteBar from "../components/layout/SearchWriteBar.jsx";
import {useCocktailContext} from "../context/CocktailContext.jsx";
import NavBar from "../components/layout/NavBar.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function CocktailSharePage() {
    const {
        cocktailList,
        searchList,
        filterList,
        shouldUpdateList,
        setShouldUpdateList,
        triggerListUpdate
    } = useCocktailContext();

    const [sortOption, setSortOption] = useState("likes");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPageList, setCurrentPageList] = useState([]);
    const [resetSignal, setResetSignal] = useState(false);
    const [searchParams] = useSearchParams();
    const pageSize = 8;

    useEffect(() => {
        // 페이지가 처음 렌더링될 때 목록을 초기화 (뒤로가기도 포함)
        triggerListUpdate();
    }, []);

    useEffect(() => {
        if (searchParams.get("reset") === "true") {
            setResetSignal(true);
            setSearchKeyword("");
            setSortOption("likes");
            setCurrentPage(1);
            filterList({
                baseLiquors: [],
                ingredients: [],
                abv: null,
                shaking: null
            });
            triggerListUpdate();

            setTimeout(() => setResetSignal(false), 0);
        }
    }, [searchParams]);

    const sortedList = [...cocktailList].sort((a, b) => {
        if (sortOption === "likes") return b.likes - a.likes;
        if (sortOption === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
    });

    const usePagination = sortedList.length > pageSize;
    const { pagedList, totalPages } = paginate(sortedList, currentPage, pageSize);

    // 플래그가 true일 때만 currentPageList 업데이트
    useEffect(() => {
        if (shouldUpdateList) {
            setCurrentPageList(pagedList);
            setShouldUpdateList(false); // 업데이트 후 플래그 리셋
        }
    }, [pagedList, shouldUpdateList]);

    const handleSearch = () => {
        searchList(searchKeyword);
        setCurrentPage(1);
        triggerListUpdate(); // 검색 시 플래그 설정
    };

    const handleSortChange = (option) => {
        setSortOption(option);
        setCurrentPage(1);
        triggerListUpdate(); // 정렬 변경시 플래그 설정
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        triggerListUpdate(); // 페이지 변경시 플래그 설정
    };

    return (
        <>
            <NavBar/>
            <div className={styles.header}>
                <h2 className={styles.title}>칵테일 유저 레시피</h2>
                <h4 className={styles.subtitle}>
                    다른 사용자의 황금 레시피를 맛 볼 수 있는 공간 <br/>
                    함께 맛있는 칵테일 만들어봐요 ~
                </h4>
            </div>

            <div className={styles.container}>
                <div className={styles.topSection}>
                    <SearchWriteBar
                        searchKeyword={searchKeyword}
                        setSearchKeyword={setSearchKeyword}
                        onSearch={handleSearch}
                        resetSignal={resetSignal}
                    />
                    <SortBar
                        sortOption={sortOption}
                        setSortOption={handleSortChange}
                    />
                    <FilterBar resetSignal={resetSignal}/>
                </div>
            </div>

            <div className={styles.bottomSection}>
                <CocktailCardList cocktailList={currentPageList} />
                {usePagination && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
            <Footer/>
        </>
    );
}