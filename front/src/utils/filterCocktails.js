import getLevelTag from "./getLevelTag.js";

export function filterCocktails(data, filters) {
    return data.filter(cocktail => {
        if (filters.base.length > 0 && !filters.base.includes(cocktail.base)) return false;

        if (
            filters.ingredients.length > 0 &&
            !cocktail.ingredients.some(ing => filters.ingredients.includes(ing))
        ) return false;

        if (filters.level && getLevelTag(cocktail.level) !== filters.level) return false;

        if (filters.shaking !== null && cocktail.shaking !== filters.shaking) return false;

        return true;
    });
}
