export function extractMainIngredient(recipeString) {
    if (!recipeString) return "";

    const firstLine = recipeString.split("\n")[0];
    const match = firstLine.trim().match(/^(.+?)\s+[\d.]+[a-zA-Z가-힣%]+$/);
    return match ? match[1] : "";
}