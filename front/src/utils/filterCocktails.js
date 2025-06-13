import getAbvTag from "./getAbvTag.js";

export function filterCocktails(data, filters) {
    return data.filter(cocktail => {
        if (
            filters.baseLiquors.length > 0 &&
            !filters.baseLiquors.some(base => cocktail.baseLiquors.includes(base))
        ) return false;

        if (
            filters.ingredients.length > 0 &&
            !filters.ingredients.some(ing => cocktail.ingredients.includes(ing))
        ) return false;

        if (filters.abv && getAbvTag(cocktail.abv).label !== filters.abv) return false;

        return !(filters.shaking !== null && cocktail.shaking !== filters.shaking);
    });
}
