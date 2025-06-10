import React from "react";
import MyPostCard from "./MyPostCard.jsx";
import styles from "./MyPostCardList.module.css";

export default function MyPostCardList({ cocktailList }) {
    if (cocktailList.length === 0) {
        return <p>조건에 맞는 칵테일이 없습니다.</p>;
    }

    return (
        <div className={styles.cardGrid}>
            {cocktailList.map(cocktail => (
                <MyPostCard key={cocktail.id} cocktail={cocktail} />
            ))}
        </div>
    );
}
