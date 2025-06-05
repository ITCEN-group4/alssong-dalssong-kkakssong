import React, {useState, useEffect} from "react";
import FilterBar from "../components/layout/FilterBar.jsx";
import SortBar from "../components/layout/SortBar.jsx";
import CocktailCardList from "../components/cards/CocktailCardList.jsx";
import Pagination from "../components/layout/Pagination.jsx";
import { paginate } from "../utils/paginate.js";
import styles from './CocktailSharePage.module.css';
import SearchWriteBar from "../components/layout/SearchWriteBar.jsx";
import {useCocktailContext} from "../context/CocktailContext.jsx";

export default function CocktailSharePage() {
    const { cocktailList, searchList, shouldUpdateList, setShouldUpdateList, triggerListUpdate } = useCocktailContext();
    const [sortOption, setSortOption] = useState("likes");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPageList, setCurrentPageList] = useState([]); // 현재 페이지의 고정된 리스트
    const pageSize = 8;   //한 페이지에 보여줄 카드 수

    useEffect(() => {
        // 페이지가 처음 렌더링될 때 목록을 초기화 (뒤로가기도 포함)
        triggerListUpdate();
    }, []);

    const sortedList = [...cocktailList].sort((a, b) => {
        if (sortOption === "likes") return b.likes - a.likes;
        if (sortOption === "latest") return b.id - a.id;
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
            <div className={styles.header}>
                <h2 className={styles.title}>칵테일 정보 공유</h2>
                <h4 className={styles.subtitle}>
                    다른 사용자의 황금 레시피를 맛 볼 수 있는 공간
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
                    <FilterBar/>
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
        </>
    );
}