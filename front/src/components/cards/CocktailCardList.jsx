import React from "react";
import CocktailCard from "./CocktailCard";
import styles from "./CocktailCardList.module.css";

export default function CocktailCardList({ cocktailList }) {
    if (cocktailList.length === 0) {
        return (
            <p>조건에 맞는 칵테일이 없습니다.</p>
        );
    }

    return (
        <div className={styles.cardGrid}>
            {cocktailList.map((cocktail) => (
                <CocktailCard key={cocktail.id} cocktail={cocktail} />
            ))}
        </div>
    )
}
