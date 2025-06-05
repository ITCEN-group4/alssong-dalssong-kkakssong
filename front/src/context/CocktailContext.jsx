import { createContext, useContext, useState } from "react";
import testData from "../data/cocktailTestData";
import { filterCocktails } from "../utils/filterCocktails";

const CocktailContext = createContext();

export function CocktailProvider({ children }) {
    const [originalList, setOriginalList] = useState(testData); // 원본 고정
    const [cocktailList, setCocktailList] = useState(testData);
    const [likedMap, setLikedMap] = useState({});
    const [shouldUpdateList, setShouldUpdateList] = useState(true);

    const triggerListUpdate = () => {
        setShouldUpdateList(true);
    };

    const toggleLike = (id) => {
        const alreadyLiked = likedMap[id] || false;

        // 좋아요 상태 업데이트
        setLikedMap(prev => ({
            ...prev,
            [id]: !alreadyLiked
        }));

        // 원본/현재 모두 업데이트
        setOriginalList(prev =>
            prev.map(cocktail =>
                cocktail.id === id
                    ? { ...cocktail, likes: cocktail.likes + (alreadyLiked ? -1 : 1) }
                    : cocktail
            )
        );
        setCocktailList(prev =>
            prev.map(cocktail =>
                cocktail.id === id
                    ? { ...cocktail, likes: cocktail.likes + (alreadyLiked ? -1 : 1) }
                    : cocktail
            )
        );
    };

    const filterList = (filters) => {
        const result = filterCocktails(originalList, filters); // ✅ 원본 기준
        setCocktailList(result);
        triggerListUpdate();
    };

    const searchList = (keyword) => {
        if (!keyword.trim()) {
            setCocktailList(originalList); // ✅ 빈 검색어면 원상복귀
        } else {
            const result = originalList.filter(cocktail => cocktail.name.includes(keyword));
            setCocktailList(result);
        }
        triggerListUpdate();
    };

    const updateCocktail = (id, updated) => {
        setOriginalList(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
        setCocktailList(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    };

    const deleteCocktail = (id) => {
        setOriginalList(prev => prev.filter(cocktail => cocktail.id !== id));
        setCocktailList(prev => prev.filter(cocktail => cocktail.id !== id));
    };

    return (
        <CocktailContext.Provider value={{
            cocktailList,
            toggleLike,
            likedMap,
            updateCocktail,
            filterList,
            searchList,
            deleteCocktail,
            shouldUpdateList,
            setShouldUpdateList,
            triggerListUpdate
        }}>
            {children}
        </CocktailContext.Provider>
    );
}


export function useCocktailContext() {
    return useContext(CocktailContext);
}