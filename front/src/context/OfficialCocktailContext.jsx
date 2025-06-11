// src/context/OfficialCocktailContext.jsx
import { createContext, useContext, useState } from "react";
import cocktailData from "../data/cocktailOfficialData.js";

const OfficialCocktailContext = createContext();

export function OfficialCocktailProvider({ children }) {
    const [cocktailList, setCocktailList] = useState(cocktailData);
    const [likedMap, setLikedMap] = useState({});

    const toggleLike = (id) => {
        const alreadyLiked = likedMap[id] || false;

        setLikedMap(prev => ({
            ...prev,
            [id]: !alreadyLiked
        }));

        setCocktailList(prev =>
            prev.map(cocktail =>
                cocktail.id === id
                    ? { ...cocktail, likes: cocktail.likes + (alreadyLiked ? -1 : 1) }
                    : cocktail
            )
        );
    };

    const filterList = (filters) => {
        let filtered = cocktailData;

        // baseLiquors 필터
        if (filters.baseLiquors.length > 0) {
            filtered = filtered.filter(c =>
                filters.baseLiquors.includes(c.baseLiquors)
            );
        }

        // ingredients 필터
        if (filters.ingredients.length > 0) {
            filtered = filtered.filter(c =>
                filters.ingredients.every(ing => c.ingredients.includes(ing))
            );
        }

        // abv 필터
        if (filters.abv) {
            filtered = filtered.filter(c => {
                const abv = c.abv;
                if (filters.abv === "초보") return abv < 10;
                if (filters.abv === "중수") return abv >= 10 && abv < 20;
                if (filters.abv === "고수") return abv >= 20;
                return true;
            });
        }

        // shaking 필터
        if (filters.shaking !== null) {
            filtered = filtered.filter(c => c.shaking === filters.shaking);
        }

        setCocktailList(filtered);
    };


    const searchList = (keyword) => {
        if (!keyword.trim()) {
            setCocktailList(cocktailData);
        } else {
            const filtered = cocktailData.filter(c =>
                c.name.includes(keyword) || c.description.includes(keyword)
            );
            setCocktailList(filtered);
        }
    };

    const resetList = () => {
        setCocktailList(cocktailData);
    };

    return (
        <OfficialCocktailContext.Provider value={{
            cocktailList,
            toggleLike,
            likedMap,
            searchList,
            filterList,
            resetList
        }}>
            {children}
        </OfficialCocktailContext.Provider>
    );
}

export function useOfficialCocktailContext() {
    return useContext(OfficialCocktailContext);
}