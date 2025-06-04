import { createContext, useContext, useState } from "react";
import testData from "../data/cocktailTestData";
import { filterCocktails } from "../utils/filterCocktails";

const CocktailContext = createContext();

export function CocktailProvider({ children }) {
    const [cocktailList, setCocktailList] = useState(testData);

    const updateLikes = (id) => {
        setCocktailList(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
    };

    const updateCocktail = (id, updated) => {
        setCocktailList(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    };

    const filterList = (filters) => {
        const result = filterCocktails(testData, filters);
        setCocktailList(result);
    };

    const searchList = (keyword) => {
        const result = testData.filter(cocktail => cocktail.name.includes(keyword));
        setCocktailList(result);
    };

    return (
        <CocktailContext.Provider value={{ cocktailList, updateLikes, updateCocktail, filterList, searchList }}>
            {children}
        </CocktailContext.Provider>
    );
}

export function useCocktailContext() {
    return useContext(CocktailContext);
}