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

    return (
        <OfficialCocktailContext.Provider value={{
            cocktailList,
            toggleLike,
            likedMap,
            searchList
        }}>
            {children}
        </OfficialCocktailContext.Provider>
    );
}

export function useOfficialCocktailContext() {
    return useContext(OfficialCocktailContext);
}