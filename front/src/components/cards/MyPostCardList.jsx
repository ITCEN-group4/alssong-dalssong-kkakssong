import React from "react";
import MyPostCard from "./MyPostCard.jsx";
import styles from "./MyPostCardList.module.css";
import { mapApiToFrontData } from "../../utils/MapApiToFrontData.js";

export default function MyPostCardList({ cocktailList }) {
    if (!cocktailList || cocktailList.length === 0) {
        return <p>조건에 맞는 칵테일이 없습니다.</p>;
    }

    return (
        <div className={styles.cardGrid}>
            {cocktailList.map(post => {
                const cocktail = mapApiToFrontData(post);
                return <MyPostCard key={cocktail.id} cocktail={cocktail} />;
            })}
        </div>
    );
}
