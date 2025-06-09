import React from "react";
import { useParams } from "react-router-dom";
import { useCocktailContext } from "../context/CocktailContext";
import styles from "./OfficialCocktailDetailPage.module.css";
import NavBar from "../components/layout/NavBar.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function OfficialDetailPage() {
    const { id } = useParams();
    const { cocktailList } = useCocktailContext();
    const cocktail = cocktailList.find((item) => item.id.toString() === id);
    const {updateLikes} = useCocktailContext()

    if (!cocktail) return <p>해당 칵테일을 찾을 수 없습니다.</p>;

    const handleLike = (e) => {
        e.stopPropagation();
        updateLikes(cocktail.id);
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

                        <div className={styles.tags}>
                            <span className={styles.tag}>도수 {cocktail.abv}도</span>
                            <span className={styles.tag}>베이스 {cocktail.baseLiquors}</span>
                            <span className={styles.tag}>
          쉐이킹 {cocktail.shaking ? "ON" : "OFF"}
        </span>
                            <span className={styles.tag}>재료 {cocktail.ingredients[0]}</span>
                        </div>

                        <div className={styles.recipe}>
                            <h4>레시피</h4>
                            <ul>
                                <li>술의 양: {cocktail.amount || "45ml"}</li>
                                <li>주스: {cocktail.juice || "25ml"}</li>
                                <li>설탕: {cocktail.sugar || "10ml"}</li>
                                <li>기타 재료: {cocktail.ingredients.join(", ")}</li>
                            </ul>
                        </div>

                        <div className={styles.likes} onClick={handleLike}>❤️ {cocktail.likes} </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
