import { useParams } from "react-router-dom";
import React from "react";
import styles from "./CocktailDetailPage.module.css";
import { useCocktailContext } from "../context/CocktailContext.jsx";
import baseIcon from "../assets/baseIcon.svg";
import ingredientIcon from "../assets/ingredientIcon.svg";
import getShakingIcon from "../utils/getShakingIcon.js";
import getAbvIcon from "../utils/getAbcIcon.js";

export default function CocktailDetailPage() {
    const { id } = useParams();
    const { cocktailList, updateLikes } = useCocktailContext();
    const cocktail = cocktailList.find((c) => String(c.id) === id);
    const {label: abvLabel, icon: abvIcon} = getAbvIcon(cocktail.abv);
    const {label: shakingLabel, icon: shakingIcon} = getShakingIcon(cocktail.shaking);

    const handleLikeCount = () => {
        updateLikes(cocktail.id);
    };

    if (!cocktail) return <div>존재하지 않는 칵테일입니다.</div>;

    return (
        <div className={styles.detailPage}>
            <div className={styles.pageHeader}>
                <div className={styles.pageHeaderLeft}>
                    <h1>칵테일 정보 공유</h1>
                    <p>칵테일 정보를 공유하는 공간..<br />다른 유저의 황금레시피를 엿볼 수 있어요.</p>
                </div>

                <div className={styles.editButtonGroup}>
                    <button className={styles.editButton}>✏️ 수정</button>
                    <button className={styles.deleteButton}>🗑️ 삭제</button>
                </div>
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

                <div className={styles.iconGrid}>
                    <div className={styles.iconItem}>
                        <span className={styles.iconLabel}>베이스 술</span>
                        <img src={baseIcon} alt="base" className={styles.infoIcon} />
                        <span className={styles.iconValue}>{cocktail.baseLiquors}</span>
                    </div>
                    <div className={styles.iconItem}>
                        <span className={styles.iconLabel}>도수</span>
                        <img src={abvIcon} alt="abv" className={styles.infoIcon} />
                        <span className={styles.iconValue}>{abvLabel}</span>
                    </div>
                    <div className={styles.iconItem}>
                        <span className={styles.iconLabel}>부가재료</span>
                        <img src={ingredientIcon} alt="ingredient" className={styles.infoIcon} />
                        <span className={styles.iconValue}>{cocktail.ingredients[0]}</span>
                    </div>
                    <div className={styles.iconItem}>
                        <span className={styles.iconLabel}>쉐이킹</span>
                        <img src={shakingIcon} alt="shaking" className={styles.infoIcon} />
                        <span className={styles.iconValue}>{shakingLabel}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
