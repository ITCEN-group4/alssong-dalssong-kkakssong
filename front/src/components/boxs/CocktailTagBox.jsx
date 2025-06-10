import React from "react";
import styles from "./CocktailTagBox.module.css";

export default function CocktailTagBox({ filters, setFilters }) {
    const baseLiquors = ["진", "럼", "보드카", "위스키", "데킬라", "리큐르"];
    const ingredients = ["과일주스", "탄산음료", "우유/크림", "주류", "기타"];

    const handleCheckbox = (type, value) => {
        setFilters(prev => {
            const list = Array.isArray(prev[type]) ? prev[type] : [];
            const newList = list.includes(value)
                ? list.filter(item => item !== value)
                : [...list, value];
            return { ...prev, [type]: newList };
        });
    };

    const handleRadio = (type, value) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    return (
        <div className={styles.tagSelectorWrapper}>
            <fieldset className={styles.section}>
                <legend>베이스 술</legend>
                <div className={styles.checkboxRow}>
                    {baseLiquors.map(item => (
                        <label key={item} className={styles.label}>
                            <input
                                type="checkbox"
                                checked={filters.baseLiquors.includes(item)}
                                onChange={() => handleCheckbox("baseLiquors", item)}
                            />
                            {item}
                        </label>
                    ))}
                </div>
            </fieldset>

            <fieldset className={styles.section}>
                <legend>부가 재료</legend>
                <div className={styles.checkboxRow}>
                    {ingredients.map(item => (
                        <label key={item} className={styles.label}>
                            <input
                                type="checkbox"
                                checked={filters.ingredients.includes(item)}
                                onChange={() => handleCheckbox("ingredients", item)}
                            />
                            {item}
                        </label>
                    ))}
                </div>
            </fieldset>

            <fieldset className={styles.section}>
                <legend>도수</legend>
                <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0~100"
                    value={filters.abv ?? ""}
                    onChange={(e) => {
                        const value = Math.min(Number(e.target.value), 100);
                        setFilters(prev => ({ ...prev, abv: value }));
                    }}
                    className={styles.abvInput}
                />
            </fieldset>

            <fieldset className={styles.section}>
                <legend>쉐이킹 여부</legend>
                <div className={styles.checkboxRow}>
                    {["ON", "OFF"].map(val => (
                        <label key={val} className={styles.label}>
                            <input
                                type="radio"
                                name="shaking"
                                checked={filters.shaking === (val === "ON")}
                                onChange={() => handleRadio("shaking", val === "ON")}
                            />
                            {val}
                        </label>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}
