import React, { useState } from "react";
import styles from "./RecipeInputBox.module.css";
import { ingredientCategoryMap } from "../../utils/ingredientCategoryMap.js";

const StyleCategoryMap = {
    "과일주스": "fruit",
    "탄산음료": "soda",
    "우유/크림": "milk",
    "주류": "liquor",
    "기타": "etc",
};

function normalizeIngredientName(name) {
    return name
        .replace(/\s/g, "")
        .replace(/-/g, "")
        .trim()
        .toLowerCase();
}

function parseInput(content) {
    const match = content.trim().match(/^(.+?)\s+([\d.]+[a-zA-Z가-힣%]+)$/);
    if (!match) return null;

    const rawName = match[1].trim();
    const amount = match[2].trim();
    const normalized = normalizeIngredientName(rawName);
    const category = ingredientCategoryMap[normalized] || "기타";

    return { name: normalized, amount, category };
}

export default function RecipeInputBox({ recipeList, setRecipeList }) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const parsed = parseInput(inputValue);
            if (!parsed) {
                alert("형식이 올바르지 않습니다. 예: 오렌지주스 45ml");
                return;
            }

            setRecipeList([...recipeList, parsed]);
            setInputValue("");
        }
    };

    const handleDelete = (index) => {
        const updated = [...recipeList];
        updated.splice(index, 1);
        setRecipeList(updated);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.tagList}>
                {recipeList.map((item, idx) => {
                    const classNameKey = StyleCategoryMap[item.category] || "default";
                    return (
                        <div key={idx} className={`${styles.tag} ${styles[classNameKey]}`}>
                            {item.name} {item.amount}
                            <span className={styles.delete} onClick={() => handleDelete(idx)}>
                ✕
              </span>
                        </div>
                    );
                })}
            </div>
            <input
                type="text"
                placeholder="재료를 적고 한칸 띄워서 양을 적어주세요. 예: 오렌지주스 45ml"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.input}
            />
        </div>
    );
}
