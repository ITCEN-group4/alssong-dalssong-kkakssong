import getAbvTag from "./getAbvTag.js";
import { ingredientCategoryMap } from "./ingredientCategoryMap.js";

export function filterCocktails(data, filters) {
    return data.filter(cocktail => {
        if (
            filters.baseLiquors.length > 0 &&
            !filters.baseLiquors.includes(cocktail.baseLiquors)
        ) return false;

        // 부가재료(ingredients) 카테고리 필터
        if (filters.ingredients.length > 0) {
            // 칵테일의 재료들을 카테고리로 매핑
            const mappedCategories = cocktail.ingredients.map((ing) => {
                const normalized = ing.replace(/\s/g, "").replace(/-/g, "").toLowerCase();
                return ingredientCategoryMap[normalized] || "기타";
            });

            // 선택된 카테고리와 하나라도 겹치는지 확인
            const hasMatch = filters.ingredients.some(category => mappedCategories.includes(category));
            if (!hasMatch) return false;
        }

        if (filters.abv && getAbvTag(cocktail.abv).label !== filters.abv) return false;

        if (filters.shaking !== null && cocktail.shaking !== filters.shaking) return false;

        return true;
    });
}
