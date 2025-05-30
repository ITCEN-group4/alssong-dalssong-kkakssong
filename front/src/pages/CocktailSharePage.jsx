import React, {useState} from "react";
import FilterBar from "../components/filter/FilterBar.jsx";
import SortBar from "../components/filter/SortBar.jsx";
import CocktailCardList from "../components/cards/CocktailCardList.jsx";
import Pagination from "../components/layout/Pagination.jsx";
import { paginate } from "../utils/paginate.js";
import styles from './CocktailSharePage.module.css';
import SearchWriteBar from "../components/layout/SearchWriteBar.jsx";
import {useCocktailContext} from "../context/CocktailContext.jsx";

export default function CocktailSharePage() {
    const { cocktailList, searchList } = useCocktailContext();
    const [sortOption, setSortOption] = useState("likes");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const pageSize = 4;

    // 정렬
    const sortedList = [...cocktailList].sort((a, b) => {
        if (sortOption === "likes") return b.likes - a.likes;
        if (sortOption === "latest") return b.id - a.id;
        return 0;
    });

    // 페이지네이션
    const usePagination = sortedList.length > pageSize;
    const { pagedList: currentList, totalPages } = paginate(sortedList, currentPage, pageSize);

    //검색
    const handleSearch = () => {
        searchList(searchKeyword);
        setCurrentPage(1)
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
                        setSortOption={(option) => {
                            setSortOption(option);
                            setCurrentPage(1); // 정렬 변경 시 첫 페이지로
                        }}
                    />
                    <FilterBar/>
                </div>
            </div>

            <div className={styles.bottomSection}>
                <CocktailCardList cocktailList={currentList} />
                {usePagination && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}
            </div>
        </>
    );
}
