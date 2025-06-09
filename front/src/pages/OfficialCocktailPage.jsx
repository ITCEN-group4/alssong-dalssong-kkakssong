import React, {useState} from "react";
import FilterBar from "../components/layout/FilterBar.jsx";
import SortBar from "../components/layout/SortBar.jsx";
import OfficialCardList from "../components/cards/OfficialCardList.jsx";
import Pagination from "../components/layout/Pagination.jsx";
import { paginate } from "../utils/paginate.js";
import styles from './OfficialCocktailPage.module.css';
import SearchBar from "../components/layout/SearchBar.jsx";
import {useCocktailContext} from "../context/CocktailContext.jsx";
import NavBar from "../components/layout/NavBar.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function CocktailSharePage() {
    const { cocktailList, searchList } = useCocktailContext();
    const [sortOption, setSortOption] = useState("likes");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const pageSize = 8;   //한 페이지에 보여줄 카드 수

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
