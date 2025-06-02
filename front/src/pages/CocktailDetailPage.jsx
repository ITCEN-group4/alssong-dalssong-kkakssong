import { useParams } from "react-router-dom";
import React from "react";
import styles from "./CocktailDetailPage.module.css";
import { useCocktailContext } from "../context/CocktailContext.jsx";
import getAbvTag from "../utils/getAbvTag.js";

export default function CocktailDetailPage() {
    const { id } = useParams();
    const { cocktailList, updateLikes } = useCocktailContext();
    const cocktail = cocktailList.find((c) => String(c.id) === id);
    const {  label } = getAbvTag(cocktail.abv);

    const handleLikeCount = () => {
        updateLikes(cocktail.id);
    };

    if (!cocktail) return <div>존재하지 않는 칵테일입니다.</div>;

    return (
        <div className={styles.detailPage}>
            <div className={styles.pageHeader}>
                <h1>칵테일 정보 공유</h1>
                <p>
                    칵테일 정보를 공유하는 공간..<br />
                    다른 유저의 황금레시피를 엿볼 수 있어요.
                </p>
            </div>

            <div className={styles.topSection}>
                <div className={styles.leftContent}>
                    <div className={styles.titleRow}>
                        <h2 className={styles.title}>{cocktail.name}</h2>
                        <div className={styles.authorWrapper}>
                            <div className={styles.authorIcon}>👤</div>
                            <span className={styles.authorName}>칵테일</span>
                        </div>
                    </div>

                    <p className={styles.description}>{cocktail.description}</p>

                    <div className={styles.infoRow }>
                        <button onClick={handleLikeCount} className={styles.likeButton}>
                            ❤️ {cocktail.likes}
                        </button>
                        <span className={styles.date}>작성일 : {cocktail.date}</span>
                    </div>
                </div>

                <div className={styles.imageWrapper}>
                    <img src={cocktail.image} alt={cocktail.name} />
                </div>
            </div>

            <div className={styles.bottomSection}>
                <div className={styles.recipeBox}>
                    <h3>레시피</h3>
                    <ul>
                        {cocktail.recipe.map((step, idx) => (
                            <li key={idx}>{step}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.infoSummary}>
                    <div>🍶 베이스 술: {cocktail.baseLiquors}</div>
                    <div>🔥 도수: {label}</div>
                    <div>🍋 부가재료: {cocktail.ingredients.join(", ")}</div>
                    <div>🍸 셰이킹: {cocktail.shaking ? "ON" : "OFF"}</div>
                </div>
            </div>
        </div>
    );
}
