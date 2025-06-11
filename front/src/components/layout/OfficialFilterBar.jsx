import React, {useEffect, useState} from 'react';
import styles from './OfficialFilterBar.module.css';
import { useOfficialCocktailContext} from "../../context/OfficialCocktailContext.jsx";

export default function OfficialFilterBar({resetSignal}) {
    const [filters, setFilters] = useState({
        baseLiquors: [],
        ingredients: [],
        abv: null,
        shaking: null,
    });

    const { filterList, resetList } = useOfficialCocktailContext();

    useEffect(() => {
        setFilters({
            baseLiquors: [],
            ingredients: [],
            abv: null,
            shaking: null,
        });
    }, [resetSignal]);

    function handleSelect(type, value) {
        setFilters(prev => {
            const current = prev[type];
            const newValue = current === value ? null : value;
            return { ...prev, [type]: newValue };
        });
    }

    function handleMultiSelect(type, value) {
        setFilters(prev => {
            const currentArray = prev[type];
            let newArray;
            if (currentArray.includes(value)) {
                newArray = currentArray.filter(item => item !== value);
            } else {
                newArray = [...currentArray, value];
            }
            return { ...prev, [type]: newArray };
        });
    }

    function handleResetFilters() {
        setFilters({
            baseLiquors: [],
            ingredients: [],
            abv: null,
            shaking: null,
        });

        resetList();
    }

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <div className={styles.inlineSection}>
                    <span className={styles.label}>베이스 주종</span>
                    <div className={styles.buttonGroup}>
                        {["럼", "보드카", "진", "위스키", "데킬라", "리큐르"].map(baseLiquors => (
                            <button
                                key={baseLiquors}
                                onClick={() => handleMultiSelect("baseLiquors", baseLiquors)}
                                className={`${styles.button} ${filters.baseLiquors.includes(baseLiquors) ? styles.active : ''}`}
                            >
                                {baseLiquors}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.inlineSection}>
                    <span className={styles.label}>부가 재료</span>
                    <div className={styles.buttonGroup}>
                        {["과일주스", "탄산음료", "우유/크림", "주류", "기타"].map(ingredient => (
                            <button
                                key={ingredient}
                                onClick={() => handleMultiSelect("ingredients", ingredient)}
                                className={`${styles.button} ${filters.ingredients.includes(ingredient) ? styles.active : ''}`}
                            >
                                {ingredient}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.column}>
                <div className={styles.inlineSection}>
                    <span className={styles.label}>쉐이킹</span>
                    <div className={styles.buttonGroup}>
                        {["ON", "OFF"].map(shaking => (
                            <button
                                key={shaking}
                                onClick={() => handleSelect("shaking", shaking === "ON")}
                                className={`${styles.button} ${filters.shaking === (shaking === "ON") ? styles.active : ''}`}
                            >
                                {shaking}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.inlineSection}>
                    <span className={styles.label}>도수</span>
                    <div className={styles.buttonGroup}>
                        {["초보", "중수", "고수"].map(abv => (
                            <button
                                key={abv}
                                onClick={() => handleSelect("abv", abv)}
                                className={`${styles.button} ${filters.abv === abv ? styles.active : ''}`}
                            >
                                {abv}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.actionColumn}>
                <button
                    className={styles.submitButton}
                    onClick={() =>
                        filterList(filters)}
                >
                    조합하기
                </button>
                <button
                    className={styles.resetPlaceholder}
                    onClick={handleResetFilters}
                    >
                    필터 초기화
                </button>
            </div>
        </div>
    );
}
