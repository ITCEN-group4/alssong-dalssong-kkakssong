import getAbvTag from "./getAbvTag.js";

export function filterCocktails(data, filters) {
    return data.filter(cocktail => {
        if (filters.baseLiquors.length > 0 && !filters.baseLiquors.includes(cocktail.baseLiquors)) return false;

        if (
            filters.ingredients.length > 0 &&
            !cocktail.ingredients.some(ing => filters.ingredients.includes(ing))
        ) return false;

        if (filters.abv && getAbvTag(cocktail.abv) !== filters.abv) return false;

        if (filters.shaking !== null && cocktail.shaking !== filters.shaking) return false;

        return true;
    });
}
