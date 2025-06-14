import React, {useEffect, useState} from "react";
import OfficialFilterBar from "../components/layout/OfficialFilterBar.jsx";
import SortBar from "../components/layout/SortBar.jsx";
import OfficialCardList from "../components/cards/OfficialCardList.jsx";
import Pagination from "../components/layout/Pagination.jsx";
import styles from './OfficialCocktailPage.module.css';
import SearchBar from "../components/layout/SearchBar.jsx";
import NavBar from "../components/layout/NavBar.jsx";
import Footer from "../components/layout/Footer.jsx";
import {getOfficialPosts} from "../api/postApi.js";
import {mapApiToFrontData} from "../utils/MapApiToFrontData.js";

export default function CocktailSharePage() {
    const [cocktailList, setCocktailList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOption, setSortOption] = useState("likes");
    const [sortTrigger, setSortTrigger] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filters, setFilters] = useState({
        ingredients: [],
        baseLiquors: [],
        abv: null,
        shaking: null
    });

    const difficultyMap = {
        "초보": 0,
        "중수": 1,
        "고수": 2
    };

    const fetchList = async () => {
        try {
            const backendSort = sortOption === "likes" ? "like" : "latest";
            const response = await getOfficialPosts({
                is_official: true,
                page: currentPage,
                sort: backendSort,
                query: searchKeyword,
                ingredients: filters.ingredients,
                base_liquors: filters.baseLiquors,
                is_shaken: filters.shaking,
                difficulty: difficultyMap[filters.abv] ?? null
            });

            let list = response.data.data.posts.map(mapApiToFrontData);

            setCocktailList(list);
            setTotalPages(response.data.data.total_pages);

        } catch (err) {
            console.error("게시글 조회 실패", err);
        }
    };

    useEffect(() => {
        fetchList();
    }, [currentPage, sortOption, sortTrigger]);

    const handleSearch = () => {
        setCurrentPage(1);
        fetchList();
    };

    const handleSortChange = (option) => {
        if (option === sortOption) {
            setSortTrigger(prev => prev + 1);  // 강제 리렌더
        } else {
            setSortOption(option);
            setCurrentPage(1);
        }
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
                        setSortOption={handleSortChange}
                    />
                    <OfficialFilterBar
                        filters={filters}
                        setFilters={setFilters}
                        onFilterApply={handleFilterApply}
                    />
                </div>
            </div>

            <div className={styles.bottomSection}>
                <OfficialCardList cocktailList={cocktailList} />
                {totalPages > 1 && (
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
