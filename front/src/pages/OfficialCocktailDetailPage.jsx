import React from "react";
import { useParams } from "react-router-dom";
import { useCocktailContext } from "../context/CocktailContext";
import styles from "./OfficialCocktailDetailPage.module.css";
import NavBar from "../components/layout/NavBar.jsx";
import Footer from "../components/layout/Footer.jsx";
import tag_base from "../assets/tag_base.svg";
import tag_dosu from "../assets/tag_dosu.svg";
import tag_etc from "../assets/tag_etc.svg";
import tag_shake from "../assets/tag_shake.svg";
import likeAnimation from "../utils/likeAnimation.js";

export default function OfficialDetailPage() {
    const { id } = useParams();
    const {toggleLike, likedMap, cocktailList} = useCocktailContext();
    const cocktail = cocktailList.find((item) => item.id.toString() === id);
    const liked = likedMap[cocktail.id] || false;
    const [animate, triggerAnimate] = likeAnimation();

    if (!cocktail) return <p>해당 칵테일을 찾을 수 없습니다.</p>;

    // 실시간 좋아요 수 가져오기 (원본 데이터에서)
    const currentCocktail = cocktailList.find(c => c.id === cocktail.id);
    const currentLikes = currentCocktail ? currentCocktail.likes : cocktail.likes;

    const handleLike = (e) => {
        e.stopPropagation();
        toggleLike(cocktail.id);
        triggerAnimate();
    };

    return (
        <>
            <NavBar/>
                <div className={styles.headerSection}>
                    <h2 className={styles.pageTitle}>칵테일 상세 정보</h2>
                    <p className={styles.pageSubtitle}>
                        다양한 재료와 화려한 가니쉬가 어우러진 칵테일을 한눈에 확인해보세요.
                    </p>
                </div>

                <div className={styles.pageWrapper}>

                    <div className={styles.detailGrid}>
                        <div className={styles.imageCard}>
                            <img src={cocktail.image} alt={cocktail.name} className={styles.image}/>
                        </div>

                        <div className={styles.infoCard}>
                            <h3 className={styles.title}>{cocktail.name}</h3>
                            <p className={styles.description}>{cocktail.description}</p>

                            <div className={styles.iconTagsWrapper}>
                                <div className={styles.iconTagRow}>
                                    <img src={tag_base} className={styles.iconImage} alt="베이스 술"/>
                                    <div className={styles.tagText}>
                                        <div className={styles.tagLabel}>베이스 술</div>
                                        <div className={styles.tagValue}>{cocktail.baseLiquors}</div>
                                    </div>
                                </div>

                                <div className={styles.iconTagRow}>
                                    <img src={tag_dosu} className={styles.iconImage} alt="도수"/>
                                    <div className={styles.tagText}>
                                        <div className={styles.tagLabel}>도수</div>
                                        <div className={styles.tagValue}>{cocktail.abv}도</div>
                                    </div>
                                </div>

                                <div className={styles.iconTagRow}>
                                    <img src={tag_etc} className={styles.iconImage} alt="부가재료"/>
                                    <div className={styles.tagText}>
                                        <div className={styles.tagLabel}>부가재료</div>
                                        <div className={styles.tagValue}>{cocktail.ingredients[0]}</div>
                                    </div>
                                </div>

                                <div className={styles.iconTagRow}>
                                    <img src={tag_shake} className={styles.iconImage} alt="쉐이킹"/>
                                    <div className={styles.tagText}>
                                        <div className={styles.tagLabel}>쉐이킹</div>
                                        <div className={styles.tagValue}>{cocktail.shaking ? "예" : "아니오"}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.recipe}>
                                <h4>레시피</h4>
                                <ul>
                                    {Array.isArray(cocktail.recipe) ? (
                                        cocktail.recipe.map((step, index) => <li key={index}>{step}</li>)
                                    ) : (
                                        <li>{cocktail.recipe || "레시피 정보 없음"}</li>
                                    )}
                                </ul>
                            </div>

                            <div className={styles.likes} onClick={handleLike}>
                                <span className={`${styles.heartIcon} ${animate ? styles.bump : ""}`}>
                                    {liked ? "❤️" : "🤍"}
                                </span>
                                        <span className={`${styles.likeCount} ${animate ? styles.bump : ""}`}>
                                    {currentLikes}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer/>
        </>
    );
}
