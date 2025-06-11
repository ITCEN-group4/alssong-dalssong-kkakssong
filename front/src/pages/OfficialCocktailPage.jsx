import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import OfficialFilterBar from "../components/layout/OfficialFilterBar.jsx";
import SortBar from "../components/layout/SortBar.jsx";
import OfficialCardList from "../components/cards/OfficialCardList.jsx";
import Pagination from "../components/layout/Pagination.jsx";
import { paginate } from "../utils/paginate.js";
import styles from './OfficialCocktailPage.module.css';
import SearchBar from "../components/layout/SearchBar.jsx";
import {useOfficialCocktailContext} from "../context/OfficialCocktailContext.jsx";
import NavBar from "../components/layout/NavBar.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function OfficialCocktailPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const shouldReset = query.get("reset") === "true";

    const { cocktailList, searchList, resetList } = useOfficialCocktailContext();
    const [sortOption, setSortOption] = useState("likes");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [resetSignal, setResetSignal] = useState(false);

    const pageSize = 8;   //한 페이지에 보여줄 카드 수

    useEffect(() => {
        if (shouldReset) {
            resetList();                    // cocktailList 초기화
            setSortOption("likes");         // 정렬 초기화
            setSearchKeyword("");           // 검색어 초기화
            setCurrentPage(1);              // 페이지 초기화
            setResetSignal(prev => !prev);  // 필터 리셋 트리거

            // 쿼리 파라미터 제거하여 URL 깔끔하게 유지
            window.history.replaceState(null, '', '/posts');
        }
    }, [shouldReset]);

    const sortedList = [...cocktailList].sort((a, b) => {
        if (sortOption === "likes") return b.likes - a.likes;
        if (sortOption === "latest") return b.id - a.id;
        return 0;
    });

    const usePagination = sortedList.length > pageSize;
    const { pagedList: currentList, totalPages } = paginate(sortedList, currentPage, pageSize);

    const handleSearch = () => {
        searchList(searchKeyword);
        setCurrentPage(1)
    };

    return (
        <>
            <NavBar/>
            <div className={styles.header}>
                <h2 className={styles.title}>칵테일 공식 레시피</h2>
                <h4 className={styles.subtitle}>
                    대중의 입맛을 사로 잡은 "칵테일 공식 레시피"<br/>
                    이제 여러분들도 마음껏 즐겨보세요 ~
                </h4>
            </div>

            <div className={styles.container}>
                <div className={styles.topSection}>
                    <SearchBar
                        searchKeyword={searchKeyword}
                        setSearchKeyword={setSearchKeyword}
                        onSearch={handleSearch}
                        resetSignal={resetSignal}
                    />
                    <SortBar
                        sortOption={sortOption}
                        setSortOption={(option) => {
                            setSortOption(option);
                            setCurrentPage(1); // 정렬 변경 시 첫 페이지로
                        }}
                    />
                    <OfficialFilterBar resetSignal={resetSignal}/>
                </div>
            </div>

            <div className={styles.bottomSection}>
                <OfficialCardList cocktailList={currentList} />
                {usePagination && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}
            </div>
            <Footer/>
        </>
    );
}
