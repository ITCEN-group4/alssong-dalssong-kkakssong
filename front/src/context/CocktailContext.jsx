import { createContext, useContext, useState } from "react";
import testData from "../data/cocktailTestData";
import { filterCocktails } from "../utils/filterCocktails";

const CocktailContext = createContext();

export function CocktailProvider({ children }) {
    const [cocktailList, setCocktailList] = useState(testData);
    const [likedMap, setLikedMap] = useState({})
    const [localLikes, setLocalLikes] = useState({});

    const toggleLike = (id) => {
        const alreadyLiked = likedMap[id] || false;

        setLikedMap(prev => ({
            ...prev,
            [id]: !alreadyLiked
        }));

        setLocalLikes(prev => ({
            ...prev,
            [id]: (prev[id] ?? 0) + (alreadyLiked ? -1 : 1)
        }));
    };

    const applyLocalLikes = () => {
        setCocktailList(prev =>
            prev.map(c => {
                const localChange = localLikes[c.id] ?? 0;
                return localChange !== 0 ? {
                    ...c,
                    likes: c.likes + localChange
                } : c;
            })
        );
        setLocalLikes({}); // 적용 후 초기화
    };

    const updateCocktail = (id, updated) => {
        setCocktailList(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    };

    const filterList = (filters) => {
        const result = filterCocktails(cocktailList, filters);
        setCocktailList(result);
    };

    const searchList = (keyword) => {
        const result = cocktailList.filter(cocktail => cocktail.name.includes(keyword));
        setCocktailList(result);
    };

    return (
        <CocktailContext.Provider value={{
            cocktailList,
            toggleLike,
            likedMap,
            localLikes,
            applyLocalLikes,
            updateCocktail,
            filterList,
            searchList
        }}>
            {children}
        </CocktailContext.Provider>
    );
}

export function useCocktailContext() {
    return useContext(CocktailContext);
}