import React from "react";
import OfficialCard from "./OfficialCard.jsx";
import styles from "./OfficialCardList.module.css";

export default function OfficialCardList({ cocktailList }) {
    if (cocktailList.length === 0) {
        return (
            <p>조건에 맞는 칵테일이 없습니다.</p>
        );
    }

    return (
        <div className={styles.cardGrid}>
            {cocktailList.map((cocktail) => (
                <OfficialCard key={cocktail.id} cocktail={cocktail} />
            ))}
        </div>
    )
}
